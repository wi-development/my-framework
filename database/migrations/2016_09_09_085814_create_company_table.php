<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompanyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
	    Schema::create('companies', function (Blueprint $table) {
		    $table->increments('id');

		    $table->string('name');
		    $table->string('person');
		    $table->string('contact');
		    $table->string('address');
		    $table->string('zipcode');
		    $table->string('city');

		    $table->string('email');
		    $table->string('phone');
		    $table->string('mobile');
		    $table->string('fax');

		    $table->string('formname');
		    $table->string('formemail');

		    $table->string('kvk');

		    $table->string('facebook');
		    $table->string('twitter');
		    $table->string('linkedin');


		    $table->string('terms_and_conditions');
		    $table->timestamps();
	    });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
	    Schema::drop('companies');
    }
}
