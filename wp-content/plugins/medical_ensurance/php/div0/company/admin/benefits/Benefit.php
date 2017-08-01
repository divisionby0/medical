<?php

class Benefit{
    private $amount;
    private $zeroDeductibleCost;

    public function __construct($amount)
    {
        $this->amount = $amount;
    }

    /**
     * @return mixed
     */
    public function getZeroDeductibleCost()
    {
        return $this->zeroDeductibleCost;
    }

    /**
     * @param mixed $zeroDeductibleCost
     */
    public function setZeroDeductibleCost($zeroDeductibleCost)
    {
        $this->zeroDeductibleCost = $zeroDeductibleCost;
    }

    /**
     * @return mixed
     */
    public function getAmount()
    {
        return $this->amount;
    }
} 