<?php

namespace App\Services;

use App\Models\Permission;

class PermissionService
{
    public function create(string $name): Permission
    {
        $permission = new Permission();
        $permission->name = $name;

        return tap($permission)->save();
    }

    public function update(Permission $permission, string $name): Permission
    {
        $permission->name = $name;

        return tap($permission)->save();
    }

    public function delete(Permission $permission): bool
    {
        return $permission->delete();
    }
}
