<?php

class AgeRange implements IAgeRange{

    protected $from = 0;
    protected $till = 99;

    public function __construct($from, $till){
        $this->from = $from;
        $this->till = $till;
    }

    public function getType(){
        return AgeRangeType::$range;
    }

    public function getFrom(){
        return $this->from;
    }
    public function getTill(){
        return $this->till;
    }
} 