<?php

use App\Models\User;

beforeEach(function () {
    $this->actingAs(User::factory()->create());
});

it('can list roles', function () {
    $this->get('/api/roles')
        ->assertOk();
});

it('can create role', function () {
    $this->postJson('/api/roles', [
        'name' => 'manager-from-test',
    ])->assertCreated()
        ->assertJsonPath('data.name', 'manager-from-test');
});
