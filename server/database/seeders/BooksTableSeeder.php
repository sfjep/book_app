<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book;

class BooksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create a few books in the database
        Book::create([
            'isbn' => '1234567890',
            'title' => 'Test Book 1',
            'author' => 'Test Author 1',
            'publication_year' => 2022,
            'publisher' => 'Test Publisher 1',
            'image_url_s' => 'http://images.amazon.com/images/P/0001047973.01.THUMBZZZ.jpg',
            'image_url_m' => 'http://images.amazon.com/images/P/0001047973.01.MZZZZZZZ.jpg',
            'image_url_l' => 'http://images.amazon.com/images/P/0001047973.01.LZZZZZZZ.jpg'
        ]);

    }
}
