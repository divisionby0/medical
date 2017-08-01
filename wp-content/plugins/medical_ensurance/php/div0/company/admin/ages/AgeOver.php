<?php

class AgeOver extends AgeRange{

    public function __construct($from){
        parent::__construct($from, null);
    }
    public function getType(){
        return AgeRangeType::$over;
    }

    public function getTill(){
        throw new Exception('AgeOver has not "till" parameter');
    }
} 