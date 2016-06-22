<?php namespace App\Providers\Html;

class HtmlBuilder extends \Collective\Html\HtmlBuilder {

    // Your functions here

    /*DataTables*/

    public function getEditButton($model){
        return "<a class=\"btn btn-success btn-labeled-x\" href=\"".route('admin::media.edit',['id'=>$model->id])."\" >
                    <i class=\"fa fa-pencil fa-1x\"></i> edit</a> ";
    }





/*
$r = "<div class=\"extraData\" style='display:none;'>";
    //$r .= "<span class='pulxl-right'>".$test->urlPath."</span><br>";

$r .= "<a class=\"btn btn-success btn-labeled-x\" href=\"".route('admin::media.type.edit',['media_type'=>$media->media_type,'id'=>$media->id])."\" >
                    <i class=\"fa fa-pencil fa-1x\"></i> edit ".Html::getButton()."</a> ";

$r .= "<a class=\"btn btn-primary btn-labeled-x setTable\" onclick=\"wiLoad(".$media->id.")\">
                    <i class=\"fa fa-level-down fa-1x\"></i>  sub pagins's</a> ";

$r .= "<a class=\"btn btn-warning btn-labeled-x setTable\" onclick=\"wiDuplicate(".$media->id.")\">
                    <i class=\"fa fa-copy fa-1x\"></i> copy</a> ";

$r .= "<a class=\"btn btn-danger btn-labeled-x setTable\" onclick=\"wiDelete(".$media->id.")\">
                    <i class=\"fa fa-trash fa-1x\"></i> delete</a> ";

$r .= "<a class=\"btn btn-default btn-md btn-labeled-x\" href=\"".$media->path."\" target=\"_blank\">
                    <i class=\"fa fa-search fa-1x\"></i> preview</a> ";

$r .= "</div>";

*/


}