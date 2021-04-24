<?php

namespace App\Models;

use App\Models\Book;
use App\Models\Department;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Subject extends Model
{
    use HasFactory;
    protected $fillable = ['subject', 'department_id'];
    //Subject::find(5)->books
    public function books()
    {
        return $this->hasMany(Book::class);
    }
    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
