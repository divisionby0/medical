<?php


class InvisibleAgesFormRowElement extends AgesFormRowElement
{
    protected function createPrefixAndPostfix(){
        $this->prefix = '<div id="ageRow_'.$this->id.'" class="formRow ageRow invisible"><div class="formRowElement formRowLegend">'.$this->label.'</div>';
        $this->postfix = '</div>';
    }
}