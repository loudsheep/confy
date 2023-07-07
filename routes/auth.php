<?php

use App\Http\Controllers\Auth\LoginSessionController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisterController::class, 'create'])->name('register');

    Route::post('register', [RegisterController::class, 'store']);

    Route::get('login', [LoginSessionController::class, 'create'])->name('login');

    Route::post('login', [LoginSessionController::class, 'store']);
});
