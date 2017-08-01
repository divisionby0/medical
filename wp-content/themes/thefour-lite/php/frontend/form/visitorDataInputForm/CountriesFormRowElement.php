<?php


class CountriesFormRowElement extends FormRowElement
{
    protected function createContent(){
        $countriesSelect = new CountriesSelect('countriesSelect', 'country');
        $this->content .= $countriesSelect->getHTML();
    }
}