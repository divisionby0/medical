<?php


class FamilyRateDetector
{
    private $familyRateMinPersons = 3;

    public function detect(array $ages, $familyRateMaxAge){
        if(sizeof($ages) >= $this->familyRateMinPersons){
            foreach($ages as $age){
                if($age > $familyRateMaxAge){
                    return false;
                    break;
                }
            }
            return true;
        }
        else{
            return false;
        }
    }
}