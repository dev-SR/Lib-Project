<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BooksController extends Controller
{
    //
    public function index(Request $req)
    {

        $fields = $req->validate([
            'name' => 'required|string', 'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);


        // $validator = Validator::make($req->all(),['name'=>'min:30']);
        // if($validator) =


    }
}
