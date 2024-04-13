<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\User\UserCreateController;
use App\Http\Controllers\User\UserListController;
use App\Http\Controllers\User\UserViewController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', LoginController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', UserListController::class);
    Route::post('/users', UserCreateController::class);
    Route::get('/users/{user}', UserViewController::class);
});
