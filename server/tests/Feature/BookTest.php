<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Book;

class BookTest extends TestCase
{
    use RefreshDatabase;

    public function test_books_can_be_retrieved()
    {
        // Create a new book using the factory
        $book = Book::factory()->create();

        // Make a GET request to the API
        $response = $this->get('/api/books');

        // Assert that the response status is 200 OK
        $response->assertStatus(200);

        // Assert that the response contains the book data
        $response->assertJsonFragment([
            'isbn' => (string) $book->isbn,
            'title' => $book->title,
            'author' => $book->author,
            'publication_year' => (int) $book->publication_year,
            'publisher' => $book->publisher,
            'avg_rating' => $book->avg_rating,
            'num_ratings' => $book->num_ratings
        ]);
    }

    public function test_book_can_be_created()
    {
        // Make a POST request to the API
        $response = $this->post('/api/books', [
            'isbn' => '123456789',
            'title' => 'Test Book',
            'author' => 'Test Author',
            'publication_year' => '2023',
            'publisher' => 'Test Publisher'
        ]);

        // Assert that the response status is 201 Created
        $response->assertStatus(201);

        // Assert that the book was created in the database
        $this->assertDatabaseHas('books', [
            'isbn' => '123456789',
            'title' => 'Test Book',
            'author' => 'Test Author',
            'publication_year' => '2023',
            'publisher' => 'Test Publisher'
        ]);
    }
    public function test_book_can_be_retrieved()
    {
        $book = Book::factory()->create();

        $response = $this->get('/api/books/' . $book->isbn);

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'isbn' => (string) $book->isbn,
            'title' => $book->title,
            'author' => $book->author,
            'publication_year' => (int) $book->publication_year,
            'publisher' => $book->publisher,
            'avg_rating' => $book->avg_rating,
            'num_ratings' => $book->num_ratings
        ]);
    }

    public function test_book_can_be_updated()
    {
        // Creates a record in database and returns obj
        $book = Book::factory()->create();

        // Updates the newly created record
        $response = $this->put('/api/books/' . $book->isbn, [
            'isbn' => '987654321',
            'title' => 'Updated Book',
            'author' => 'Updated Author',
            'publication_year' => '2022',
            'publisher' => 'Updated Publisher'
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('books', [
            'isbn' => '987654321',
            'title' => 'Updated Book',
            'author' => 'Updated Author',
            'publication_year' => '2022',
            'publisher' => 'Updated Publisher'
        ]);
    }

    public function test_book_can_be_deleted()
    {
        $book = Book::factory()->create();

        $response = $this->delete('/api/books/' . $book->isbn);

        $response->assertStatus(200);

        $this->assertDatabaseMissing('books', [
            'isbn' => (string) $book->isbn
        ]);
    }

    public function test_books_can_be_filtered_by_author()
{
    // Create three books
    $book1 = Book::factory()->create([
        'author' => 'Author 1',
    ]);
    $book2 = Book::factory()->create([
        'author' => 'Author 2',
    ]);
    $book3 = Book::factory()->create([
        'author' => 'Author 1',
    ]);

    // Make a GET request to the API to filter by 'Author 1'
    $response = $this->get('/api/books?author=Author 1');

    // Assert that the response status is 200 OK
    $response->assertStatus(200);

    // Assert that the response contains the two books by 'Author 1'
    $response->assertJsonFragment([
        'isbn' => (string) $book1->isbn,
        'author' => $book1->author,
    ]);
    $response->assertJsonFragment([
        'isbn' => (string) $book3->isbn,
        'author' => $book3->author,
    ]);

    // Assert that the response does not contain the book by 'Author 2'
    $response->assertJsonMissing([
        'isbn' => (string) $book2->isbn,
        'author' => $book2->author,
    ]);
}
public function test_books_can_be_filtered_by_title()
{
    // Create three books
    $book1 = Book::factory()->create([
        'title' => 'Title 1',
    ]);
    $book2 = Book::factory()->create([
        'title' => 'Title 2',
    ]);
    $book3 = Book::factory()->create([
        'title' => 'Title 1',
    ]);

    // Make a GET request to the API to filter by 'Title 1'
    $response = $this->get('/api/books?title=Title 1');

    // Assert that the response status is 200 OK
    $response->assertStatus(200);

    // Assert that the response contains the two books with 'Title 1'
    $response->assertJsonFragment([
        'isbn' => (string) $book1->isbn,
        'title' => $book1->title,
    ]);
    $response->assertJsonFragment([
        'isbn' => (string) $book3->isbn,
        'title' => $book3->title,
    ]);

    // Assert that the response does not contain the book with 'Title 2'
    $response->assertJsonMissing([
        'isbn' => (string) $book2->isbn,
        'title' => $book2->title,
    ]);
}


}
