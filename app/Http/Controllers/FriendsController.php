<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FriendsController extends Controller
{
    public function invite(Request $request, User $user)
    {
        if ($user->id == $request->user()->id) {
            return back();
        }

        if ($request->user()->friendsTo->contains($user) || $user->friendsTo->contains($request->user())) {
            return back();
        }

        $request->user()->friendsTo()->attach($user, ['accepted' => true]);

        return back();
    }
}
