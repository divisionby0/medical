<?php

class ApplicationStateDropDown
{
    public function __construct($currentValue)
    {
        echo '<div style="display: block;">State:'.$currentValue."   ";
        echo '<select id="stateDropDown">';
        if($currentValue == 0){
            echo '<option value="0" selected>In process</option>';
            echo '<option value="1">Complete</option>';
            echo '<option value="2">Payed</option>';
            echo '<option value="3">Appruved</option>';
            echo '<option value="4">Police issued</option>';
            echo '<option value="5">Canceled</option>';
        }
        else if($currentValue == 1){
            echo '<option value="0">In process</option>';
            echo '<option value="1" selected>Complete</option>';
            echo '<option value="2">Payed</option>';
            echo '<option value="3">Appruved</option>';
            echo '<option value="4">Police issued</option>';
            echo '<option value="5">Canceled</option>';
        }
        else if($currentValue == 2){
            echo '<option value="0">In process</option>';
            echo '<option value="1">Complete</option>';
            echo '<option value="2" selected>Payed</option>';
            echo '<option value="3">Appruved</option>';
            echo '<option value="4">Police issued</option>';
            echo '<option value="5">Canceled</option>';
        }
        elseif($currentValue == 3){
            echo '<option value="0">In process</option>';
            echo '<option value="1">Complete</option>';
            echo '<option value="2">Payed</option>';
            echo '<option value="3" selected>Appruved</option>';
            echo '<option value="4">Police issued</option>';
            echo '<option value="5">Canceled</option>';
        }
        elseif($currentValue == 4){
            echo '<option value="0">In process</option>';
            echo '<option value="1">Complete</option>';
            echo '<option value="2">Payed</option>';
            echo '<option value="3">Appruved</option>';
            echo '<option value="4" selected>Police issued</option>';
            echo '<option value="5">Canceled</option>';
        }
        elseif($currentValue == 5){
            echo '<option value="0">In process</option>';
            echo '<option value="1">Complete</option>';
            echo '<option value="2">Payed</option>';
            echo '<option value="3">Appruved</option>';
            echo '<option value="4">Police issued</option>';
            echo '<option value="5" selected>Canceled</option>';
        }
        echo '</select>';
        echo '<input type="text" id="applicationStateEditor" name="applicationStateEditor" value="'.$currentValue.'" style="display:block;">';
        echo '</div>';
    }
}