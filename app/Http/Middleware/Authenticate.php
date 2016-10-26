<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class Authenticate
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
	    //Auth::loginUsingId(47,true);
	    //dc($guard);
		//dc(Auth::user());

        if (Auth::guard($guard)->guest()) {
            if ($request->ajax() || $request->wantsJson()) {
                return response('Unauthorized.', 401);
            } else {
                //dd('Authenticate, redirect guest login');
            	//return "view";
	            return redirect()->guest('login');
            }
        }
        //
        elseif ($request->is('backStage/*')) {
        	if (Auth::user()->isFrontEndUser()){
		        $test = 'Authenticate MIDDLEWARE: unauthorized action: '.$request->getRequestUri().', '.$request->user()->name.' must be \'back-end user\'';
		        return response()->view("errors.401", compact('test'), 401);
	        }
	        //dc('backStage/*');
	        //dc($request->user()->isBackEndUser());
	        //dc(Auth::user()->isBackEndUser());
        }

	    //dc('asdf');

	    //if (Auth::check())
//dc(Auth::check());
//	    dc($guard);
//dc(Auth::user());
//dd((Auth::guard($guard)->guest()));
//	    if (Auth::user()->hasRole('mijnZD-user')){
//		    return redirect('/dashboard');
		    //return redirect()->route('sitemap.indexDashboard');
//	    }


	    //dd($request);


        return $next($request);
    }
}
