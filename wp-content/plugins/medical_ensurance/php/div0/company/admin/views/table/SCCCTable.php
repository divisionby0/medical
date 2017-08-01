<?php


class SCCCTable extends BaseTable{

    protected function createContentFromData(){

        $dataIterator = $this->data->getIterator();
        while($dataIterator->hasNext()){
            $row = $dataIterator->next();
            $this->createRow($row);
        }
    }

    protected function createPrefixAndPostfix($id){
        $this->prefix = $this->prefix . '<table id="'.$id.'">';
        $this->postfix = $this->postfix . '</table>';
    }

    protected function createRow($row){
        $this->htmlContent = $this->htmlContent.'<tr id="'.$row->getId().'">';

        $this->addLegendRow($row);

        $rowIterator = $row->getIterator();
        $columnIndex = -1;

        while($rowIterator->hasNext()){
            $columnIndex+=1;
            $value = $rowIterator->next();
            $itemRenderer = new TextInputItemRenderer('id', $value, $row->getId(), $columnIndex);

            $rendererHtml = $itemRenderer->getHTML();
            $this->htmlContent = $this->htmlContent.$rendererHtml;
        }

        $this->htmlContent = $this->htmlContent.'</tr>';
    }

    protected function createLegendRow(){

        $this->htmlContent = $this->htmlContent.'<tr id="legendRow">';

        $this->htmlContent = $this->htmlContent.'<th>Aggregate Policy Limit</th>';

        for($i=1; $i<10; $i++){
            $this->htmlContent = $this->htmlContent.'<th>'.$i.' y.</th>';
        }
        $this->htmlContent = $this->htmlContent.'</tr>';
        
    }
} 