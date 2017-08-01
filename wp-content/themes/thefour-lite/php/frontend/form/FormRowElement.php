<?php

class FormRowElement {
    protected $label;
    protected $content = '';
    protected $prefix = '';
    protected $postfix = '';

    public function __construct($label){
        $this->label = $label;
        $this->createPrefixAndPostfix();
        $this->createContent();
    }

    protected function createPrefixAndPostfix(){
        $this->prefix = '<div class="formRow"><div class="formRowElement formRowLegend">'.$this->label.'</div>';
        $this->postfix = '</div>';
    }

    protected function createContent(){

    }

    public function getHTML(){
        return $this->prefix.$this->content.$this->postfix;
    }
} 