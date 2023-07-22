<?php

use App\Http\Controllers\FriendsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Models\Profile;
use App\Models\User;
use Database\Factories\UserFactory;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['web'])->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
});

Route::middleware(['auth', 'web'])->group(function () {
    Route::get('/post/create', [PostController::class, 'create'])->name('post.create');

    Route::post('/post/store', [PostController::class, 'store'])->name('post.store');

    Route::any('/search/users/{term?}', [SearchController::class, 'searchUsers'])->name('search.users');

    Route::post('/invite/{user}', [FriendsController::class, 'invite'])->name('invite.friend');
});


Route::get('/gen-users', function () {
    $f_name = fake()->firstName();
    $l_name = fake()->lastName();
    
    $user = User::factory(1, ['name' => $f_name . ' ' . $l_name])
        ->has(Profile::factory()
            ->count(1)
            ->state(function (array $attributes, User $user) use ($f_name, $l_name) {
                return ['first_name' => $f_name, 'last_name' => $l_name];
            }))
        ->create();

    echo "Random user generated";
});


// Require routes from auth.php file
require __DIR__ . '/auth.php';
