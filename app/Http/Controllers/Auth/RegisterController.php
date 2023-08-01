<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Intervention\Image\Facades\Image;
use Inertia\Inertia;
use Inertia\Response;

class RegisterController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            // 'date_of_birth' => 'required|date',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'terms' => ['accepted'],
            'avatar' => ['image', 'mimes:png,jpg,bmp', 'nullable'],
        ]);


        $profile_image = "";
        if ($request->avatar == null) {
            $profile_image = "/defaults/profile.png";
        } else {
            $profile_image = $request->avatar->store('avatars', 'public');
            $image = Image::make(public_path("storage/" . $profile_image))->fit(200, 200);
            $image->save();

            $profile_image = "/storage/" . $profile_image;
        }

        $user = User::create([
            'name' => $request->first_name . " " . $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);


        $user->profile()->create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'date_of_birth' => Carbon::today(),
            // 'date_of_birth' => $request->date_of_birth,
            'profile_image' => $profile_image,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
