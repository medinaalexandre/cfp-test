<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Auth;
use Symfony\Component\HttpFoundation\Response;

class LoginController extends Controller
{
    public function __invoke(LoginRequest $request)
    {
        /** @var User $user */
        $user = User::query()
            ->where('email', $request->getEmail())
            ->orWhere('username', '=', $request->getUsername())
            ->first();

        if (! $user) {
            return response()->json(['message' => 'wrong credentials'], Response::HTTP_UNAUTHORIZED);
        }

        $credentials = [
            'email' => $user->email,
            'password' => $request->getPassword(),
        ];

        if (! Auth::attempt($credentials, true)) {
            return response()->json(['message' => 'wrong credentials'], Response::HTTP_UNAUTHORIZED);
        }

        $token = $user->createToken($request->getMobile() ?? 'authToken')->plainTextToken;
        $cookie = cookie('auth_token', $token, 60 * 24 * 7);

        return response()->json()->withCookie($cookie);
    }
}
