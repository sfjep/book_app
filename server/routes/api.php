<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;


// Define routes
Route::get('/books', [BookController::class, 'index']);
Route::post('/books', [BookController::class, 'store']);
Route::get('/books/{isbn}', [BookController::class, 'show']);
Route::put('/books/{isbn}', [BookController::class, 'update']);
Route::delete('/books/{isbn}', [BookController::class, 'destroy']);

// Alternative one-liner for generating all routes operations.
// Route::resource('books', BookController::class);
// Not sure if it works, since I use 'isbn' and not Laravels default 'id' as PK..