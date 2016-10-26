<?php

namespace App\Providers;

use Illuminate\Contracts\Auth\Access\Gate as GateContract;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use WI\User\Permission;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any application authentication / authorization services.
     *
     * @param  \Illuminate\Contracts\Auth\Access\Gate  $gate
     * @return void
     */
    public function boot(GateContract $gate)
    {
        $this->registerPolicies($gate);

        // Dynamically register permissions with Laravel's Gate.
	    foreach ($this->getPermissions() as $permission) {
	    	//dc('REGISTER: '.$permission->name);
		    $gate->define($permission->name, function ($user) use ($permission) {
		    	//dc($permission);
			    return $user->hasPermission($permission);
		    });
	    }

    }

	/**
	 * Fetch the collection of site permissions.
	 *
	 * @return \Illuminate\Database\Eloquent\Collection
	 */
	public function getPermissions()
	{
		$test = Permission::with('roles')->get();
		//dc($test);
		//dc(Permission::with('roles')->get());
		return $test;
		return Permission::with('roles')->get();
	}

}
