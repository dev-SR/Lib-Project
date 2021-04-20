<?php

namespace App\Models;

use App\Models\Book;
use App\Models\Subject;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Department extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'department'];
    //Department::find(5)->books
    public function books()
    {
        return $this->hasMany(Book::class);
    }
    //Department::find(5)->subject
    public function subject()
    {
        return $this->hasMany(Subject::class);
    }
}
