<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class CheckController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json();
    }
}
