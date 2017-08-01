<?php

class FamilyRateBenefitsCostsByZeroDeductibleCalculation
{
    public function calculate(DeductibleAmountOptions $deductibleAmountOptions, array $ages, Map $scccTable, Map $standardRatesTable, $familyRatePremiumTable){
        $familyRateAges = new FamilyRateAges();
        $ages = $familyRateAges->selectOldestAges($ages);

        if($familyRatePremiumTable=='standardRatesMap'){
            $table = $standardRatesTable;
        }
        elseif($familyRatePremiumTable=='scccMap'){
            $table = $scccTable;
        }

        $collection = $deductibleAmountOptions->parseBenefitsCostsForAges($table, $ages);

        $doubledCosts = new Map('costs');

        $keys = $collection->getKeys();
        for($i=0; $i<sizeof($keys); $i++){
            $key = $keys[$i];
            $cost = $collection->get($key)[0];

            $doubledCost = $cost*2;
            $doubledCosts->add($key, array($doubledCost));
        }

        //$benefitsAgesCostsByZeroDeductible = new BenefitsAgesCostsByZeroDeductible($collection);
        $benefitsAgesCostsByZeroDeductible = new BenefitsAgesCostsByZeroDeductible($doubledCosts);

        return $benefitsAgesCostsByZeroDeductible;
    }
}