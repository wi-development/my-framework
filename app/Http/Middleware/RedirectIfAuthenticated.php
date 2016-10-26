<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
    	if (Auth::guard($guard)->check()) {
    		//dd('sadfasdgdfsgsfd');

		    //dashboard = fallback
		    //return redirect()->intended('/backStagex');

            return redirect('/'.config('wi.dashboard.admin_prefix').'');
            return redirect('/backStage');
        }

        return $next($request);
    }
}
