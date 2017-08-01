<?php


class BenefitsAgesCostsByZeroDeductible
{
    private $collection;
    
    public function __construct($collection)
    {
        $this->collection = $collection;
    }
    
    public function getBenefitCost($benefit){
        if($this->collection->size()>0){
            if($this->collection->has($benefit)){
                return $this->collection->get($benefit);
            }
            else{
                return NAN;
            }
        }
        else{
            return NAN;
        }
    }
}