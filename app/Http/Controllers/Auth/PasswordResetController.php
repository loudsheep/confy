<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class PasswordResetController extends Controller
{
    // display password reset link request view
    public function create()
    {
        return Inertia::render('Auth/ForgotPassword');
    }

    // handle password reset link request
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $status = Password::sendResetLink(
            $request->only('email')
        );

        // TODO translate messages/status
        if ($status == Password::RESET_LINK_SENT) {
            return back()->with('status', "Link sent");
        }

        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }
}
