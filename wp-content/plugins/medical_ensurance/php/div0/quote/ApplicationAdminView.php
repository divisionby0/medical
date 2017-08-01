<?php


class ApplicationAdminView
{
    public function __construct()
    {
        echo '<div id="container">';

        echo '<h2 class="centered bg-info" style="color: gray;"><span class="glyphicon glyphicon-usd" aria-hidden="true">  <b>Quote</b> </span></h2>';

        echo '<div class="row" style="line-height:1.6em !important;">';

        echo '<div class="col-sm-3">benefit:</div>';
        echo '<div class="col-sm-3 text-info" id="benefitContainer">benefit</div>';

        echo '<div class="col-sm-3">deductible:</div>';
        echo '<div class="col-sm-3 text-info" id="deductibleContainer">deductible</div>';

        echo '<div class="col-sm-3">cost:</div>';
        echo '<div class="col-sm-3 text-info" id="costContainer">cost</div>';

        echo '<div class="col-sm-3">period:</div>';
        echo '<div class="col-sm-3 text-info" id="periodContainer">period</div>';

        echo '<div class="col-sm-3">start date:</div>';
        echo '<div class="col-sm-3 text-info" id="startDateContainer">startDate</div>';

        echo '<div class="col-sm-3">finish date:</div>';
        echo '<div class="col-sm-3 text-info" id="finishDateContainer">finishDate</div>';

        echo '</h2>';
        
        // person data
        echo '</div></div><div id="personsContainer">';
    }
}