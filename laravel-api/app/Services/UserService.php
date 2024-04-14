<?php

namespace App\Services;

use App\Models\User;
use Hash;

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

    public function delete(User $user): void
    {
        $user->delete();
    }
}
