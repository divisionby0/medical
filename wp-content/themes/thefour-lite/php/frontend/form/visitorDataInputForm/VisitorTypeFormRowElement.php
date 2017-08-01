<?php


class VisitorTypeFormRowElement extends FormRowElement
{
    protected function createContent(){
        $select = new VisitorTypeSelect('visitorTypeSelect','visitorType');
        $this->content .= $select->getHTML();
    }
}