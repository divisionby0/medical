<?php

class CompanyCostsView
{
    private $costs;
    
    public function __construct($companyName, Map $costs)
    {
        $this->costs = $costs;

        echo '<h2 class="centered">Selected company <font color="#449d44">'.$companyName.'</font></h2>';
        echo '<h3 class="centered benefitsSelectionPageFormHeader" style="width: 50%;">Please select deductible</h3>';
        echo '<div class="benefitsSelectionPageContentContainer">';
        //echo '<h3 class="centered">Please select deductible</h3>';
        echo '<div id="companyPlan"></div>';
        $this->createCostsTable();
        echo '</div>';
    }
    
    private function createCostsTable(){
        echo '<form action="" method="post" id="planSelectionForm">';
        echo '<table id="planSelectionTable">';
        echo '<tr><td class="fullwidth centered bold">Select deductible</td><td class="fullwidth centered bold">Total premium</td></tr>';

        $keys = $this->costs->getKeys();
        foreach($keys as $key){
            if(!is_string($key)){
                $cost = $this->costs->get($key);

                //$benefit = number_format($key, 0, ',', ' ');
                //$cost = number_format($cost, 2, '.', ' ');

                $benefit = StringUtil::formatMoneyInt($key);
                $cost = StringUtil::formatMoneyDivisional($cost);

                echo '<tr id="'.$key.'" data-cost="'.$cost.'"><td class="fullwidth centered">'.$benefit.'</td><td class="fullwidth centered">'.$cost.'</td></tr>';
            }
        }
        echo '</table>';
        echo '<input id="selectedPlanInput" name="selectedPlanInput" type="hidden">';
        echo '</form>';
    }
}