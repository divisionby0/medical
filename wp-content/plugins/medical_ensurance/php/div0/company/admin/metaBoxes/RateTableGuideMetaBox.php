<?php

class RateTableGuideMetaBox {

    private function createLegendRow(){
        $legendRow = '<tr id="legendRow">';
        $legendRow = '<th>ID</th>';
        $legendRow.='<th>Age</th>';
        $legendRow.='<th>Stable chronic condition option</th>';
        $legendRow.='<th>Medical declaration required</th>';
        $legendRow.='<th>Premium table</th>';
        $legendRow.='<th>Normal Deductible amount</th>';
        $legendRow .= '</tr>';
        return $legendRow;
    }

    public function __construct($company){
        $companyMetaCollection = get_post_meta( $company->ID, Constants::$ratesGuides, true );
        $normalizedCompanyMetaCollection = htmlspecialchars($companyMetaCollection, ENT_QUOTES, 'UTF-8');

        $spoilerId = 'spoiler_'.rand(1,150000);

        echo '<div class="metaBox">';
        echo '<h1 class="centered">Rate table guide</h1>';
        echo '<input type="button" value="Add new rate" id="addRateButton">';

        //echo '<input type="text" size="100%" name="'.Constants::$rateTableEditorId.'" id = "'.Constants::$rateTableEditorId.'" value="'.$normalizedCompanyMetaCollection.'"></input>';

        $rateInputDialogContent = new RateDataInputDialog();

        echo '<div id="'.Constants::$newRateDialogContent.'" title="New rate" class="'.Constants::$rateDialogContentCSSClass.'">' .$rateInputDialogContent->getHTML().'</div>';

        $table = '<table id="'.Constants::$ratesTableId.'">';
        $legendRow = $this->createLegendRow();

        $table .= $legendRow . '</table>';
        echo $table;

        echo '<div class="spoiler"><input type="checkbox" id="'.$spoilerId.'"><label for="'.$spoilerId.'">Rate table guide debug data</label><div class="spoiler_body">';
        echo '<input type="text" size="100%" name="'.Constants::$rateTableEditorId.'" id = "'.Constants::$rateTableEditorId.'" value="'.$normalizedCompanyMetaCollection.'" class="fullWidth"></input>';
        echo '</div></div>';

        echo '</div>';
    }
} 