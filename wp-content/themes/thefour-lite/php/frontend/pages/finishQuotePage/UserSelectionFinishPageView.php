<?php

class UserSelectionFinishPageView extends SelectedCompanyDataView
{
    private $startDate;
    private $finishDate;
    private $arrivalDate;
    private $period;

    protected function getData(){
        parent::getData();
        
        $savedFormData = Cookie::getUserInputFormData();
        $formData = null;

        $savedFormData = StringUtil::unquote($savedFormData);
        $formData = json_decode($savedFormData);
        $formData = json_decode(json_encode($formData), true);

        $startDate = $formData['startDate']["date"];
        $finishDate = $formData['finishDate']["date"];

        $this->startDate = explode(" ", $startDate)[0];
        $this->finishDate = explode(" ", $finishDate)[0];

        $this->period = Cookie::getPeriod();
        $this->arrivalDate = Cookie::getArrivalDate();
    }

    protected function createContent(){
        parent::createContent();
        echo '<div class="col-sm-3 centered">Start date<p><b id="startDateContainer">'.$this->startDate.'</b></p></div>';
        echo '<div class="col-sm-3 centered">Finish date<p><b id="finishDateContainer">'.$this->finishDate.'</b></p></div>';
        echo '<div class="col-sm-3 centered">Arrival date<p><b id="arrivalDateContainer">'.$this->arrivalDate.'</b></p></div>';
        echo '<div class="col-sm-3 centered">Period<p><b id="periodContainer">'.$this->period.'</b></p></div>';
    }
}