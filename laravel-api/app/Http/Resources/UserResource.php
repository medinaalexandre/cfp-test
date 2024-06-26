<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function __construct($resource, protected bool $addRoles = false)
    {
        parent::__construct($resource);
    }

    public function toArray(Request $request): array
    {
        /** @var User $user */
        $user = $this->resource;

        $data = [
            'id' => $user->getKey(),
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'username' => $user->username,
            'email' => $user->email,
            'mobile' => $user->mobile,
            'is_admin' => $user->is_admin,
            'birthday' => $user->birthday?->toDateString() ?? '',
        ];

        if ($this->addRoles) {
            $data['roles'] = RoleResource::collection($user->roles);
        }

        return $data;
    }
}
