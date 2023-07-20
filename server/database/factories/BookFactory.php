<?php

namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Book::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'isbn' => $this->faker->unique()->randomNumber(9, true),
            'title' => $this->faker->sentence(),
            'author' => $this->faker->name(),
            'publication_year' => $this->faker->year(),
            'publisher' => $this->faker->company(),
            'image_url_s' => "http://images.amazon.com/images/P/0001047973.01.THUMBZZZ.jpg",
            'image_url_m' => "http://images.amazon.com/images/P/0001047973.01.MZZZZZZZ.jpg",
            'image_url_l' => "http://images.amazon.com/images/P/0001047973.01.LZZZZZZZ.jpg",
        ];
    }
}
