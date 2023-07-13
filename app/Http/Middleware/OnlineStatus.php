<?php

namespace App\Http\Middleware;

use App\Models\User;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class OnlineStatus
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            if (Cache::get('is_online' . Auth::user()->id) == null) {
                Cache::put('is_online' . Auth::user()->id, true, Carbon::now()->addMinutes(5));

                //Last Seen
                User::where('id', Auth::user()->id)->update(['last_seen' => Carbon::now()]);
            }
        }

        return $next($request);
    }
}
