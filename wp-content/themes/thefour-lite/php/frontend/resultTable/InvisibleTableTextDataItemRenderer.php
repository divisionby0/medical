<?php


class InvisibleTableTextDataItemRenderer extends BaseItemRenderer
{
    public function getHTML(){
        $prefix = '<td class="companyTableItemRenderer" style="display: none"><div class="companyTextData" id="'.$this->id.'">';
        $postfix = '</div></td>';
        return $prefix . $this->data . $postfix;
    }
}