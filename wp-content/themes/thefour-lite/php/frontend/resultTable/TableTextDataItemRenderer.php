<?php

class TableTextDataItemRenderer extends BaseItemRenderer{
    public function getHTML(){
        $prefix = '<td class="companyTableItemRenderer"><div class="companyTextData" id="'.$this->id.'">';
        $postfix = '</div></td>';
        return $prefix . $this->data . $postfix;
    }
} 