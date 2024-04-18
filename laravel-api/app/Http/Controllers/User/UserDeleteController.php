<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class UserDeleteController extends Controller
{
    public function __invoke(User $user, UserService $service): JsonResponse
    {
        try {
            $service->delete($user);
        } catch (AuthorizationException $exception) {
            return response()->json($exception->response()->message(), $exception->response()->status());
        }

        return response()->json(status: Response::HTTP_NO_CONTENT);
    }
}
