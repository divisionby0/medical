<?php

class BenefitsZeroDeductibleCostCollection{
    private $collection;
    
    public function __construct()
    {
        $this->collection = new Map('benefits');
    }
    
    public function addBenefit(Benefit $benefit){
        $amount = $benefit->getAmount();
        $this->collection->add($amount, $benefit);
    }
} 