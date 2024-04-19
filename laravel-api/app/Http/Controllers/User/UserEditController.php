<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\EditUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;

class UserEditController extends Controller
{
    public function __invoke(EditUserRequest $request, User $user, UserService $service): UserResource
    {
        $user = $service->update($user, $request->validated());

        return UserResource::make($user);
    }
}
