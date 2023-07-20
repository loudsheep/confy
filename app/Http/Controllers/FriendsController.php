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

        // TODO check if user was invited by that user or user already invited that user
        // TODO accepted to false on production

        $request->user()->friendsTo()->attach($user, ['accepted' => true]);

        return back();
    }
}
