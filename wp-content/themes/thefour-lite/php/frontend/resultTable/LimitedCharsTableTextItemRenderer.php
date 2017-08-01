<?php

class LimitedCharsTableTextItemRenderer extends TableTextDataItemRenderer
{
    private $maxCharacters = 1000;

    public function getHTML(){

        $this->maxCharacters = get_option( 'result_table_text_data_max_chars', '1000' );

        $prefix = '<td class="companyTableItemRenderer"><div class="companyTextData" id="'.$this->id.'">';
        $postfix = '</div></td>';

        $this->data = StringUtil::limitStringCharacters($this->data, $this->maxCharacters);

        return $prefix . $this->data . $postfix;
    }
}