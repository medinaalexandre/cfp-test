<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class UserPolicy
{
    public function delete(User $user, User $model): Response
    {
        if ($model->is_admin) {
            return Response::denyWithStatus(
                status: HttpResponse::HTTP_UNAUTHORIZED,
                message: 'You are not authorized to perform this action.'
            );
        }

        if ($user->id === $model->id) {
            return Response::denyWithStatus(
                status: HttpResponse::HTTP_BAD_REQUEST,
                message: 'You cannot delete yourself.'
            );
        }

        return Response::allow();
    }

    public function forceDelete(User $user, User $model): Response
    {
        return $this->delete($user, $model);
    }
}
