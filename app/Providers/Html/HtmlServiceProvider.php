<?php

namespace App\Providers\Html;

#use Illuminate\Support\ServiceProvider;


class HtmlServiceProvider extends \Collective\Html\HtmlServiceProvider
{


//https://laracasts.com/discuss/channels/general-discussion/best-way-to-overwrite-option-method-from-laravel-5-formbuilder-class
/*
 * https://laracasts.com/discuss
 * /channels/general-discussion
 * /best-way-to-overwrite-option-method-from-laravel-5-formbuilder-class
 *
 * OR MACRO'S
 *
 * https://laracasts.com/discuss/channels/tips/50-loading-form-macros
*/

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    //public function boot()
    //{
    //    //
    //}

    /**
     * Register the application services.
     *
     * @return void
     */
//    public function register()
//    {
        //
//    }

    /**
     * Register the form builder instance.
     */
    protected function registerFormBuilder()
    {
        //bindShared
		$this->app->singleton('form', function($app)
        {
            $form = new FormBuilder($app['html'], $app['url'], $app['view'] ,$app['session.store']->getToken());

            return $form->setSessionStore($app['session.store']);
        });
    }

    /**
     * Register the html builder instance.
     */
    protected function registerHtmlBuilder()
    {
        $this->app->singleton('html', function($app)
        {
            return new HtmlBuilder($app['url'],$app['view']);
        });
    }
}
