<?php

use App\Http\Controllers\Auth\LoginSessionController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['guest'])->group(function () {
    Route::get('register', [RegisterController::class, 'create'])->name('register');

    Route::post('register', [RegisterController::class, 'store']);

    Route::get('login', [LoginSessionController::class, 'create'])->name('login');

    Route::post('login', [LoginSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetController::class, 'create'])->name('password.request');

    Route::post('forgot-password', [PasswordResetController::class, 'store'])->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])->name('password.store');
});


Route::middleware(['auth', 'web'])->group(function () {
    Route::get('logout', [LoginSessionController::class, 'destroy'])->name('logout');

    Route::post('logout', [LoginSessionController::class, 'destroy']);

    Route::get('profile', function () {
        return Inertia::render('Profile');
    });
});
