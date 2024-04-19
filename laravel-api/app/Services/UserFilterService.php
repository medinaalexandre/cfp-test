<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Builder;

class UserFilterService
{
    protected const WHERE_LIKE_FILTERS = [
        'first_name',
        'last_name',
        'email',
        'mobile',
        'username',
    ];

    protected const WHERE_EQUAL_FILTERS = ['id'];

    public function __invoke(Builder $query, array $filters): Builder
    {
        foreach ($filters as $key => $value) {
            if ($key === 'search') {
                $query->where(function ($query) use ($value) {
                    $query->where('username', 'like', "$value%")
                        ->orWhere('email', 'like', "$value%")
                        ->orWhere('mobile', 'like', "$value%");
                });
            }

            if (in_array($key, self::WHERE_LIKE_FILTERS)) {
                $query->where($key, 'like', $value.'%');

                continue;
            }

            if (in_array($key, self::WHERE_EQUAL_FILTERS)) {
                $query->where($key, '=', $value);
            }
        }

        return $query;
    }
}
