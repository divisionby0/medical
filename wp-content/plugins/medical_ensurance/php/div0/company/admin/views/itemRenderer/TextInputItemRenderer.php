<?php

class TextInputItemRenderer extends BaseItemRenderer{

    private $rowId;
    private $columnIndex;

    public function __construct($id, $data, $rowId, $columnIndex){
        $this->rowId = $rowId;
        $this->columnIndex = $columnIndex;
        parent::__construct($id, $data);
    }

    public function getHTML(){
        return '<td><input class="tableCeilItemRenderer" type="number" id="' .$this->id.'" value="'.$this->data.'" data-rowid="'.$this->rowId.'" data-columnindex="'.$this->columnIndex.'"></td>';
    }
}