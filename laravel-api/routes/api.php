<?php

use App\Http\Controllers\Auth\CheckController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Role\RoleCreateController;
use App\Http\Controllers\Role\RoleListController;
use App\Http\Controllers\User\Roles\UserAddRoleController;
use App\Http\Controllers\User\Roles\UserDeleteRoleController;
use App\Http\Controllers\User\UserCreateController;
use App\Http\Controllers\User\UserDeleteController;
use App\Http\Controllers\User\UserEditController;
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

Route::middleware(['api', 'auth:sanctum', 'web'])->group(function () {
    Route::post('/logout', LogoutController::class);
    Route::get('/check', CheckController::class);

    Route::get('/users', UserListController::class);
    Route::post('/users', UserCreateController::class);

    Route::prefix('/users/{user}')->group(function () {
        Route::get('/', UserViewController::class);
        Route::put('/', UserEditController::class);
        Route::delete('/', UserDeleteController::class);
        Route::post('/roles/add', UserAddRoleController::class);
        Route::delete('/roles/{role}', UserDeleteRoleController::class);
    });

    Route::get('/roles', RoleListController::class);
    Route::post('/roles', RoleCreateController::class);
});
