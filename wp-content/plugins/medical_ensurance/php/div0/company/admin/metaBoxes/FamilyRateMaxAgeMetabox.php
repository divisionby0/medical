<?php


class FamilyRateMaxAgeMetabox
{
    public function __construct($company)
    {
        $familyRateMetabox = get_post_meta( $company->ID, Constants::$familyRateMaxAge, true );
        $normalizedFamilyRateMetabox = htmlspecialchars($familyRateMetabox, ENT_QUOTES, 'UTF-8');

        $familyRatePremiumTable = get_post_meta( $company->ID, Constants::$familyRatePremiumTable, true );

        echo '<div class="metaBox" >';
        echo '<h1 class="centered">Family rate maximum age</h1>';
        echo '<input value="'.$normalizedFamilyRateMetabox.'" id="'.Constants::$familyRateMaxAgeMetaBoxEditor.'" name="'.Constants::$familyRateMaxAgeMetaBoxEditor.'">';
        echo '<h1 class="centered">Family rate premium table</h1>';
        echo '<select id="familyRatePremiumTableSelect" name="familyRatePremiumTableEditor">';

        if($familyRatePremiumTable == 'scccMap'){
            echo '<option value="scccMap" selected="selected">SCCC</option>';
            echo '<option value="standardRatesMap">Standard rates</option>';
        }
        else{
            echo '<option value="scccMap">SCCC</option>';
            echo '<option value="standardRatesMap" selected="selected">Standard rates</option>';
        }

        echo '</select>';
        echo '</div>';
    }
}