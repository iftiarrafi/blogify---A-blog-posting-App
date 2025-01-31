<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use Illuminate\Support\Facades\Route;

// Auth routes
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']); // Sanctum auth for logout

Route::get('blogs', [BlogController::class, 'index']);


// Blog routes protected by Sanctum middleware
Route::middleware('auth:sanctum')->group(function () {
    /*create blog*/
    Route::post('blogs', [BlogController::class, 'store']);
    /*get specific user's blog*/
    Route::get('/users/{id}/blogs', [BlogController::class, 'getUserBlogs']);
    /*get specific blog*/
    Route::get('blogs/{id}', [BlogController::class, 'show']);
    /*update specific blog and delete*/
    Route::put('blogs/{id}', [BlogController::class, 'update']);
    Route::delete('blogs/{id}', [BlogController::class, 'destroy']);
});

// User info route, also protected by Sanctum
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
