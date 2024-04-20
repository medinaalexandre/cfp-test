<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoleResource;
use App\Models\Role;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class RoleListController extends Controller
{
    public function __invoke(): AnonymousResourceCollection
    {
        return RoleResource::collection(Role::all());
    }
}
