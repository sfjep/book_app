<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $table = 'books';
    protected $primaryKey = 'isbn';
    public $incrementing = false; // 'isbn' is not autoincrementing
    protected $keyType = 'string';  // 'isbn' is treated as a string
    protected $fillable = ['isbn', 'title', 'author', 'publication_year', 'publisher', 'image_url_s', 'image_url_m', 'image_url_l'];
    public $timestamps = false; # Makes sure Laravel doesn't add updated_at and created_at cols

    public function ratings()
    {
        return $this->hasMany(Rating::class, 'isbn', 'isbn');
    }
}
