<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        if (Auth::user() == null) {
            return Inertia::render('Auth/Login');
        }

        $friends = User::with('acceptedFriendsTo.profile')->find(Auth::user()->id)->toArray()["accepted_friends_to"];
        array_push($friends, ...User::with('acceptedFriendsFrom.profile')->find(Auth::user()->id)->toArray()["accepted_friends_from"]);
        
        // friends invited by user, and invites to user
        // $pendingFriendsTo = Auth::user()->pendingFriendsTo;
        $pendingFriendsFrom = Auth::user()->pendingFriendsFrom()->with('profile')->get();

        // dd($pendingFriendsFrom->toArray());

        return Inertia::render('Home', [
            "profile" => Auth::user()->profile,
            "friends" => $friends,
            "pendingFriendsRequests" => $pendingFriendsFrom->toArray(),
        ]);
    }
}
