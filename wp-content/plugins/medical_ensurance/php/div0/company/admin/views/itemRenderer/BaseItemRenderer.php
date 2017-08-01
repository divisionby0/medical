<?php

class BaseItemRenderer {
    protected $id;
    protected $data;

    public function __construct($id, $data){
        $this->id = $id;
        $this->data = $data;

        if($this->data && $this->id){
            $this->getHTML();
        }
    }

    public function getHTML(){

    }
} 