<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->string('isbn', 10)->primary();
            $table->text('title');
            $table->text('author');
            $table->integer('publication_year');
            $table->text('publisher');
            $table->text('image_url_s')->nullable();
            $table->text('image_url_m')->nullable();
            $table->text('image_url_l')->nullable();
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
};
