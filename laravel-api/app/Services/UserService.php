<?php

namespace App\Services;

use App\Models\Role;
use App\Models\User;
use Hash;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Gate;

class UserService
{
    public function create(array $data): User
    {
        $user = new User();

        foreach ($data as $key => $value) {
            $user[$key] = $value;
        }

        $user->password = Hash::make($user->password);

        return tap($user)->save();
    }

    public function update(User $user, array $data): User
    {
        foreach ($data as $key => $value) {
            $user[$key] = $value;
        }

        if (isset($data['password'])) {
            $user->password = Hash::make($data['password']);
        }

        return tap($user)->save();
    }

    /**
     * @throws AuthorizationException
     */
    public function delete(User $user): void
    {
        Gate::authorize('delete', $user);

        $user->delete();
    }

    public function addRole(User $user, Role $role): void
    {
        $user->roles()->attach($role);
    }

    public function removeRole(User $user, Role $role): void
    {
        $user->roles()->detach($role);
    }

    public function syncRoles(User $user, array $roleIds): void
    {
        $user->roles()->sync($roleIds);
    }
}
