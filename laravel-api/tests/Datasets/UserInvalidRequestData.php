<?php

dataset('invalid_user_data', [
    'missing last_name' => fn () => [
        'data' => [
            'first_name' => fake()->firstName,
            'email' => fake()->email,
            'username' => fake()->userName,
            'birthday' => fake()->date,
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
        ],
        'expect_missing' => [
            'username'
        ],
    ],
]);
