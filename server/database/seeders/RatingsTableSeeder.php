<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rating;

class RatingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create a few ratings in the database
        Rating::create([
            'user_id' => 1,
            'isbn' => '1234567890',
            'rating' => 5
        ]);
        Rating::create([
            'user_id' => 2,
            'isbn' => '1234567890',
            'rating' => 10
        ]);

    }
}
