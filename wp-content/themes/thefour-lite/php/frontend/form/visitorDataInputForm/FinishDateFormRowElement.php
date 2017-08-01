<?php


class FinishDateFormRowElement extends FormRowElement{

    protected function createContent(){
        
        $this->content .= '<input id="finishDateCalendarContainer" class="dateInput">';
        
        $this->content .= '<input id="finishDateYear" name="finishDateYear" type="hidden">';
        $this->content .= '<input id="finishDateMonth" name="finishDateMonth" type="hidden">';
        $this->content .= '<input id="finishDateDay" name="finishDateDay" type="hidden">';
    }
} 