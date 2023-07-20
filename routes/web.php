<?php

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
});


Route::get('/gen-users', function () {
    $user = User::factory()
        ->has(Profile::factory()->count(1))
        ->create();

    echo "Random user generated";
});


// Require routes from auth.php file
require __DIR__ . '/auth.php';
