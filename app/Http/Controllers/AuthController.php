<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\IssueBook;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\Console\Input\Input;

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
        return User::all(['id', 'name', 'is_admin', 'email']);
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
            'id' => 'required|min:8',
            'name' => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string|confirmed'

        ]);

        $id = User::find($fields['id']); // find only works with id column
        $email = User::where('email', $fields['email'])->first();

        if ($id) {
            return response()->json([
                'message' => 'This id already exits'
            ], 500);
        }
        if ($email) {
            return response()->json([
                'message' => 'This emails already exits'
            ], 500);
        }


        $user = User::create(
            [
                'id' => $fields['id'],
                'name' => $fields['name'],
                'email' => $fields['email'],
                'password' => bcrypt($fields['password'])
            ]
        );

        $token = $user->createToken($user->email)->plainTextToken;

        $u = [
            'name' => $user->name,
            'email' => $user->email,
        ];
        $response = [
            'user' => $u,
            'is_admin' => $user->is_admin,
            'token' => $token
        ];
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
            return response(['message' => 'Bad Credentials'], 401);
        }

        $token = $user->createToken($user->email)->plainTextToken;


        $u = [
            'name' => $user->name,
            'email' => $user->email,
        ];
        $response = [
            'user' => $u,
            'is_admin' => $user->is_admin,
            'token' => $token
        ];


        return response($response, 201);
    }

    public function makeAdmin(Request $req)
    {
        $fields = $req->validate([
            'email' => 'required|string',
        ]);


        $user = User::where('email', $fields['email'])->first();
        $user->is_admin = true;
        $user->save();
        $response = [
            'message' => 'Admin Added'
        ];
        return response($response, 201);
    }
    public function revokeAdmin(Request $req)
    {
        $fields = $req->validate([
            'email' => 'required|string',
        ]);
        $user = User::where('email', $fields['email'])->first();
        $user->is_admin = false;
        $user->save();
        $response = [
            'message' => 'Admin Revoked'
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
        $u = User::find($id);

        if (!$u) {
            return ['success' => false, 'fail_message' => 'This info do not exits'];
        }

        $res = [
            'user' => [
                'user_id' => $u->id,
                'user_name' => $u->name,
                'is_admin' => $u->is_admin
            ],
        ];
        return ['lists' => $res];
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function student_details($id)
    {
        //
        $u = User::find($id);

        if (!$u) {
            return ['success' => false, 'fail_message' => 'This info do not exits'];
        }

        $res = [
            'user' => [
                'user_id' => $u->id,
                'user_name' => $u->name,
            ],
            'issue_books' => IssueBook::with(['book:id,book_id,title,img'])->where('user_id', '=', $u->id)->get()

        ];
        return ['lists' => $res];
    }

    public function search(Request $req)
    {
        $q = User::query();
        //https://laravel.com/docs/8.x/requests#retrieving-input
        if ($req->has('user')) { //Determining If Input Is Present
            //$name = $request->input('name');
            // $name = $request->query('name');
            // $name = $request->query('name',"Default Name");
            // $name = $request->name; //Dynamic 
            $uID = $req->user;
            $q = $q->where('id', 'LIKE', "%$uID%");

            // $u = User::byID($uID)->get();

        }
        if ($req->has('is_admin')) {
            $q = $q->where('is_admin', '=', "true");
        }

        $res = $q->paginate(5);
        return ['res' => $res];
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
