<?php

class SCCCMetaBox {
    public function __construct($company){
        $company_scccTableData = strval( get_post_meta( $company->ID, Constants::$scccTable, true ) );
        $normalizedScccTableData = htmlspecialchars($company_scccTableData, ENT_QUOTES, 'UTF-8');
        $spoilerId = 'spoiler_'.rand(1,15000);
        
        echo '<h1 class="centered">STABLE CHRONIC CONDITION COVERAGE</h1>';

        echo '<div class="spoiler"><input type="checkbox" id="'.$spoilerId.'"><label for="'.$spoilerId.'">sccc debug data</label><div class="spoiler_body">';
        echo '<input type="text" size="100%" name="'.Constants::$scccTableMetaBoxEditor.'" id = "'.Constants::$scccTableMetaBoxEditor.'" value="'.$normalizedScccTableData.'" class="fullWidth"></input>';
        echo '</div></div>';

        //echo '<input type="text" size="100%" name="'.Constants::$scccTableMetaBoxEditor.'" id = "'.Constants::$scccTableMetaBoxEditor.'" value="'.$normalizedScccTableData.'"></input>';
        echo '<div id="scccTableContainer" class="tableContainer">';
        echo '</div>';
        echo '<input id="clearScccTableButton" type="button" class="invisible" value="Set all to 0">';
    }
} 