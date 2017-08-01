<?php


class AgesFormRowElement{

    protected $label;
    private $content = '';
    protected $prefix = '';
    protected $postfix = '';
    private $inputId;
    protected $id;

    public function __construct($label, $id){
        $this->id = $id;
        $this->label = $label;
        $this->createPrefixAndPostfix();
        $this->createContent();
    }

    protected function createPrefixAndPostfix(){
        $this->prefix = '<div id="ageRow_'.$this->id.'" class="formRow ageRow"><div class="formRowElement formRowLegend" id="ageRow_'.$this->id.'" data-rowstate="age">'.$this->label.'</div>';
        $this->postfix = '</div>';
    }

    private function createContent(){
        $this->inputId = 'ageCalendarInput_'.$this->id;

        if(intval($this->id) > 1){
            $agesSelect = new TeenAgesSelect('agesSelect_'.$this->id, 'age');
        }
        else{
            $agesSelect = new AgesSelect('agesSelect_'.$this->id, 'age');
        }

        $this->content .= $agesSelect->getHTML();
    }

    public function getHTML(){
        return $this->prefix.$this->content.$this->postfix;
    }
} 