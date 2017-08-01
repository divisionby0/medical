<?php

class SCCCRadioButtons extends FormRowElement{
    protected function createPrefixAndPostfix(){
        $this->prefix = '<div class="formRow centered">';
        $this->postfix = '</div>';
    }

    protected function createContent(){
        $this->content .= '<input type="radio" name="scccCovering" value="Yes" checked> Yes';
        $this->content .= '<input type="radio" name="scccCovering" value="No"> No';
    }
} 