<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserViewController extends Controller
{
    public function __invoke(User $user): UserResource
    {
        return UserResource::make($user);
    }
}
