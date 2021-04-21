<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

use function Symfony\Component\String\b;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $res = Book::paginate(2);
        return response($res, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req)
    {
        //
        $f =  $req->validate([
            'book_id' => 'required|min:2',
            'title' => 'required|string|min:5',
            'isbn' => 'required|min:2',
            'publisher' => 'required|string|min:2',
            'authors' => 'required|string|min:2',
            'price' => 'required|min:2',
            'pages' => 'required|min:2',
            'copies' => 'required',
            'edition' => 'required',
            'shelf_no' => 'required',
            'subject_id' => 'required',
            'department_id' => 'required'

        ]);

        $b = Book::create([
            'img' => $req->img,
            'book_id' => $f['book_id'],
            'title' => $f['title'],
            'isbn' => $f['isbn'],
            'publisher' => $f['publisher'],
            'authors' => $f['authors'],
            'price' => $f['price'],
            'pages' => $f['pages'],
            'copies' => $f['copies'],
            'edition' => $f['edition'],
            'shelf_no' => $f['shelf_no'],
            'subject_id' => $f['subject_id'],
            'department_id' => $f['department_id']
        ]);

        return response(
            ['success' => true, 'success_message' => $f['title']],
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
        $b = Book::find($id);
        if (!$b) {
            return ['success' => false, 'fail_message' => 'This Book do not exits'];
        }
        $res = [
            'id' => $b->id,
            'img' => $b->img,
            'book_id' => $b->book_id,
            'title' => $b->title,
            'isbn' => $b->isbn,
            'publisher' => $b->publisher,
            'authors' => $b->authors,
            'price' => $b->price,
            'pages' => $b->pages,
            'copies' => $b->copies,
            'edition' => $b->edition,
            'shelf_no' => $b->shelf_no,
            'subject' => Book::find($id)->subject->subject,
            'department' => Book::find($id)->department->department
        ];

        return ['success' => true, 'cat' => $res];
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

            'book_id' => 'required|min:2',
            'title' => 'required|string|min:5',
            'isbn' => 'required|min:2',
            'publisher' => 'required|string|min:2',
            'authors' => 'required|string|min:2',
            'price' => 'required|min:2',
            'pages' => 'required|min:2',
            'copies' => 'required',
            'shelf_no' => 'required',
            'subject_id' => 'required',
            'edition' => 'required',
            'department_id' => 'required'
        ]);
        $b = Book::find($id);

        if (!$b) {
            return ['success' => false, 'fail_message' => 'This Book do not exits'];
        }
        $b->update([
            'img' => $req->img,
            'book_id' => $f['book_id'],
            'title' => $f['title'],
            'isbn' => $f['isbn'],
            'publisher' => $f['publisher'],
            'authors' => $f['authors'],
            'price' => $f['price'],
            'pages' => $f['pages'],
            'copies' => $f['copies'],
            'shelf_no' => $f['shelf_no'],
            'edition' => $f['edition'],
            'subject_id' => $f['subject_id'],
            'department_id' => $f['department_id']
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
        $b = Book::destroy($id);
        if (!$b) {
            return ['success' => false, 'fail_message' => 'This Book do not exits'];
        }
        return ['success' => true, 'success_message' => 'Deleted'];
    }
}
