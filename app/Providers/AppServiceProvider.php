<?php

namespace App\Providers;

use Carbon\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{

	//So the register one is just for binding. The boot one is to actually trigger something to happen.

	/**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
	    Carbon::setLocale(config('app.locale'));
	    setlocale(LC_TIME, ''.App::getLocale().'_'.strtoupper(App::getLocale()).'');

    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
	    //Carbon::setLocale(config('app.locale'));
	    //setlocale(LC_TIME, ''.App::getLocale().'_'.strtoupper(App::getLocale()).'');
    }
}
