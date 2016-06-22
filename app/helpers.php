<?php
use Illuminate\Support\Debug\Dumper;

if (! function_exists('dc')) {
    /**
     * Dump the passed variables and continue the script.
     *
     * @param  mixed
     * @return void
     */
    function dc()
    {
        array_map(function ($x) {
            (new Dumper)->dump($x);
        }, func_get_args());

        //die(1);
    }
}

if (! function_exists('getViewConfig')) {
    /**
     * Dump the passed variables and continue the script.
     *
     * @param  mixed
     * @return void
     */
    function getViewConfig($key)
    {
        return \App\Sitemap::getViewConfigValue($key);
    }
}


if (! function_exists('isSetViewConfigReturnValue')) {
    /**
     * Dump the passed variables and continue the script.
     *
     * @param  mixed
     * @return void
     */
    function isSetViewConfigReturnValue($key,$value,$pRetval)
    {
        //request()->session()->forget($key);
        //geen sessie set default
        if (request()->session()->has($key)){
            $retval =  ($value ==  \App\Sitemap::getViewConfigValue($key));
            return ($retval) ? $pRetval[0] : $pRetval[1];
        }
        elseif (isset($pRetval[2]) && ($pRetval[2] == 'default')){
            return $pRetval[0];
        }
    }
}


if (! function_exists('print_r_pre')) {
    /**
     * Dump the passed variables and continue the script.
     *
     * @param  mixed
     * @return void
     */
    function print_r_pre($array,$echo=true)
    {
        if ($echo){
            echo "<pre><code>".print_r($array,true)."</code></pre>";
        }
        return "<pre><code>".print_r($array,true)."</code></pre>";


        //die(1);
    }
}


if (! function_exists('sfr')) {
    /**
     * Get an instance of the current request or an input item from the request.
     *
     * @param  string  $key
     * @param  mixed   $default
     * @return \Illuminate\Http\Request|string|array
     */
    function sfr($message,$key = 'feedback', $default = null)
    {
        if (!(isset(request()->feedback))){
            request()[$key] = collect(['Start']);
        }
        request()[$key] = request()[$key]->merge($message);
        /*

        if (is_null($key)) {
            return app('request');
        }

        return app('request')->input($key, $default);
        */
    }
}

function settings($key = null){
    //work with same instance //IoC
    $settings = app('WI\User\Settings');

    //get (settings->key or settings object)
    return $key ? $settings->get($key) : $settings;

    //set

    //apply (merge)
}



