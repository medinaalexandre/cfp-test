<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserListController extends Controller
{
    public function __invoke(Request $request): AnonymousResourceCollection
    {
        // TODO implement filters and paginate params

        $users = User::query()->paginate(20);

        return UserResource::collection($users);
    }
}
