<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class UserPolicy
{
    public function delete(User $user, User $model): Response
    {
        if ($user->id === $model->id) {
            return Response::denyWithStatus(
                status: HttpResponse::HTTP_FORBIDDEN,
                message: 'You cannot delete yourself.'
            );
        }

        if ($model->is_admin || ! $user->is_admin) {
            return Response::denyWithStatus(
                status: HttpResponse::HTTP_FORBIDDEN,
                message: 'You are not authorized to perform this action.'
            );
        }

        return Response::allow();
    }

    public function forceDelete(User $user, User $model): Response
    {
        return $this->delete($user, $model);
    }
}
