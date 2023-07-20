<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Notifications\ResetPasswordNotification;
use App\Notifications\VerifyEmailNotification;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\URL;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'last_seen',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'email',
        'email_verified_at',
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_seen' => 'datetime',
    ];


    /**
     * Send an email verification notification to the user.
     *
     * @return void
     */
    public function sendEmailVerificationNotification()
    {
        $url = URL::temporarySignedRoute(
            "verification.verify",
            Carbon::now()->addMinutes(60),
            [
                "id" => $this->id,
                "hash" => sha1($this->email),
            ]
        );

        $this->notify(new VerifyEmailNotification($url, $this->name));
    }

    /**
     * Send a password reset notification to the user.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $url = route('password.reset', [
            "token" => $token,
            "email" => $this->email,
        ]);

        $this->notify(new ResetPasswordNotification($url, $this->name));
    }


    // profile of the user
    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    // posts of the user
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    // friends that current user has invited
    public function friendsTo()
    {
        return $this->belongsToMany(User::class, 'friends', 'user_id', 'friend_id')
            ->withPivot('accepted')
            ->withTimestamps();
    }

    // friends that current user was invited by
    public function friendsFrom()
    {
        return $this->belongsToMany(User::class, 'friends', 'friend_id', 'user_id')
            ->withPivot('accepted')
            ->withTimestamps();
    }

    public function pendingFriendsTo()
    {
        return $this->friendsTo()->wherePivot('accepted', false);
    }

    public function pendingFriendsFrom()
    {
        return $this->friendsFrom()->wherePivot('accepted', false);
    }

    public function acceptedFriendsTo()
    {
        return $this->friendsTo()->wherePivot('accepted', true);
    }

    public function acceptedFriendsFrom()
    {
        return $this->friendsFrom()->wherePivot('accepted', true);
    }

    // get all accepted frineds, works differently than other relations,
    // when getting all friends it must be called user->allFriends()
    // user->allFriends doesn't work (throws exception)
    public function allFriends()
    {
        return $this->acceptedFriendsFrom->merge($this->acceptedFriendsTo);
    }
}
