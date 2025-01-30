<?php

return [
    'paths' => ['api/*', 'login', 'register'], // specify the API endpoints here
    'allowed_methods' => ['*'], // or specify ['GET', 'POST', 'PUT', 'DELETE', etc.]
    'allowed_origins' => ['http://localhost:5173'], // the allowed origin (replace with your frontend URL)
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // or specify ['Content-Type', 'Authorization', etc.]
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // This is important to allow credentials (cookies, headers)
];

// return [

//     /*
//     |--------------------------------------------------------------------------
//     | Cross-Origin Resource Sharing (CORS) Configuration
//     |--------------------------------------------------------------------------
//     |
//     | Here you may configure your settings for cross-origin resource sharing
//     | or "CORS". This determines what cross-origin operations may execute
//     | in web browsers. You are free to adjust these settings as needed.
//     |
//     | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
//     |
//     */

//     'paths' => ['api/*', 'sanctum/csrf-cookie'],

//     'allowed_methods' => ['*'],

//     'allowed_origins' => ['*'],

//     'allowed_origins_patterns' => [],

//     'allowed_headers' => ['*'],

//     'exposed_headers' => [],

//     'max_age' => 0,

//     'supports_credentials' => true,

// ];
