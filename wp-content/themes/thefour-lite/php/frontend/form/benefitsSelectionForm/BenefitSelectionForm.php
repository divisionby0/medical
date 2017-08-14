<?php

class BenefitSelectionForm
{
    public function __construct(Map $data)
    {
        $submitUrl = site_url()."/companies-by-user-data";
        echo '<form action="'.$submitUrl.'" method="post" id="benefitSelectionForm">';
        echo '<table id="benefitsSelectionTable" style="width: 100%;">';
        echo '<tr><td class="centered bold">Select benefit</td><td class="centered bold">Total premium</td></tr>';

        $keys = $data->getKeys();
        foreach($keys as $key){
            if($key!='Map'){
                $cost = $data->get($key);
                
                $benefit = StringUtil::formatMoneyInt($key);
                $cost = StringUtil::formatMoneyDivisional($cost);

                echo '<tr id="'.$key.'" data-cost="'.$cost.'"><td class="fullwidth centered">'.$benefit.' (per person)</td><td class="fullwidth centered">'.$cost.'</td></tr>';
            }
        }

        echo '</table>';

        echo '<input id="selectedBenefitInput" name="selectedBenefit" type="hidden">';
        
        echo '</form>';
    }
}