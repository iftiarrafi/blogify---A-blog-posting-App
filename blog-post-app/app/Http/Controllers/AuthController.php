<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;

class AuthController extends Controller
{
    // Register a user
    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
            ]);
    
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
    
            // Issue a token after registration
            $token = $user->createToken('BlogApp')->plainTextToken;
    
            return response()->json(['token' => $token ,'user' => $user], 201);
        }  catch (\Exception $e) {
            // Log::error('Error registering user:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Something went wrong!'], 500);
        }
        
    }

    // Login a user
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string|min:8',
            ]);
    
            if (Auth::attempt($request->only('email', 'password'))) {
                $user = Auth::user();
                $token = $user->createToken('BlogApp')->plainTextToken;
    
                return response()->json(['token' => $token , 'user' => $user], 200);
            }
    
            return response()->json(['message' => 'Invalid credentials'], 401);
        } catch (\Exception $e) {
            Log::error('Error logging in', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Something went wrong!'], 500);
        }
        
    }

    // Logout a user
    public function logout(Request $request)
    {
        try {
            $request->user()->tokens->each(function ($token) {
                $token->delete();
            });
    
            return response()->json(['message' => 'Logged out successfully']);
        } catch (\Exception $e) {
            // Log::error('Error logging out', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Something went wrong!'], 500);
        }
       
    }
}
