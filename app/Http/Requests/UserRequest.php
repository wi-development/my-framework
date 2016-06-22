<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class UserRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
		return true;//middleware handles authentication

	    //$postId = $this->route('post');
		//return Gate::allows('update', Post::findOrFail($postId));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {


        //debugbar()->addMessage('Another message', 'mylabel');
        if (($this->has('password')) || Request::isMethod('post')) {
            //debugbar()->info('- has password: ' . $this->password . '');
            $password_rules = 'required|confirmed|min:6';
            $this->request->set('password', bcrypt($this->password));
            $this->request->set('password_confirmation', bcrypt($this->password));
        }
        else{
            //debugbar()->error('- no password: '.$this->password.'');
            $password_rules = 'confirmed';
            $this->request->remove('password');//second submit
            $this->request->remove('password_confirmation');
            $this->except('password');
            $this->except('password_confirmation');
        }

        return [
            'name' => 'required|max:255|unique:users,name,'.$this->userid.'',
            'email' => 'required|email|max:255|unique:users,email,'.$this->userid.'',//userid set in route.php
			'username' => 'required|max:255|unique:users,username,'.$this->userid.'',//userid set in route.php
            'password' => ''.$password_rules.''//see UserCOntroller::updatePassword
        ];
        
    }
}
