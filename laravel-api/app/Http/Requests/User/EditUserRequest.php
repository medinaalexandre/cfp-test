<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class EditUserRequest extends FormRequest
{
    public function rules(): array
    {
        $stringRule = 'required|string|min:3|max:255';
        $userId = $this->route('user')->id;

        return [
            'first_name' => $stringRule,
            'last_name' => $stringRule,
            'email' => "required|email|unique:users,email,$userId",
            'username' => $stringRule."|unique:users,username,$userId",
            'birthday' => 'nullable|sometimes|date',
            'mobile' => 'nullable|string',
            'is_admin' => 'boolean',
        ];
    }
}
