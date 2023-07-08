<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        if (Auth::user() != null) {
            return Inertia::render('Home');
        } else {
            return Inertia::render('Auth/Login');
        }
    }
}
