<?php

namespace App\Models;

use App\Models\Subject;
use App\Models\Department;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Book extends Model
{
    use HasFactory;

    protected $fillable = ['book_id', 'title', 'isbn', 'publisher', 'authors', 'price', 'pages', 'copies', 'shelf_no', 'subject_id', 'department_id'];
    //Book::find(5)->subject
    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
    //Book::find(5)->department
    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
