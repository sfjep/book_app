<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index(Request $request)
    {
        // Get query parameters for filtering
        $author = $request->query('author');
        $title = $request->query('title');

        // Start a new query
        $query = DB::table('books_rated');

        // Add conditions to the query if the parameters are present
        if (!empty($author)) {
            $query->where('author', 'like', '%' . $author . '%');
        }
        if (!empty($title)) {
            $query->where('title', 'like', '%' . $title . '%');
        }

        // Execute the query and return the results
        $books = $query->get();
        return response()->json($books);
    }


    public function show($isbn)
    {
        $book = DB::table('books_rated')->where('isbn', $isbn)->first();
        return response()->json($book);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'isbn' => 'required',
            'title' => 'required',
            'author' => 'required',
            'publication_year' => 'required',
            'publisher' => 'required'
        ]);

        $book = Book::create($request->all());
        return response()->json($book, 201);
    }

    public function update(Request $request, $isbn)
    {
        $this->validate($request, [
            'isbn' => 'required',
            'title' => 'required',
            'author' => 'required',
            'publication_year' => 'required',
            'publisher' => 'required',
            'image_url_s' => 'nullable',
            'image_url_m' => 'nullable',
            'image_url_l' => 'nullable',
        ]);

        $book = Book::where('isbn', $isbn)->first();

        if($book){
            $book->update($request->all());
            return response()->json($book);
        }else{
            return response()->json(["message" => "Book not found"], 404);
        }
    }

    public function destroy($isbn)
    {
        $book = Book::where('isbn', $isbn)->first();

        if($book){
            $book->delete();
            return response()->json(["message" => "Book deleted successfully"]);
        }else{
            return response()->json(["message" => "Book not found"], 404);
        }
    }
}
