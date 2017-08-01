<?php


class CreateBenefitsHtmlContainer
{
    public function __construct($benefitsJson)
    {
        echo '<div id="allBenefits" class="invisible">'.$benefitsJson.'</div>';
    }
}