<?php

class FinishQuoteEmailBodyBuilder
{
    private $data;
    
    public function __construct($data)
    {
        $this->data = $data;
        $this->buildHtml();
    }
    
    public function getHtml(){
    
    }
    
    private function buildHtml(){
        
    }
}