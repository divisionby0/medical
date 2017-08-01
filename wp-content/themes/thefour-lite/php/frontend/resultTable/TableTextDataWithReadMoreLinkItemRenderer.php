<?php


class TableTextDataWithReadMoreLinkItemRenderer extends TableTextDataItemRenderer
{
    private $readMoreUrl;

    public function __construct($id, $data, $readMoreUrl){
        $this->readMoreUrl = $readMoreUrl;
        parent::__construct($id, $data);
    }

    public function getHTML(){
        $prefix = '<td class="companyTableItemRenderer"><div class="companyTextData" id="'.$this->id.'">';
        $postfix = '</div></td>';

        $this->data = StringUtil::limitStringCharacters($this->data, 400);

        $readMoreElement = '<br/><a href="'.$this->readMoreUrl.'">read more...</a>';

        return $prefix . $this->data . $readMoreElement. $postfix;
    }
}