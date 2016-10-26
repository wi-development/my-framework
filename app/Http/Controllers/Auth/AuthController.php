<?php

namespace App\Http\Controllers\Auth;

#use App\User;
#use WI\User\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use WI\User\User;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */

    //protected $redirectTo = '/backStage';

    #protected $redirectTo = '/admin';

    protected $redirectTo = "";
    protected $redirectAfterLogout = '';

    /*
     * protected $loginPath = '/login';
protected $redirectTo = '/home';
protected $redirectAfterLogout = '/';
     */

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {

        $this->redirectTo = config('wi.dashboard.admin_prefix');
        $this->redirectAfterLogout = config('wi.dashboard.admin_prefix');
        $this->middleware($this->guestMiddleware(), ['except' => 'logout']);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }
    public function test(){
        return '/'.config('wi.dashboard.admin_prefix');
    }



    //Illuminate\Foundation\Auth\AuthenticatesUser
	//method handleUserWasAuthenticated()
	//          if (method_exists($this, 'authenticated')) {
	//			    return $this->authenticated($request, Auth::guard($this->getGuard())->user());
	//          }


protected function authenticated()
	{
		//dc('TEST: '.$this->redirectPath());
		//dc(Auth::user()->roles()->all());

		//dc(Auth::user()->isFrontEndUser());
		//if (Auth::user()->hasRole('mijnZD-user')){
		if (Auth::user()->isFrontEndUser()){
				//dd(Auth::user());
			return redirect('/dashboard');
		}

		return redirect('/backStage');
		//dd($this->redirectPath());
		//dd('asdfXX');
		//return redirect()->intended($this->redirectPath());
		return redirect()->intended($this->redirectPath());
		//dc(Auth::user()->hasRole('developerx'));
		//if(Auth::user()->admin) {
		//	return redirect('admin/dashboard');
		//}

		//return redirect('account/dashboard');
	}


}
