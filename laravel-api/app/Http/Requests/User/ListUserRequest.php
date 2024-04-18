<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class ListUserRequest extends FormRequest
{
    public function rules(): array
    {
        $stringRule = 'nullable|string|max:255';
        $numericRule = 'nullable|numeric|min:0';

        return [
            'per_page' => $numericRule . '|max:100',
            'current_page' => $stringRule,
            'search' => $stringRule,
            'id' => $numericRule,
            'first_name' => $stringRule,
            'last_name' => $stringRule,
            'username' => $stringRule,
            'email' => $stringRule,
            'mobile' => $stringRule,
        ];
    }

    public function getPerPage(int $default = 15): int
    {
        return $this->validated()['per_page'] ?? $default;
    }

    public function getPage(int $default = 1): int
    {
        return $this->validated()['current_page'] ?? $default;
    }
}
