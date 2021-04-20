<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use function Symfony\Component\String\b;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('book_id')->unique();
            $table->string('title')->unique();
            $table->string('isbn');
            $table->string('publisher');
            $table->text('authors');
            $table->unsignedDecimal('price', 5, 2);
            $table->unsignedInteger('pages');
            $table->unsignedInteger('copies');
            $table->unsignedInteger('shelf_no');
            $table->foreignId('subject_id'); //belongs to Subject Model
            $table->foreignId('department_id'); //De Model
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('books');
    }
}
