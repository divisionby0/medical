<?php

class NumPersonsFormRowElement extends FormRowElement
{
    protected function createContent(){
        $numPersonsSelect = new NumPersonsSelect('numPersonsSelect', 'numPersons');
        $this->content .= $numPersonsSelect->getHTML();
    }
}