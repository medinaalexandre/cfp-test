<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'email' => 'required_if:username,null|email',
            'username' => 'required_if:email,null|string',
            'password' => 'required',
            'mobile' => 'string|nullable',
        ];
    }

    public function getEmail(): ?string
    {
        return $this->get('email');
    }

    public function getUsername(): ?string
    {
        return $this->get('username');
    }

    public function getPassword(): string
    {
        return $this->get('password');
    }

    public function getMobile(): ?string
    {
        return $this->get('mobile');
    }
}
