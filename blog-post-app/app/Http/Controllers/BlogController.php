<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    // Get all blogs
    public function index()
    {
        try {
            $blogs = Blog::with('user')->get();
            return response()->json(['blogs' => $blogs , 'message' => 'Here are your blogs!']);
        }  catch (\Exception $e) {
            Log::error('Error fetching all blogs', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Something went wrong!'], 500);
        }
        
    }

    // Get a single blog
    public function show($id)
    {
        $blog = Blog::findOrFail($id);
        return response()->json($blog);
    }

    // Create a blog post with image upload
    public function store(Request $request)
{
    Log::info('Request received:', $request->all());

    $request->validate([
        'title' => 'required|string|max:255',
        'content' => 'required|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
    ]);

    try {
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('blogs', 'public');
        }

        $blog = Blog::create([
            'title' => $request->title,
            'content' => $request->content,
            'image' => $imagePath,
            'user_id' => Auth::id(),
        ]);

        return response()->json($blog, 201);
    } catch (\Exception $e) {
        Log::error('Error creating blog:', ['error' => $e->getMessage()]);
        return response()->json(['message' => 'Something went wrong!'], 500);
    }
}

    // Update a blog post with image upload
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $blog = Blog::findOrFail($id);
        if ($blog->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($request->hasFile('image')) {
            // Delete the old image
            if ($blog->image) {
                Storage::disk('public')->delete($blog->image);
            }
            // Upload the new image
            $blog->image = $request->file('image')->store('blogs', 'public');
        }

        $blog->update([
            'title' => $request->title,
            'content' => $request->content,
            'image' => $blog->image,
        ]);

        return response()->json($blog);
    }

    // Delete a blog post
    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);
        if ($blog->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($blog->image) {
            Storage::disk('public')->delete($blog->image);
        }

        $blog->delete();

        return response()->json(['message' => 'Blog deleted successfully']);
    }
}
