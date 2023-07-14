<?php

namespace Tests\Feature\Posts;

use App\Providers\RouteServiceProvider;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostTest extends TestCase
{
    use RefreshDatabase;

    public function test_post_creation_screen_can_be_rendered(): void
    {
        $response = $this->get('/post/create');

        $response->assertStatus(200);
    }
}
