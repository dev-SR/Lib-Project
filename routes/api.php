<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\SubjectController;

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
    Route::post('/subject', [SubjectController::class, 'store']);
    Route::get('/subject', [SubjectController::class, 'index']);
    Route::get('/subject/{id}', [SubjectController::class, 'show']);
    Route::put('/subject/{id}', [SubjectController::class, 'update']);
    Route::delete('/subject/{id}', [SubjectController::class, 'destroy']);
    Route::post('/department', [DepartmentController::class, 'store']);
    Route::get('/department', [DepartmentController::class, 'index']);
    Route::get('/department/{id}', [DepartmentController::class, 'show']);
    Route::put('/department/{id}', [DepartmentController::class, 'update']);
    Route::delete('/department/{id}', [DepartmentController::class, 'destroy']);
    Route::post('/book', [BookController::class, 'store']);
    Route::get('/book', [BookController::class, 'index']);
    Route::get('/book/{id}', [BookController::class, 'show']);
    Route::put('/book/{id}', [BookController::class, 'update']);
    Route::delete('/book/{id}', [BookController::class, 'destroy']);
});
