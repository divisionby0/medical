<?php

class CreateSCCCTable {
    private $dataString;
    private $rootMap;

    public function __construct($dataString){
        $this->dataString = $dataString;
        $this->createMap();
    }

    private function createMap(){
        $this->rootMap = new Map('rootMap');
    }
} 