<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Testing\TestResponse;

beforeEach(function () {
    $this->service = new UserService();
});

it('can create a user', function () {
    $data = [
        'first_name' => 'Alexandre',
        'last_name' => 'Medina',
        'username' => 'medinaalexandre',
        'email' => 'contato@medinaalexandre.dev',
        'password' => 'Str0ngP@ssw0rd!'
    ];

    $user = $this->service->create($data);

    expect($user)
        ->id->toBeInt()
        ->first_name->toBe($data['first_name'])
        ->last_name->toBe($data['last_name'])
        ->username->toBe($data['username'])
        ->email->toBe($data['email']);
});

it('can update a user', function () {
   $user = User::factory()->create();
   $updatedData = [
       'first_name' => $user->first_name . ' updated',
       'email' => 'foo@bar.com'
   ];

   $user = $this->service->update($user, $updatedData);

   expect($user)
       ->first_name->toBe($updatedData['first_name'])
       ->email->toBe($updatedData['email']);
});

it('can delete a user', function () {
    $user = User::factory()->create();

    $this->service->delete($user);

    expect(User::find($user->getKey()))
        ->toBeNull();
});

it('validate the request input', function (array $requestData) {
    /** @var TestResponse $res */
    $res = $this->postJson('/api/users', $requestData['data']);
    $res->assertUnprocessable();

    $missingFields = array_keys($res->getOriginalContent()['errors']);
    expect($missingFields)->toEqualCanonicalizing($requestData['expect_missing']);
})
    ->with('invalid_user_data');
