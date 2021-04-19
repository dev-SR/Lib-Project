<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BooksController;
use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use phpDocumentor\Reflection\DocBlock\Tags\Var_;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Public Route
Route::post('/add-category', [CategoryController::class, 'store']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


//Protected Route
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/test', function () {
        return "Middleware Worked";
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/make-admin', [AuthController::class, 'makeAdmin']);
    Route::post('/revoke-admin', [AuthController::class, 'revokeAdmin']);
});
