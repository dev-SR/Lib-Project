<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $res = Department::all(['department', 'id']);
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
            'department' => 'required|string|min:2',
        ]);

        $found = Department::where('department', '=', $f['department'])->first();


        if ($found) {
            return response(
                [
                    'success' => false, 'errors' => [
                        'fail_message' => 'Department Already Exits'
                    ]
                ],
                503
            );
        }



        $cat = Department::create([
            'department' => $f['department'],
        ]);

        return response(
            ['success' => true, 'success_message' => $f['department']],
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
        $cat = Department::find($id);
        if (!$cat) {
            return ['success' => false, 'fail_message' => 'This Department do not exits'];
        }
        $res = [
            'department' => $cat->department,
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
            'department' => 'required'
        ]);

        $cat = Department::find($id);
        if (!$cat) {
            return response(
                [
                    'success' => false, 'errors' => [
                        'fail_message' => 'Department Already Exits'
                    ]
                ],
                503
            );
        }
        $cat->update(['department' => $request->department]);

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
        $cat = Department::destroy($id);
        if (!$cat) {
            return response(
                [
                    'success' => false, 'errors' => [
                        'fail_message' => 'Department Already Exits'
                    ]
                ],
                503
            );
        }
        return ['success' => true, 'success_message' => 'Deleted'];
    }
}
