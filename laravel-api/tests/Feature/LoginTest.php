<?php

use App\Models\User;

beforeEach(function () {
    $this->password = '@Fo0B4r!';
    $this->username = 'foobar';
    $this->email = 'foo@bar.com';
    $this->user = User::factory()->create([
        'first_name' => 'alexandre',
        'last_name' => 'medina',
        'username' => $this->username,
        'email' => $this->email,
        'password' => Hash::make($this->password),
    ]);
});

it('can login with valid username and password', function () {
    $this->postJson('/api/login', [
        'username' => $this->username,
        'password' => $this->password,
    ])->assertOk()
        ->assertCookie('auth_token');
});

it('can login with valid email and password', function () {
    $this->postJson('/api/login', [
        'email' => $this->email,
        'password' => $this->password,
    ])->assertOk()
        ->assertCookie('auth_token');
});

it('receives unauthorized with wrong email', function () {
    $this->postJson('/api/login', [
        'email' => $this->email.'m',
        'password' => $this->password,
    ])->assertUnauthorized();
});

it('receives unauthorized with wrong password', function () {
    $this->postJson('/api/login', [
        'email' => $this->email,
        'password' => $this->password.'w',
    ])->assertUnauthorized();
});

it('receive unauthorized when gives wrong credentials', function () {
    $this->postJson('/api/login', [
        'email' => $this->email,
        'password' => $this->password.'WRONG',
    ])->assertUnauthorized();
});

it('can logout', function () {
    $this->actingAs(User::factory()->create());
    $this->post('/api/logout')
        ->assertNoContent();
});

it('can check if the user is logged', function () {
    $this->actingAs(User::factory()->create());
    $this->get('/api/check')
        ->assertOk();
});

it('deny check if the user is not logged', function () {
    $this->withHeaders([
        'accept' => 'application/json',
    ])->get('/api/check')
        ->assertUnauthorized();
});
