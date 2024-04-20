<?php

namespace App\Services;

use App\Models\Permission;
use App\Models\Role;

class RoleService
{
    public function create(string $name): Role
    {
        $role = new Role();
        $role->name = $name;

        return tap($role)->save();
    }

    public function update(Role $role, string $name): Role
    {
        $role->name = $name;

        return tap($role)->save();
    }

    public function delete(Role $role): bool
    {
        return $role->delete();
    }

    public function addPermission(Role $role, Permission $permission): void
    {
        $role->permissions()->attach($permission->getKey());
    }

    public function removePermission(Role $role, Permission $permission): void
    {
        $role->permissions()->detach($permission->getKey());
    }

    public function syncPermissions(Role $role, array $permissionIds): void
    {
        $role->permissions()->sync($permissionIds);
    }
}
