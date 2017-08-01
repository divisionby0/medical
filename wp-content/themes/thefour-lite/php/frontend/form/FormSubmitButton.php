<?php


class FormSubmitButton extends FormRowElement{
    protected function createPrefixAndPostfix(){
        $this->prefix = '<div class="formRow centered">';
        $this->postfix = '</div>';
    }

    protected function createContent(){
        $this->content .= '<input type="submit" id="formSubmitButton" class="getQuoteButtonAppearance getQuoteButtonTransform backgroundColorRed" value="'.$this->label.'">';
    }
} 