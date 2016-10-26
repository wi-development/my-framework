<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class Role
{
	/**
	 * Run the request filter.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @param  string  $role
	 * @return mixed
	 */
	public function handle($request, Closure $next, $role)
	{
		//dd($role);
		if ($request->user()->hasRole('developer')) return $next($request);
		//dc('ROLE MID: '.$role.'');
		//dc('Naam: '.Auth::user()->name);
		//dc(Auth::user()->isFrontEndUser());
		///dd($request->user());
		//if ( ! $this->auth->user()->isAdmin())
		//{
		//	return new RedirectResponse(url('/home'));
		//}

		//return $next($request);








		if (! $request->user()->hasRole($role)) {
			// Redirect...
			//dc('sdaf');

			//$sitemaps->pluck('testname')->all()
			//dc($request->user()->roles()->pluck('name')->all());

			$tRoles = $request->user()->roles()->pluck('name')->all();
			$tRoles = implode( ", ", $tRoles);
			//  dc('ROLE MIDDLEWARE');
			//return redirect()->guest('login');
			//echo $tRoles;

			$test = 'ROLE MIDDLEWARE: unauthorized action: '.$request->getRequestUri().', '.$request->user()->name.' with role \''.$tRoles.'\' needs role \''.$role.'\' ';
			return response()->view("errors.401", compact('test'), 401);
			//abort(401, 'TONNUnauthorized action.'.$role.' - '.$request->user()->name.'');
			//dd('tonn');
			//abort('401include', 'Unauthorized action.'.$role.' - '.$request->user()->name.'');
			//abort('401include','Unauthorized to access');
			//abort(401, 'Unauthorized action.');
		}

		return $next($request);
	}

}