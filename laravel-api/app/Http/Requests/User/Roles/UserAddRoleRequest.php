<?php

namespace App\Http\Requests\User\Roles;

use Illuminate\Foundation\Http\FormRequest;

class UserAddRoleRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'role_id' => 'required|int',
        ];
    }
}
