<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use App\Http\Requests\Role\RoleCreateRequest;
use App\Http\Resources\RoleResource;
use App\Services\RoleService;

class RoleCreateController extends Controller
{
    public function __invoke(RoleCreateRequest $request, RoleService $service): RoleResource
    {
        $role = $service->create($request->get('name'));

        return RoleResource::make($role);
    }
}
