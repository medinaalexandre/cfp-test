<?php

namespace App\Http\Controllers\User\Roles;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class UserDeleteRoleController extends Controller
{
    public function __invoke(User $user, Role $role, UserService $service): JsonResponse
    {
        $service->removeRole($user, $role);

        return response()->json(status: Response::HTTP_NO_CONTENT);
    }
}
