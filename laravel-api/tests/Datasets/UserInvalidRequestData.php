<?php

dataset('invalid_user_data', [
    'missing last_name' => fn () => [
        'data' => [
            'first_name' => fake()->firstName,
            'email' => fake()->email,
            'username' => fake()->userName,
            'birthday' => fake()->date,
            'password' => Str::password(20)
        ],
        'expect_missing' => [
            'last_name'
        ],
    ],
    'missing first_name' => fn () => [
        'data' => [
            'last_name' => fake()->lastName,
            'email' => fake()->email,
            'username' => fake()->userName,
            'birthday' => fake()->date,
            'password' => Str::password(20)
        ],
        'expect_missing' => [
            'first_name'
        ],
    ],
    'missing email' => fn () => [
        'data' => [
            'first_name' => fake()->firstName,
            'last_name' => fake()->lastName,
            'username' => fake()->userName,
            'birthday' => fake()->date,
            'password' => Str::password(20)
        ],
        'expect_missing' => [
            'email'
        ],
    ],
    'missing username' => fn () => [
        'data' => [
            'first_name' => fake()->firstName,
            'last_name' => fake()->lastName,
            'email' => fake()->email,
            'password' => Str::password(20)
        ],
        'expect_missing' => [
            'username'
        ],
    ],
    'missing password' => fn () => [
        'data' => [
            'first_name' => fake()->firstName,
            'last_name' => fake()->lastName,
            'username' => fake()->userName,
            'email' => fake()->email,
        ],
        'expect_missing' => [
            'password'
        ],
    ],
]);
