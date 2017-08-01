<?php

class Select {
    protected $id;
    protected $name;
    protected $content = '';
    protected $prefix = '';
    protected $postfix = '';

    public function __construct($id, $name){
        $this->id = $id;
        $this->name = $name;
        $this->createPrefixAndPostfix();
        $this->createContent();
    }

    protected function createPrefixAndPostfix(){
        $this->prefix = '<select id="'.$this->id.'" class="formRowElement '.$this->id.' dateInput" style="float:left;" name="'.$this->name.'">';
        $this->postfix = '</select>';
    }

    protected function createContent(){

    }
    public function getHTML(){
        return $this->prefix . $this->content . $this->postfix;
    }
} 