<?php

class BenefitFormRowElement extends FormRowElement{

    // override
    protected function createContent(){
        $benefitsSelect = new Select('benefitsSelect','benefit');
        $this->content .= $benefitsSelect->getHTML();
    }
} 