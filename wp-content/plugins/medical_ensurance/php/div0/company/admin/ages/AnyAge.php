<?php

class AnyAge extends AgeRange{

    public function __construct(){
        parent::__construct(null,null);
    }
    public function getType(){
        return AgeRangeType::$any;
    }

    public function getTill(){
        throw new Exception('AnyAge has not "till" parameter');
    }

    public function getFrom(){
        throw new Exception('AnyAge has not "from" parameter');
    }
} 