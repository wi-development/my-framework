<?php namespace App\Providers\Html;

use Carbon\Carbon;
use Illuminate\Support\Facades\Request;


class FormBuilder extends \Collective\Html\FormBuilder {



    private function getFeedBackSelector($errors,$id){
        $feedBackSelector  = $errors->has(''.$id.'') ? ' has-error has-feedback' : '';
        return $feedBackSelector;
    }

    private function getFeedBackHtml($errors,$id){
        $feedBackHtml = "<span class=\"fa fa-times fa-lg form-control-feedback\"></span>
                        <span class=\"help-block\"><em>".$errors->first(''.$id.'')."</em></span>";
        $feedBackHtml = $errors->has(''.$id.'') ? $feedBackHtml : '';

        return $feedBackHtml;
    }

    /**
     * Create a submit button with default classes
     *
     * @param null $value
     * @param array $options
     * @return string
     */

    public function getFormGroupText($label,$id,$value,$errors){
        $feedBackSelector = $this->getFeedBackSelector($errors,$id);
        $feedBackHtml = $this->getFeedBackHtml($errors,$id);

        $retval = "<div class=\"form-group  ".$feedBackSelector."\">
                ".parent::label(''.$id.'', ''.$label.':',['class' => 'control-label'])."
                ".parent::text(''.$id.'', $value, ['class' => 'form-control'])."
                ".$feedBackHtml."
            </div>";
        return $retval;
    }
	//($name, $value = 1, $checked = null, $options = [])
	public function getFormGroupCheckbox($label,$id,$value,$checked,$errors){
		$feedBackSelector = $this->getFeedBackSelector($errors,$id);
		$feedBackHtml = $this->getFeedBackHtml($errors,$id);
///".parent::label(''.$id.'', ''.$label.':',['class' => 'control-label'])."
		//active
		$activeClass="";
		if ($checked) $activeClass=" active";
		$retval = "<div class=\"checkbox  ".$feedBackSelector."\">
                <label class=\"form-checkbox form-normal form-primary form-text".$activeClass."\">
                ".$this->checkbox($id, $value, $checked, ['claxxss' => 'formxx-control'])."
                ".$label."
                </label>".$feedBackHtml."
            </div>";
		return $retval;
	}

    public function getFormGroupPassword($label,$id,$value,$errors){
        $feedBackSelector = $this->getFeedBackSelector($errors,$id);
        $feedBackHtml = $this->getFeedBackHtml($errors,$id);

        $retval = "<div class=\"form-group  ".$feedBackSelector."\">
                ".parent::label(''.$id.'', ''.$label.':',['class' => 'control-label'])."
                ".parent::password(''.$id.'', ['class' => 'form-control'])."
                ".$feedBackHtml."
            </div>";
        return $retval;
    }



    public function submit($value = null, $options = [])
    {
        $options['class'] = 'btn btn-cons btn-awesome' . (isset($options['class']) ? ' ' . $options['class'] : '');
        return parent::submit($value, $options);
    }

    public function submitButtonIcon($value = null, $options = [])
    {
        $options['class'] = '' . (isset($options['class']) ? ' ' . $options['class'] : '');
        return parent::button($value, $options);
    }



    public function checkBoxTonny($name, $list = [], $selected = null, $options = []){

        return true;
        $orderList = $list;
        $array = [];
        foreach ($orderList as $key => $item){
            $checked = $this->getCheckboxCheckedState($name, $key, $selected);
            $array[$key] = array_add(['id' => $key,'name' => $item], 'selected', $checked);
        }

        $array1 = array_reverse(array_sort($array, function ($value) {
            return $value['selected'];
        }));


        $checkBoxGroup = '<ul id="sortable">';
        $checkBoxId = $options['id'];
        //$checkBoxGroup = '';
        foreach ($array1 as $key => $item){
           // dc($item);
            array_set($options, 'id', $checkBoxId.'['.$key.']');
            $checkBoxGroup .= '<li class="ui-state-default">';
            $checkBoxGroup .= '<div class="checkbox"><label>';
            $checkBoxGroup .= $this->checkbox($name, $item['id'], $item['selected'], $options);
            $checkBoxGroup .= ''.$item['id'].'. '.$item['name'].'';
            $checkBoxGroup .= '</label>';
            $checkBoxGroup .= '</div>';
            $checkBoxGroup .= '</li>';
        }
        $checkBoxGroup .= '</ul>';
        $checkBoxGroup .= '';
        return $checkBoxGroup;


        dc('START');
        dc($name);
        dc($list);
        dc($selected);
        dc($options);
        dc('STOP');
        return "Tonny test";
    }

    public function checkbox($name, $value = 1, $checked = null, $options = [])
    {
        if($checked) $options['checked'] = 'checked';
        $type = 'checkbox';
        return $this->input($type, $name, $value, $options);
    }

    public function checkBoxRelatedUnrelated($name, $related_list = [], $unrelated_list = [], $options = []){


        $checkBoxGroup = '<ul class="sortable">';
        $checkBoxId = $options['id'];
        //$checkBoxGroup = '';

        foreach ($related_list as $key => $item){
            //dc($item->pivot->order_by_number);
            $checkBoxGroup .= '<li class="ui-state-default">';
            $checkBoxGroup .= '<div class="checkbox"><label>';
            $checked = true;
            $checkBoxGroup .= $this->checkbox($name, $item['id'], $checked, $options);
            $checkBoxGroup .= '#'.$item->pivot->order_by_number.' '.$item->id.'  '.$item->name.'';
            $checkBoxGroup .= '</label>';
            $checkBoxGroup .= '</div>';
            $checkBoxGroup .= '</li>';
        }
        foreach ($unrelated_list as $key => $item){
            // dc($item);
            $checkBoxGroup .= '<li class="ui-state-default">';
            $checkBoxGroup .= '<div class="checkbox"><label>';
            $checked = false;
            $checkBoxGroup .= $this->checkbox($name, $item['id'], $checked, $options);
            $checkBoxGroup .= '#0 '.$item['id'].'. '.$item['name'].'';
            $checkBoxGroup .= '</label>';
            $checkBoxGroup .= '</div>';
            $checkBoxGroup .= '</li>';
        }


        $checkBoxGroup .= '</ul>';
        $checkBoxGroup .= '';
        return $checkBoxGroup;


        dc('START');
        dc($name);
        dc($list);
        dc($selected);
        dc($options);
        dc('STOP');
        return "Tonny test";
    }

    /**
     * Create a select box field.
     *
     * @param  string $name
     * @param  array  $list
     * @param  string $selected
     * @param  array  $options
     *
     * @return \Illuminate\Support\HtmlString
     */
    public function checkBoxList($name, $list = [], $selected = null, $options = [],$pType='checkbox',$sitemap_category_key)
    {



        $test = $this->model;


        //goed
        //dc($test->getCategoryListAttribute()->where('category','locatieUIT')->get());

        $selected = [];
        if (! is_null($test)) {
            $selected = $test->getCategoryListAttribute1($sitemap_category_key);
        }

        //$selected = [];
        //dc($selected);
        //$test = $test['category_list'];



        // When building a select box the "value" attribute is really the selected one
        // so we will use that when checking the model or session for a value which
        // should provide a convenient method of re-populating the forms on post.
        //$selected = $this->getValueAttribute($name, $selected);
        //dc($selected);

        //$selected = $test->getCategoryListAttribute1('locatie');
        //dc($selected);
        //$selected = $selected->all();
        //return  "asdf";
        //dc($test);
        $options['id'] = $this->getIdAttribute($name, $options);

        if (! isset($options['name'])) {
            $options['name'] = $name;
        }

        // We will simply loop through the options and build an HTML value for each of
        // them until we have an array of HTML declarations. Then we will join them
        // all together into one single HTML element that can be put on the form.
        $html = [];

        if (isset($options['placeholder'])) {
            $html[] = $this->placeholderOption($options['placeholder'], $selected);
            unset($options['placeholder']);
        }
        $test = [];
        foreach ($list as $value => $display) {
            $html[] = $this->getSelectOption($display, $value, $selected);

            $type = $pType;
            $checked = (in_array($value, $selected));

            //get old value when verplicht failed
            //dc($this->old('sitemapCategory')['locatie']);
            if (! is_null($this->old('sitemapCategory')['locatie'])) {
                $old = $this->old('sitemapCategory')['locatie'];
                $checked = (in_array($value, $old));
            }
            //dc($name);
            $posted1 = $this->missingOldAndModel($name);
            //dc($old);
            //$checked = $this->getCheckboxCheckedState($name, $value, $checked);//does sql

            //dc($checked);

            $tmpClass = '';
            if ($checked) {
                $options['checked'] = 'checked';
                $tmpClass = ' active';
            }

            //$test[] = "<label>".$this->input($type, $name, $value, $options)." ".$display."</label>";

            $test[] = "<label class=\"form-".$pType." form-normal form-primary".$tmpClass." form-text\">".$this->input($type, $name, $value, $options)." ".$display."</label>\n";
            unset($options['checked']);

            //$test[] =  "name".$display."".$this->input($type, $name, $value, $options);
        }

        // Once we have all of this HTML, we can join this into a single element after
        // formatting the attributes into an HTML "attributes" string, then we will
        // build out a final select statement, which will contain all the values.
        $options = $this->html->attributes($options);

        $list = implode('', $html);
        $test = implode('', $test);
        return $this->toHtmlString("{$test}");
        dc($list);
        //return $this->toHtmlString($test);
        //dc($this->toHtmlString("<select{$options}>{$list}</select>"));

        return $this->toHtmlString("<select{$options}>{$list}</select>");
    }

    public function checkBoxListORG($name, $list = [], $selected = null, $options = [])
    {



        // When building a select box the "value" attribute is really the selected one
        // so we will use that when checking the model or session for a value which
        // should provide a convenient method of re-populating the forms on post.
        $selected = $this->getValueAttribute($name, $selected);

        $options['id'] = $this->getIdAttribute($name, $options);

        if (! isset($options['name'])) {
            $options['name'] = $name;
        }

        // We will simply loop through the options and build an HTML value for each of
        // them until we have an array of HTML declarations. Then we will join them
        // all together into one single HTML element that can be put on the form.
        $html = [];

        if (isset($options['placeholder'])) {
            $html[] = $this->placeholderOption($options['placeholder'], $selected);
            unset($options['placeholder']);
        }
        $test = [];
        foreach ($list as $value => $display) {
            $html[] = $this->getSelectOption($display, $value, $selected);

            $type = 'checkbox';
            $selected = $this->getSelectedValue($value, $selected);
            $checked = $selected;

            $checked = $this->getCheckedState($type, $name, $value, $checked);
            $tmpClass = '';
            if ($checked) {
                $options['checked'] = 'checked';
                $tmpClass = ' active';
            }

            //$test[] = "<label>".$this->input($type, $name, $value, $options)." ".$display."</label>";

            $test[] = "<label class=\"form-checkbox form-normal form-primary".$tmpClass." form-text\">".$this->input($type, $name, $value, $options)." ".$display."</label>\n";
            unset($options['checked']);

            //$test[] =  "name".$display."".$this->input($type, $name, $value, $options);
        }

        // Once we have all of this HTML, we can join this into a single element after
        // formatting the attributes into an HTML "attributes" string, then we will
        // build out a final select statement, which will contain all the values.
        $options = $this->html->attributes($options);

        $list = implode('', $html);
        $test = implode('', $test);
        return $this->toHtmlString("{$test}");
        dc($list);
        //return $this->toHtmlString($test);
        //dc($this->toHtmlString("<select{$options}>{$list}</select>"));

        return $this->toHtmlString("<select{$options}>{$list}</select>");
    }






}