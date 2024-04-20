<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Hash;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'email' => 'admin@cfp.com',
            'password' => Hash::make('P@ssword123!'),
        ]);

        $roles = Role::factory()->count(4)->state(new Sequence(
            ['name' => 'supervisor'],
            ['name' => 'manager'],
            ['name' => 'IT'],
            ['name' => 'Financial'],
        ))->create();

        User::factory(500)
            ->hasAttached($roles)
            ->create();
    }
}
