<?php


class StartDateFormRowElement extends FormRowElement{

    protected function createContent(){
        $this->content .= '<input id="startDateCalendarContainer" class="dateInput">';
        $this->content .= '<input id="startDateYear" name="startDateYear" type="hidden">';
        $this->content .= '<input id="startDateMonth" name="startDateMonth" type="hidden">';
        $this->content .= '<input id="startDateDay" name="startDateDay" type="hidden">';

    }
} 