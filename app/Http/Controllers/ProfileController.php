<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function show(Request $request, User $user) {
        if (Auth::user() == null) {
            return Inertia::render('Auth/Login');
        }

        $friends = User::with('acceptedFriendsTo.profile')->find(Auth::user()->id)->toArray()["accepted_friends_to"];
        array_push($friends, ...User::with('acceptedFriendsFrom.profile')->find(Auth::user()->id)->toArray()["accepted_friends_from"]);
        
        // friends invited by user, and invites to user
        // $pendingFriendsTo = Auth::user()->pendingFriendsTo;
        $pendingFriendsFrom = Auth::user()->pendingFriendsFrom()->with('profile')->get();

        // dd($pendingFriendsFrom->toArray());

        return Inertia::render('Profile', [
            "profile" => Auth::user()->profile,
            "friends" => $friends,
            "pendingFriendsRequests" => $pendingFriendsFrom->toArray(),
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
