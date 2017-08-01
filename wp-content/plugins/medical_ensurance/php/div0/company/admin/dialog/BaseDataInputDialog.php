<?php

class BaseDataInputDialog {

    protected $html = "";

    public function getHTML(){
        return $this->html;
    }

    protected function createElementContainerPrefix($label){
        return '<div class="inputElementRow"><div class="inputElementRowLegend">'.$label.'</div>';
    }

    protected function createElementContainerPostfix(){
        return '</div>';
    }

    protected function createSelectPrefix($label, $elementId){
        return $this->createElementContainerPrefix($label).'<select id="'.$elementId.'">';
    }

    protected function createSelectPostfix(){
        return '</select>'.$this->createElementContainerPostfix();
    }

    protected function createSelectElement($label, $elementId){
        $elementHTML = $this->createSelectPrefix($label, $elementId);

        $elementHTML .= $this->createSelectPostfix();
        return $elementHTML;
    }

    protected function createAgeSelectElement($legend, $selectId){
        $elementHTML = $this->createSelectPrefix($legend, $selectId);

        for($i=0; $i < count(Ages::$values); $i++){
            $elementHTML .= '<option value="'.$i.'">'.$i.'</option>';
        }

        $elementHTML .= $this->createSelectPostfix();
        return $elementHTML;
    }

    protected function createButton($label, $elementId){
        return '<input type="button" value="'.$label.'" id="'.$elementId.'">';
    }
} 