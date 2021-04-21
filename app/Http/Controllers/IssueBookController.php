<?php

namespace App\Http\Controllers;

use App\Models\IssueBook;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;

class IssueBookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $res =
            IssueBook::with(['user:id,name', 'book:id,book_id,title,img'])->get();
        return ['lists' => $res];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req)
    {

        $f =  $req->validate([
            'user_id' => 'required',
            'book_id' => 'required'
        ]);


        $cat = IssueBook::create([
            'user_id' => $f['user_id'],
            'book_id' => $f['book_id'],

        ]);

        return response(
            ['success' => true, 'success_message' => "Booked Issued"],
            201
        );
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
        $cat = IssueBook::find($id);
        if (!$cat) {
            return ['success' => false, 'fail_message' => 'This info do not exits'];
        }
        $res = [
            'id' => $cat->id,
            'user_id' => $cat->user_id,
            'book_id' => $cat->book_id,
            'user' => IssueBook::find($id)->user,
            'book' => IssueBook::find($id)->book,

        ];

        return ['success' => true, 'issue' => $res];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $req, $id)
    {
        //
        $f =  $req->validate([
            'user_id' => 'required',
            'book_id' => 'required'
        ]);



        $cat = IssueBook::find($id);
        if (!$cat) {
            return ['success' => false, 'fail_message' => 'This info do not exits'];
        }
        $cat->update([
            'user_id' => $f['user_id'],
            'book_id' => $f['book_id'],
        ]);

        return ['success' => true, 'success_message' => 'Updated'];
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
        $cat = IssueBook::destroy($id);
        if (!$cat) {
            return ['success' => false, 'fail_message' => 'This Department do not exits'];
        }
        return ['success' => true, 'success_message' => 'Deleted'];
    }
}
