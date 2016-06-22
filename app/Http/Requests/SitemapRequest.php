<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use WI\Locale\Locale;
use Flash;
use Illuminate\Http\JsonResponse;

class SitemapRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true; //middleware checks in user logged in
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(Locale $locale)
    {
        //only for next request:: ->flash
        //session()->flash('active_language_tab',$request->get('active_language_tab'));
//        $locales = new Locale();                                                              §

        $locales = $locale->getEnabled();

        $sitemapRules = [
            //'system_name' => 'required',
            'parent_id' => 'required',
            //'depth' => 'required',
            'online' => 'required',
            'template_id' => 'required'
        ];

        $translationRules = array();
        foreach ($locales as $key => $locale){
            $translationRules['translations.'.$locale->languageCode.'.name'] = 'required';
            //homepage geen slug , patch is update
            if ((request()->get('parent_id') != 0) && (request()->get('_method') == 'PATCH')){
                $translationRules['translations.'.$locale->languageCode.'.slug'] = 'required';
                //dc('wel verplicht');
            }
            else{
                //dc('niet verplicht');
            }
            switch ($this->input('post_type')) {
                case 'homepage':
                    //$translationRules['translations.'.$locale->identifier.'.news.author'] = 'required|integer';
                    //uit
                    //$translationRules['translations.'.$locale->languageCode.'.homepage.content'] = 'required';
                    break;
                case 'defaultpage-uit':
                    $translationRules['translations.'.$locale->languageCode.'.defaultpage.content'] = 'required';
                    break;
                default:
            }
        }
        return array_merge($sitemapRules,$translationRules);
    }

    public function attributes()
    {
        // the attributes method replaces the :attribute placeholder on the validation messages
        // with given attribute names

        // You can use the trans(...) helper function here to get your 'localized' from
        // resources/lang/{language}/{file}

        // set your default and fallback locale in the config/app.php file
        // I will assume you are using English ('en')


        // the next one will look in resources/lang/en/attributes.php
        // for a other_field key


        $keynl = 'nl';
        $keyen = 'en';
        // $sitemap_translation_validation = array();

        $sitemap_translation_validation = [
            'name.'.$keynl.'' => trans('validation.attributes.sitemap_name_nl'),
            'slug.'.$keynl.'' => trans('validation.attributes.sitemap_slug_nl'),
            'name.'.$keyen.'' => trans('validation.attributes.sitemap_name_en'),
            'slug.'.$keyen.'' => trans('validation.attributes.sitemap_slug_en')
        ];

        //$sitemap_translation_validation = $sitemap_translation_validation[0];
        //
        $test = [
            'system_name' => 'SYSTEM NAME fancy field name'
        ];
        $test = array_merge($test,
            $sitemap_translation_validation);
        return $test;

        //dc($test);
        //dc($sitemap_translation_validation);



    }


    private function categorizeErrorResponseByLanguage(array $errors){
        $newArray = array();

        foreach ($errors as $key => $error){
            $language_id = substr($key, 12, 4); // returns ".nl." key = translations.nl.name
            $os = array(".nl.", ".en.", ".de.", ".fr.",".es.");
            if (in_array($language_id, $os)) {
                $newArray[str_replace('.','',$language_id)][$key] = $error;// $newArray['nl']['translations.nl.name'] = $error;
                //dc($newArray);
            }
            else{
                $newArray['sitemap'][$key] = 'ERROR IN TRANSLATION';//org error sitemap
            }
            $newArray['sitemap'] = 'ERROR IN TRANSLATION';//org error sitemap
        }

        return $newArray;
    }


    /**
     * Override from Illuminate\Foundation\Http\FormRequest::response()
     * Get the proper failed validation response for the request.
     *
     * @param  array  $errors
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function response(array $errors)
    {
        if ($this->ajax() || $this->wantsJson()) {
            return new JsonResponse($errors, 422);
        }
        //dc($errors);
        $errors = $this->categorizeErrorResponseByLanguage($errors);
        //flashError('Your NOT Sitemap translation has been updated!');

        return $this->redirector->to($this->getRedirectUrl())
            ->withInput($this->except($this->dontFlash))
            ->withErrors($errors, $this->errorBag);

    }

    /**
     * Determine if the message bag has any messages.
     *
     * @return bool
     */
    public function any()
    {
        return $this->count() > 0;
    }



}
