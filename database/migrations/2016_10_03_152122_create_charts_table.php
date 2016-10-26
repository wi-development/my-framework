<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

	    Schema::create('charts', function (Blueprint $table) {
		    $table->increments('id');
		    $table->integer('company_id')->unsigned();
		    $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
		    $table->string('name');
		    $table->string('label')->nullable();
		    $table->text('description')->nullable();
		    $table->nullableTimestamps();
	    });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
	    DB::statement('SET FOREIGN_KEY_CHECKS = 0');
	    Schema::drop('charts');
	    DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
