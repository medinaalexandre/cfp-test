<?php


use App\Models\User;
use Illuminate\Testing\TestResponse;

beforeEach(function () {
    $this->actingAs(User::factory()->create());
});

it('validate the request on create', function (array $requestData) {
    /** @var TestResponse $res */
    $res = $this->postJson('/api/users', $requestData['data']);
    $res->assertUnprocessable();

    $missingFields = array_keys($res->getOriginalContent()['errors']);
    expect($missingFields)->toEqualCanonicalizing($requestData['expect_missing']);
})
    ->with('invalid_user_data');

it('can list the users', function () {
    User::factory()->createMany(40);

    /** @var TestResponse $res */
    $res = $this->get('/api/users');

    $res->assertOk()
        ->assertJsonStructure([
            'data',
            'links',
            'meta'
        ])
        ->assertJsonPath('meta.total', User::count());
});

it('can get a single user', function () {
    $user = User::factory()->create();

    /** @var TestResponse $res */
    $res = $this->get('/api/users/' . $user->getKey());
    $res->assertOk()
        ->assertJsonMissingPath('data.password')
        ->assertJsonPath('data.id', $user->getKey());
});
