<?php

class IndividualsBenefitsCostsByZeroDeductibleCalculation
{
    private $rateTableGuide;
    private $scccTable;
    private $standardRatesTable;
    //private $benefitsCosts;

    public function calculate(DeductibleAmountOptions $deductibleAmountOptions, array $ages, Map $scccTable, Map $standardRatesTable, RateTableGuide $rateTableGuide, $sccc){
        // LOOP
        // iterate each age first
        // get table by sccc option and age
        // get benefit zero deductible cost for age
        // END OF LOOP
        
        // sum benefits zero deductible costs for ages

        $this->scccTable = $scccTable;
        $this->standardRatesTable = $standardRatesTable;

        $this->rateTableGuide = $rateTableGuide;

        $benefitsCosts = new Map('benefitsCosts');

        foreach($ages as $age){
            $premiumTableNameForAge = $this->rateTableGuide->getTableName($age, $sccc);

            if(isset($premiumTableNameForAge)){
                $premiumTable = $this->parsePremiumTable($premiumTableNameForAge);

                $concreteAge = array($age);
                //Logger::logMessage("Age ".$age.'  premium table : '.$premiumTable->getId());
                
                $ageBenefitsCosts = $deductibleAmountOptions->parseBenefitsCostsForAges($premiumTable, $concreteAge);

                $benefits = $ageBenefitsCosts->getKeys();
                foreach($benefits as $benefit){

                    $ageBenefitCost = $ageBenefitsCosts->get($benefit);

                    $ageBenefitCost = $ageBenefitCost[0];

                    if($benefitsCosts->has($benefit)){
                        $savedAgeBenefitCost = $benefitsCosts->get($benefit);
                        $sumCosts = $savedAgeBenefitCost + $ageBenefitCost;

                        $benefitsCosts->update($benefit, $sumCosts);
                    }
                    else{
                        $benefitsCosts->add($benefit, $ageBenefitCost);
                    }
                }
            }
            else{
                //Logger::logError("Premium table for age ".$age.'  and sccc option '.$sccc.'  NOT Found !');
            }
        }
        //Logger::logMessage('all ages benefits costs: ');
        //$benefitsCosts->dumpCollection();

        $benefitsCosts = $this->formatBenefitsCosts($benefitsCosts);

        $benefitsAgesCostsByZeroDeductible = new BenefitsAgesCostsByZeroDeductible($benefitsCosts);
        return $benefitsAgesCostsByZeroDeductible;
    }

    private function formatBenefitsCosts(Map $collection){
        $newCollection = new Map($collection->getId());
        $keys = $collection->getKeys();
        foreach($keys as $key){
            $value = $collection->get($key);
            $newCollection->add($key, array($value));
        }
        return $newCollection;
    }

    private function parsePremiumTable($tableName){
        if($tableName == 'scccMap'){
            return $this->scccTable;
        }
        else if($tableName == 'standardRatesMap'){
            return $this->standardRatesTable;
        }
    }
}