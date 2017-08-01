<?php

class BenefitsMetaBox {
    public function __construct($company){
        $companyBenefitsCollection = get_post_meta( $company->ID, Constants::$benefits, true );
        $normalizedCompanyBenefitsCollectionData = htmlspecialchars($companyBenefitsCollection, ENT_QUOTES, 'UTF-8');

        echo '<h1 class="centered">Benefits</h1>';
        echo '<input type="button" value="Add benefit" id="addBenefitButton">';
        echo '<div style="color: red" id="benefitsErrorTextContainer"></div>';
        echo '<input type="button" value="Remove benefit" id="removeBenefitButton">';
        
        echo '<div class="spoiler"><input type="checkbox" id="spoilerid_1"><label for="spoilerid_1">spoiled text</label><div class="spoiler_body">';
        echo '<input type="text" size="100%" name="'.Constants::$benefitsMetaBoxEditor.'" id = "'.Constants::$benefitsMetaBoxEditor.'" value="'.$normalizedCompanyBenefitsCollectionData.'"></input>';
        echo '</div></div>';

        $benefitsSelect = new Select('benefitsSelect', 'benefitsSelect');
        echo $benefitsSelect->getHTML();
    }
} 