<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Resources\UserResource;
use App\Services\UserService;

class UserCreateController extends Controller
{
    public function __invoke(CreateUserRequest $request, UserService $service): UserResource
    {
        $user = $service->create($request->validated());

        return UserResource::make($user);
    }
}
