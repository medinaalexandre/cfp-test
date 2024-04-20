<?php

use App\Models\Permission;
use App\Services\PermissionService;

beforeEach(function () {
    $this->service = new PermissionService();
});

it('can create a permission', function () {
    $name = 'user.create';

    $permission = $this->service->create($name);

    expect($permission)->name->toBe($name)
        ->id->toBeInt();
});

it('can update a permission', function () {
    $permission = Permission::factory()->create();
    $newName = fake()->word().'--avoid-conflict';

    $permission = $this->service->update($permission, $newName);

    expect($permission)->name->toBe($newName);
});

it('can delete a permission', function () {
    $isDeleted = $this->service->delete(Permission::factory()->create());
    expect($isDeleted)->toBeTrue();
});
