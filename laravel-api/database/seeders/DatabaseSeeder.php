<?php

namespace Database\Seeders;

use App\Models\User;
use Hash;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'email' => 'admin@cfp.com',
            'password' => Hash::make('P@ssword123!'),
        ]);
        User::factory(500)->create();
    }
}
