<?php

namespace App\Http\Controllers\User\Roles;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\Roles\UserAddRoleRequest;
use App\Models\Role;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class UserAddRoleController extends Controller
{
    public function __invoke(UserAddRoleRequest $request, User $user, UserService $service): JsonResponse
    {
        $role = Role::findOrFail($request->get('role_id'));

        try {
            $service->addRole($user, $role);
        } catch (UniqueConstraintViolationException) {
            return response()->json('The user already has this role', status: Response::HTTP_BAD_REQUEST);
        }

        return response()->json(status: Response::HTTP_NO_CONTENT);
    }
}
