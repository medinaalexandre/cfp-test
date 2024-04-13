<?php

use App\Models\User;

beforeEach(function () {
    $this->password = '@Fo0B4r!';
    $this->username = 'foobar';
    $this->email = 'foo@bar.com';
    $this->user = User::factory()->create([
        'username' => $this->username,
        'email' => $this->email,
        'password' => Hash::make($this->password)
    ]);
});

it('can login with valid username and password', function () {
   $this->postJson('/api/login', [
        'username' => $this->username,
        'password' => $this->password,
    ])->assertOk()
       ->assertCookie('auth_token');;
});

it('can login with valid email and password', function () {
   $this->postJson('/api/login', [
        'email' => $this->email,
        'password' => $this->password,
    ])->assertOk()
       ->assertCookie('auth_token');
});

it('receive unauthorized when gives wrong credentials', function () {
    $this->postJson('/api/login', [
        'email' => $this->email,
        'password' => $this->password . 'WRONG',
    ])->assertUnauthorized();
});
