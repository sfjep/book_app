<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Create a few users in the database
        User::create([
            'user_id' => 1,
            'location' => 'Some location',
            'age' => 55
        ]);
        User::create([
            'user_id' => 2,
            'location' => 'Some other location',
            'age' => 50
        ]);

    }
}
