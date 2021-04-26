<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\IssueBook;
use App\Models\RequestBook;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use phpDocumentor\Reflection\Types\Boolean;

class RequestBookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $res =
            RequestBook::with(['user:id,name', 'book:id,book_id,title,img'])->get();
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
            'book_id' => 'required',
        ]);

        $book = Book::where('book_id', '=',  $f['book_id'])->first();
        $user = User::find($f['user_id']);
        $alreadyExit = RequestBook::where('book_id', '=', $f['book_id'])->where('user_id', '=', $f['user_id'])->first();


        if (!$book || !$user || $alreadyExit) {
            return response(
                [
                    'success' => false, 'errors' => [
                        'fail_message' => 'Failed To Request'
                    ]
                ],
                503
            );
        }

        $cat = RequestBook::create([
            'user_id' => $f['user_id'],
            'book_id' => $f['book_id'],
        ]);
        $dd = IssueBook::create([
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
        $cat = User::find($id)->requested_books;
        // if (!$cat) {
        //     return ['success' => false, 'fail_message' => 'This info do not exits'];
        // }
        // $res = [
        //     'id' => $cat->id,
        //     'user_id' => $cat->user_id,
        //     'book_id' => $cat->book_id,
        //     'user' => RequestBook::find($id)->user,
        //     'book' => RequestBook::find($id)->book,

        // ];

        return ['success' => true, 'issue' => $cat];
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
            'accepted' => 'required',
        ]);

        $v = $f['accepted'] == 'true' ? true : false;

        $cat = RequestBook::find($id);
        if (!$cat) {
            return ['success' => false, 'fail_message' => 'This info do not exits'];
        }

        $cat->update([
            'accepted' => $v,
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
        $cat = RequestBook::destroy($id);
        if (!$cat) {
            return ['success' => false, 'fail_message' => 'This Department do not exits'];
        }
        return ['success' => true, 'success_message' => 'Deleted'];
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function return_book(Request $req)
    {
    }
}
