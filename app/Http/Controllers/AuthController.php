<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Register new User.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $req)
    {
        //      
        $fields = $req->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'

        ]);
        $user = User::create(
            [
                'name' => $fields['name'],
                'email' => $fields['email'],
                'password' => bcrypt($fields['password'])
            ]
        );


        $token = $user->createToken($user->email)->plainTextToken;
        $response = ['user' => $user, 'token' => $token];

        return response($response, 201);
    }


    public function logout(Request $req)
    {
        $req->user()->currentAccessToken()->delete();
        return ['message' => 'Logged Out'];
    }

    public function login(Request $req)
    {
        $fields = $req->validate([
            'email' => 'required|string', //unique:table,col
            'password' => 'required|string'
        ]);

        //Check Email
        $user = User::where('email', $fields['email'])->first();


        //Check Password
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response(['message' => 'Bad Cred'], 401);
        }

        $token = $user->createToken($user->email)->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }



    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
