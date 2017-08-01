<?php

class DeductibleAmountOptionsMetaBox {

    private function createLegendRow(){
        $legendRow = '<tr id="legendRow">';
        $legendRow.= '<th>ID</th>';
        $legendRow.= '<th>Deductible amount option</th>';
        $legendRow.='<th>Surcharge or Discount to Apply</th>';
        $legendRow.= '<th>Aggregate policy limit</th>';
        $legendRow.='<th>Available to Age...</th>';
        $legendRow .= '</tr>';
        return $legendRow;
    }

    public function __construct($company){
        $companyMetaCollection = get_post_meta( $company->ID, Constants::$deductibleAmountOptions, true );
        $normalizedCompanyMetaCollection = htmlspecialchars($companyMetaCollection, ENT_QUOTES, 'UTF-8');

        $spoilerId = 'spoiler_'.rand(1,150000);

        echo '<div class="metaBox">';
        echo '<h1 class="centered">Deductible Amount Options</h1>';
        echo '<input type="button" value="Add new amount option" id="addDeductibleAmountOptionButton">';
        //echo '<input type="text" size="100%" name="deductibleAmountOptionsTableEditor" id = "deductibleAmountOptionsTableEditor" value="'.$normalizedCompanyMetaCollection.'" class="invisible"></input>';

        $addDeductibleAmountOptionDialog = new DeductibleAmountOptionDialog();

        echo '<div id="newDeductibleAmountOptionDialogContent" title="New deductible amount option" class="deductibleAmountOptionDialogContent">' .$addDeductibleAmountOptionDialog->getHTML().'</div>';

        $table = '<table id="deductibleAmountOptionsTable">';
        $legendRow = $this->createLegendRow();

        $table .= $legendRow . '</table>';
        echo $table;

        echo '<div class="spoiler"><input type="checkbox" id="'.$spoilerId.'"><label for="'.$spoilerId.'">Deductible amount options debug data</label><div class="spoiler_body">';
        echo '<input type="text" size="100%" name="deductibleAmountOptionsTableEditor" id = "deductibleAmountOptionsTableEditor" value="'.$normalizedCompanyMetaCollection.'" class="fullWidth"></input>';
        echo '</div></div>';

        echo '</div>';
    }
} 