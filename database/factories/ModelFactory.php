<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/



#use WI\User;
/*
 * composer dump-autoload ??
 *
 * tinker: namespace WI\User;
 * factory(User::class)->make();
 *
 * */


$factory->define(WI\User\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->safeEmail,
	    'locale_id' => 1,
        'password' => bcrypt(str_random(10)),
        'remember_token' => str_random(10),
    ];
});
