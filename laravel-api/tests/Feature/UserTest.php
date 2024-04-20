<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Auth\Access\AuthorizationException;

beforeEach(function () {
    $this->service = new UserService();
});

it('can create a user', function () {
    $data = [
        'first_name' => 'Alexandre',
        'last_name' => 'Medina',
        'username' => 'medinaalexandre',
        'email' => 'contato@medinaalexandre.dev',
        'mobile' => '+5555999999999',
        'password' => 'Str0ngP@ssw0rd!',
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
        'first_name' => $user->first_name.' updated',
        'email' => 'foo@bar.com',
    ];

    $user = $this->service->update($user, $updatedData);

    expect($user)
        ->first_name->toBe($updatedData['first_name'])
        ->email->toBe($updatedData['email']);
});

it('can delete a user', function () {
    $user = User::factory()->create();
    $this->actingAs(User::factory()->create(['is_admin' => true]));
    $this->service->delete($user);

    expect(User::find($user->getKey()))
        ->toBeNull();
});

it('cannot delete a user if is not an admin', function () {
    $user = User::factory()->create();
    $this->actingAs(User::factory()->create());
    $this->service->delete($user);
})->throws(AuthorizationException::class, 'You are not authorized to perform this action.');

it('cannot delete a admin user', function () {
    $user = User::factory()->create(['is_admin' => true]);
    $this->actingAs(User::factory()->create(['is_admin' => true]));
    $this->service->delete($user);
})->throws(AuthorizationException::class, 'You are not authorized to perform this action.');

it('cannot delete itself', function () {
    $user = User::factory()->create();
    $this->actingAs($user);
    $this->service->delete($user);
})->throws(AuthorizationException::class, 'You cannot delete yourself.');

it('can add a user to a role', function () {
    $user = User::factory()->create();
    $role = Role::factory()->create();

    $this->service->addRole($user, $role);

    expect($user->roles->count())->toBeOne()
        ->and($user->roles[0]->getKey())->toBe($role->getKey());
});

it('can remove a role from a user', function () {
    $user = User::factory()
        ->hasAttached(
            Role::factory()->createMany(2)
        )
        ->create();

    $toRemove = $user->roles[0];

    $this->service->removeRole($user, $toRemove);

    expect($user->roles()->count())->toBeOne()
        ->and($user->roles()->where('role_id', $toRemove->getKey())->count())->toBeEmpty();
});

it('can sync user roles', function () {
    $user = User::factory()->create();
    $roles = Role::factory()->createMany(2);
    $rolesIds = $roles->pluck('id')->toarray();

    $this->service->syncRoles($user, $rolesIds);

    expect($user->roles()->pluck('role_id')->toArray())
        ->toBe($rolesIds);
});
