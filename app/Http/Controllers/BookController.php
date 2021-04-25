<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Department;
use App\Models\Subject;
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

        $res = Book::with(['subject:id,subject', 'department:id,department'])->paginate(4);
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
            'book_id' => 'required|unique:books,book_id',
            'title' => 'required|string',
            'isbn' => 'required|min:2',
            'publisher' => 'required|string|min:2',
            'authors' => 'required|string|min:2',
            'price' => 'required',
            'pages' => 'required',
            'copies' => 'required',
            'edition' => 'required',
            'shelf_no' => 'required',
            'subject' => 'required',
            'department' => 'required'

        ]);

        $sub = Subject::where('subject', '=', $f['subject'])->first();

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
            'subject_id' => $sub->id,
            'department_id' => $sub->department_id
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

        $b = Book::where('book_id', '=', $id)->first();
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
            'subject' => Book::where('book_id', '=', $id)->first()->subject->subject,
            'department' => Book::where('book_id', '=', $id)->first()->department->department
        ];

        return ['success' => true, 'lists' => $res];
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
            'book_id' => 'required',
            'title' => 'required|min:2',
            'isbn' => 'required|min:2',
            'publisher' => 'required|string|min:2',
            'authors' => 'required|string|min:2',
            'price' => 'required',
            'pages' => 'required',
            'copies' => 'required',
            'edition' => 'required',
            'shelf_no' => 'required',
            'subject' => 'required',
            'department' => 'required'

        ]);
        $b = Book::where('book_id', '=', $id)->first();
        if (!$b) {
            return response(
                [
                    'success' => false, 'errors' => [
                        'fail_message' => ['Cant Change Book ID']
                    ]
                ],
                503
            );
        }
        $sub = Subject::where('subject', '=', $f['subject'])->first();


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
            'edition' => $f['edition'],
            'shelf_no' => $f['shelf_no'],
            'subject_id' => $sub->id,
            'department_id' => $sub->department_id
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
