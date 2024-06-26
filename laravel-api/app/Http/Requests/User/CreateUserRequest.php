<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class CreateUserRequest extends FormRequest
{
    public function rules(): array
    {
        $stringRule = 'required|string|min:3|max:255';

        return [
            'first_name' => $stringRule,
            'last_name' => $stringRule,
            'email' => 'required|email|unique:users,email',
            'username' => $stringRule.'|unique:users,username',
            'birthday' => 'nullable|sometimes|date',
            'mobile' => 'nullable|string',
            'password' => ['required', Password::defaults()],
            'is_admin' => 'boolean',
        ];
    }
}
