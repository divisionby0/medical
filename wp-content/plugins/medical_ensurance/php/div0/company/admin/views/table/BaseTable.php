<?php

class BaseTable {

    protected $data;
    protected $htmlContent = "";
    protected $prefix = "";
    protected $postfix = "";

    public function __construct($id, $data){
        if($data && $data->size()>0){
            $this->data = $data;
            $this->createPrefixAndPostfix($id);
            $this->createContent();
            $this->draw();
        }
        else{
            Logger::logError('Empty table data');
        }
    }

    protected function createPrefixAndPostfix($id){

        $this->prefix = '<font color="red">N/A values should set to -1</font><table id="'.$id.'">';
        $this->postfix = '</table>';
    }
    private function createContent(){
        $this->createLegendRow();
        $this->createContentFromData();
    }

    protected function createContentFromData(){
    }

    protected function createRow($row){
    }

    protected function addLegendRow($row){
        $this->htmlContent = $this->htmlContent.'<td>'.$row->getId().'</td>';
    }

    protected function createLegendRow(){
    }

    private function draw(){
        echo $this->prefix.$this->htmlContent.$this->postfix;
    }
} 