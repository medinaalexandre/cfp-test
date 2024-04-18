<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\ListUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserFilterService;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserListController extends Controller
{
    public function __invoke(ListUserRequest $request, UserFilterService $filterService): AnonymousResourceCollection
    {
        $users = $filterService(User::query()->orderBy('id'), $request->validated())
            ->paginate(
                perPage: $request->getPerPage(),
                page: $request->getPage()
            );

        return UserResource::collection($users);
    }
}
