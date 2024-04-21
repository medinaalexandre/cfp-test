<?php

use App\Models\Role;
use App\Models\User;
use Illuminate\Testing\TestResponse;

beforeEach(function () {
    $this->actingAs(User::factory()->create(['is_admin' => true]));
});

it('validate the request on create', function (array $requestData) {
    /** @var TestResponse $res */
    $res = $this->postJson('/api/users', $requestData['data']);
    $res->assertUnprocessable();

    $missingFields = array_keys($res->getOriginalContent()['errors']);
    expect($missingFields)->toEqualCanonicalizing($requestData['expect_missing']);
})
    ->with('invalid_user_data');

it('can list the users', function () {
    User::factory()->createMany(40);

    /** @var TestResponse $res */
    $res = $this->get('/api/users');

    $res->assertOk()
        ->assertJsonStructure([
            'data',
            'links',
            'meta',
        ])
        ->assertJsonPath('meta.total', User::count());
});

it('can get a single user', function () {
    $user = User::factory()->create();

    /** @var TestResponse $res */
    $res = $this->get('/api/users/'.$user->getKey());
    $res->assertOk()
        ->assertJsonMissingPath('data.password')
        ->assertJsonPath('data.id', $user->getKey());
});

it('can create a user', function () {
    $this->post('/api/users', [
        'first_name' => 'Test 1',
        'username' => 'test1',
        'last_name' => 'tester 2',
        'email' => 'tester@test.com',
        'password' => 'P4ssword@!@#',
    ])->assertCreated();
});

it('can delete a user', function () {
    $user = User::factory()->create();
    $this->delete('/api/users/'.$user->getKey())
        ->assertNoContent();
});

it('cannot delete itself', function () {
    $user = User::factory()->create();
    $this->actingAs($user);
    $this->delete('/api/users/'.$user->getKey())
        ->assertForbidden();
});

it('cannot delete a admin', function () {
    $user = User::factory()->create(['is_admin' => true]);
    $this->delete('/api/users/'.$user->getKey())
        ->assertForbidden();
});

it('can update a user', function () {
    $user = User::factory()->create();
    $this->put('/api/users/'.$user->getKey(), [
        'first_name' => 'Updated ',
        'last_name' => $user->last_name,
        'email' => $user->email,
        'username' => $user->username,
        'birthday' => $user->birthday,
        'mobile' => $user->mobile,
    ])->assertOk()
        ->assertJsonPath('data.first_name', 'Updated');
});

it('cannot update the username to a existing one', function () {
    $userName = 'CFPEnergy';
    User::factory()->create(['username' => $userName]);
    $user = User::factory()->create();

    /** @var TestResponse $res */
    $res = $this->putJson('/api/users/'.$user->getKey(), [
        'first_name' => $user->first_name,
        'last_name' => $user->last_name,
        'email' => $user->email,
        'username' => $userName,
        'birthday' => $user->birthday,
        'mobile' => $user->mobile,
        'is_admin' => (int) $user->is_admin,
    ]);

    $res->assertUnprocessable()
        ->assertJsonPath('message', 'The username has already been taken.');
});

it('cannot update the email to a existing one', function () {
    $email = 'admin@cfpenergy.com';
    User::factory()->create(['email' => $email]);
    $user = User::factory()->create();

    /** @var TestResponse $res */
    $res = $this->putJson('/api/users/'.$user->getKey(), [
        'first_name' => $user->first_name,
        'last_name' => $user->last_name,
        'email' => $email,
        'username' => $user->username,
        'birthday' => $user->birthday,
        'mobile' => $user->mobile,
        'is_admin' => (int) $user->is_admin,
    ]);

    $res->assertUnprocessable()
        ->assertJsonPath('message', 'The email has already been taken.');
});

it('can add a role to a user', function () {
    $user = User::factory()->create();
    $role = Role::factory()->create();

    $this->postJson("/api/users/{$user->getKey()}/roles/add", [
        'role_id' => $role->getKey(),
    ])->assertNoContent();

    expect($user->roles[0]->getKey())->toBe($role->getKey());
});

it('can remove a role from a user', function () {
    $user = User::factory()->create();
    $role = Role::factory()->create();

    $this->delete("/api/users/{$user->getKey()}/roles/{$role->getKey()}")
        ->assertNocontent();

    expect($user->roles()->count())->toBe(0);
});

it('cannot add a role that the user already have', function () {
    $role = Role::factory()->create();
    $user = User::factory()
        ->hasAttached($role)
        ->create();

    $this->postJson("/api/users/{$user->getKey()}/roles/add", [
        'role_id' => $role->getKey(),
    ])->assertBadRequest()
        ->assertContent('"The user already has this role"');
});
