<?php

use App\Models\Permission;
use App\Models\Role;
use App\Services\RoleService;

beforeEach(function () {
    $this->service = new RoleService();
});

it('can create a role', function () {
    $name = 'manager';

    $role = $this->service->create($name);

    expect($role)->name->toBe($name)
        ->id->toBeInt();
});

it('can update a role', function () {
    $role = Role::factory()->create();
    $newName = fake()->word().'--avoid-conflict';

    $role = $this->service->update($role, $newName);

    expect($role)->name->toBe($newName);
});

it('can delete a role', function () {
    $isDeleted = $this->service->delete(Role::factory()->create());
    expect($isDeleted)->toBeTrue();
});

it('can add a permission', function () {
    $role = Role::factory()->create();
    $permission = Permission::factory()->create();
    $this->service->addPermission($role, $permission);

    expect($role->permissions()->count())->toBe(1)
        ->and($role->permissions[0]->getKey())->toBe($permission->getKey());
});

it('can remove a permission', function () {
    $totalPermissions = 3;
    $role = Role::factory()
        ->hasAttached(
            Permission::factory()->count($totalPermissions),
        )->create();
    $toRemove = $role->permissions[0];

    $this->service->removePermission($role, $toRemove);

    expect($role->permissions()->count())
        ->toBe(--$totalPermissions)
        ->and($role->permissions()->where('permission_id', $toRemove->getKey())->count())
        ->toBe(0);
});

it('can sync role permissions', function () {
    $role = Role::factory()->create();
    $permissions = Permission::factory()->createMany(2);
    $permissionIds = $permissions->pluck('id')->toArray();

    $this->service->syncPermissions($role, $permissionIds);

    expect($role->permissions()->pluck('permission_id')->toArray())
        ->toBe($permissionIds);
});
