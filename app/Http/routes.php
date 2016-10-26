<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/




/*

Route::get('/UIT', function () {

//dd('test');

    if (Auth::check()) {
        dc(settings()->all());
        //dc('Dag '.Auth::user()->name.', je bent ingelogd.');
    }
    //dd('home');

	//return "view";
    return view('index');


	dc(settings());
    dc(settings());
    dc(settings());
    return "view";


dc(session());
    dc(session());
    dc(session());
    //dc(settings()->hasValue('asdf'));
    dc(settings()->all());

    dc(settings('foo'));

    //dc(settings()->foo());
    dd(settings()->hasValue('foo','set-by-wi-form.js'));
    /*
    //dc(settings());
    dc(settings()->foo);
    dc(settings()->get('foo'));
    dc(settings('foo'));
    settings()->set('opt_in',false);
    settings()->set('opt_out',true);


    settings()->merge(['fooxx'=>'fooValue']);

    dd(settings()->all());
    //goed
    settings('foo');
    $user =  \WI\User\User::first();
    dc($user->settings->foo);
    return view('welcome');
    */
//});


Route::get('/settings', function () {
    $test = settings()->merge(Request::all());
    return response()->json($test);
    dc($test);
    //$test->get('foo');
    //dc(settings()->get('foo'));
    //return "view";
    //response()->json($test);
    //dc($test);
    //\WI\User\User::first()->settings()->merge(Request::all());
    //return redirect('/');
});

#Route::auth();


//Login/logout Routes...
$this->get('login',                     ['as' => 'login',               'uses' => 'Auth\AuthController@showLoginForm']);
$this->post('login',                    ['as' => '',                    'uses' => 'Auth\AuthController@login']);
$this->get('logout',                    ['as' => 'logout',              'uses' => 'Auth\AuthController@logout']);

// Password Reset Routes...
$this->post('password/email',           ['as' => '',                    'uses' => 'Auth\PasswordController@sendResetLinkEmail']);
$this->post('password/reset',           ['as' => '',                    'uses' => 'Auth\PasswordController@reset']);
$this->get('password/reset/{token?}',   ['as' => 'reset',               'uses' => 'Auth\PasswordController@showResetForm']);

// Registration Routes...
$this->get('register',                  ['as' => 'register',            'uses' => 'Auth\AuthController@showRegistrationForm']);
$this->post('register',                 ['as' => '',                    'uses' => 'Auth\AuthController@register']);
