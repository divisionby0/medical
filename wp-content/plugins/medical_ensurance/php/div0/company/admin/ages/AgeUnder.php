<?php

class AgeUnder extends AgeRange{

    public function __construct($till){
        parent::__construct(null, $till);
    }

    public function getType(){
        return AgeRangeType::$under;
    }

    public function getFrom(){
        throw new Exception('AgeUnder has not "from" parameter');
    }
} 