<?php


class BenefitsCollectionEncoder
{
    private $benefitsCollection;
    private $encoder;

    public function __construct($benefitsCollection)
    {
        $this->benefitsCollection = $benefitsCollection;
        //$this->encoder = $benefitsCollection->getJsonEncoder();
    }
    
    public function encode(){
        //return $this->encoder->encode();
        return json_encode($this->benefitsCollection);
    }
}