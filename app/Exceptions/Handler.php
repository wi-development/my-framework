<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $e
     * @return void
     */
    public function report(Exception $e)
    {
        parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        if ($this->isHttpException($e))
        {
        //dc($e);
            // Grab the HTTP status code from the Exception
            $status = $e->getStatusCode();
            //dc($request);
            if ($status == 404){
                return response()->view('errors.404', compact('e','request'), 404);
            }
            //
            //dc($status);
        }
        //dc(($e));
        //dc(($e instanceof NotFoundHttpException));
        //dd('asdf');
        //if($e instanceof NotFoundHttpException)
        //{
        //    dd('asdf');
        //    return response()->view('404', ['test'=>'asdfasdfasd'], 404);
        //}

        return parent::render($request, $e);
    }
}
