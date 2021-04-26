<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\IssueBookController;
use App\Http\Controllers\RequestBookController;
use App\Http\Controllers\ReturnController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SubjectController;
use App\Models\IssueBook;
use App\Models\RequestBook;
use Illuminate\Http\Request;

use function Symfony\Component\String\b;

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
Route::get('/book', [BookController::class, 'index']);
Route::get('/book/{id}', [BookController::class, 'show']);


//Protected Route
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/test', function () {
        return "Middleware Worked";
    });
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
    Route::put('/book/{id}', [BookController::class, 'update']);
    Route::delete('/book/{id}', [BookController::class, 'destroy']);
    //Requesting , Issuing and Returning Books 
    Route::post('/request_issue', [RequestBookController::class, 'store']);
    Route::get('/request_issue', [RequestBookController::class, 'index']);
    Route::get('/request_issue/{id}', [RequestBookController::class, 'show']);
    Route::put('/request_issue/{id}', [RequestBookController::class, 'update']);


    Route::post('/issue_book', [IssueBookController::class, 'store']);
    Route::post('/issue_book', [IssueBookController::class, 'store']);
    Route::get('/issue_book', [IssueBookController::class, 'index']);
    Route::get('/issue_book/{id}', [IssueBookController::class, 'show']);
    Route::put('/issue_book/{id}', [IssueBookController::class, 'update']);
    Route::delete('/issue_book/{id}', [IssueBookController::class, 'destroy']);
    Route::post('/return-book', [IssueBookController::class, 'return_book']);

    //User Management
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/make-admin', [AuthController::class, 'makeAdmin']);
    Route::post('/revoke-admin', [AuthController::class, 'revokeAdmin']);
    Route::post('/revoke-admin', [AuthController::class, 'revokeAdmin']);
    Route::get('/user-all', [AuthController::class, 'index']);
    Route::get('/user-details/{id}', [AuthController::class, 'show']);
    Route::get('/student-details/{id}', [AuthController::class, 'student_details']);
    Route::get('/student/search', [AuthController::class, 'search']);
    Route::get('/admin/dashboard', [AuthController::class, 'info']);
});
