<?php


class StandardRatesMetaBox {
    public function __construct($company){
        $company_standardRatesTableData = strval( get_post_meta( $company->ID, Constants::$standardRatesTable, true ) );
        $normalizedStandardRatesTableData = htmlspecialchars($company_standardRatesTableData, ENT_QUOTES, 'UTF-8');

        $spoilerId = 'spoiler_'.rand(1,15000);

        echo '<h1 class="centered">STANDARD RATES - No Stable Chronic Condition Coverage</h1>';

        echo '<div class="spoiler"><input type="checkbox" id="'.$spoilerId.'"><label for="'.$spoilerId.'">standard rates debug data</label><div class="spoiler_body">';
        echo '<input type="text" size="100%" name="'.Constants::$standardRatesTableEditor.'" id="'.Constants::$standardRatesTableEditor.'" value="'.$normalizedStandardRatesTableData.'" class="fullWidth"></input>';
        echo '</div></div>';

        //echo '<input type="text" size="100%" name="'.Constants::$standardRatesTableEditor.'" id="'.Constants::$standardRatesTableEditor.'" value="'.$normalizedStandardRatesTableData.'" class="invisible"></input>';
        echo '<div id="standardRatesTableContainer" class="tableContainer"></div>';
        echo '<input id="clearStandardRatesTableButton" class="invisible" type="button" value="Set all to 0">';
    }
} 