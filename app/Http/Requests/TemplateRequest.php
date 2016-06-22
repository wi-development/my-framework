<?php

namespace App\Http\Requests;

#use App\Http\Requests\Request;

class TemplateRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'order_by_number' => 'required',
            'parent_id' => 'required',
            'component_list' => 'required'
        ];
    }
}
