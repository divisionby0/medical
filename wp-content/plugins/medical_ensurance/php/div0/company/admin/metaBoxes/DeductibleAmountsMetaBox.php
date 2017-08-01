<?php

class DeductibleAmountsMetaBox {
    public function __construct($company){
        $companyDeductibleCollection = get_post_meta( $company->ID, Constants::$deductibles, true );
        $normalizedCompanyDeductiblesData = htmlspecialchars($companyDeductibleCollection, ENT_QUOTES, 'UTF-8');

        echo '<h1 class="centered">Deductible amounts</h1>';
        echo '<input type="button" value="Add amount" id="addDeductibleAmountButton">';
        echo '<div style="color: red" id="deductiblesErrorTextContainer"></div>';
        echo '<input type="button" value="Remove amount" id="removeDeductibleAmountButton">';
        echo '<input type="text" size="100%" name="'.Constants::$deductiblesMetaBoxEditor.'" id = "'.Constants::$deductiblesMetaBoxEditor.'" value="'.$normalizedCompanyDeductiblesData.'" class="invisible"></input>';
        $select = new Select('deductiblesSelect', 'deductiblesSelect');
        echo $select->getHTML();
    }
} 