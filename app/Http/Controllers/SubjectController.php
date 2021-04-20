<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use COM;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $res = Subject::all(['subject', 'id']);
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
            'subject' => 'required|string|min:2',
            'department_id' => 'required|numeric'

        ]);


        $cat = Subject::create([
            'subject' => $f['subject'],
            'department_id' => $f['department_id']
        ]);

        return response(
            ['success' => true, 'success_message' => $f['subject']],
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
        $cat = Subject::find($id);
        if (!$cat) {
            return ['success' => false, 'fail_message' => 'This Subject do not exits'];
        }
        $res = [
            'subject' => $cat->subject,
            'id' => $cat->id
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
    public function update(Request $request, $id)
    {
        //
        $f = $this->validate($request, [
            'subject' => 'required'
        ]);

        $cat = Subject::find($id);
        if (!$cat) {
            return ['success' => false, 'fail_message' => 'This Subject do not exits'];
        }
        $cat->update(['subject' => $request->subject]);

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
        $cat = Subject::destroy($id);
        if (!$cat) {
            return ['success' => false, 'fail_message' => 'This Subject do not exits'];
        }
        return ['success' => true, 'success_message' => 'Deleted'];
    }
}
