<?php


class DeductibleAmountOptions
{
    private $collection;
    private $zeroDeductibleSurchargeOrDiscount;
    private $benefitsAgesCostsByZeroDeductible;
    
    public function __construct(Map $collection)
    {
        $this->collection = $collection;
        $this->benefitsAgesCostsByZeroDeductible = new Map('benefitsAgesByZeroDeductible');
        $this->getZeroDeductibleSurchargeOrDiscount();
    }

    public function parseBenefitsCostsForAges($table, $ages){
        $keys = $table->getKeys();

        foreach($keys as $key){
            if($key!='type'){
                $benefit = $key;
                $benefitAgesCost = $table->get($benefit);

                $costs = $this->sumBenefitAgesCosts($benefitAgesCost, $ages);
                $this->benefitsAgesCostsByZeroDeductible->add($benefit, $costs);
            }
        }
        return $this->benefitsAgesCostsByZeroDeductible;
    }
    
    private function getZeroDeductibleSurchargeOrDiscount(){
        $deductibleAmountOptionsKeys = $this->collection->getKeys();

        foreach($deductibleAmountOptionsKeys as $key){
            if($key!='type'){
                $option = $this->collection->get($key);

                $optionDeductible = $option->get('deductible');
                $optionDeductible = $this->parseInt($optionDeductible);

                if($optionDeductible == 0){
                    $this->zeroDeductibleSurchargeOrDiscount = $this->parseInt($option->get('surchargeOrDiscount'));
                    break;
                }
            }
        }
    }

    private function updateCostByZeroDeductibleWithoutAgeRangeRule($cost){
        $surchOrDiscount = $cost/100*$this->zeroDeductibleSurchargeOrDiscount;
        return $cost+$surchOrDiscount;
    }
    
    private function sumBenefitAgesCosts($benefitAgesCost, $ages){
        $costs = array();
        $agesCostsSum = 0;
        
        foreach($ages as $age){
            $ageCost = $benefitAgesCost->get($age);
            //Logger::logMessage('age: '.$age.' ageCost = '.$ageCost);
            $ageCost = $this->updateCostByZeroDeductibleWithoutAgeRangeRule($ageCost);

            //Logger::logMessage('age: '.$age.' updated by zero ded. ageCost = '.$ageCost);

            $ageCost = round($ageCost);
            $agesCostsSum += $ageCost;
        }
        //Logger::logMessage('agesCostsSum='.$agesCostsSum);
        array_push($costs, $agesCostsSum);
        return $costs;
    }

    private function parseInt($value){
        return intval($value);
    }
}