<?php


class ValueObject {
    protected $id;
    protected $value;

    public function __construct($id, $value){
        $this->id = $id;
        $this->value = $value;
    }

    public function getId(){
        return $this->id;
    }
    public function getValue(){
        return $this->value;
    }
} 