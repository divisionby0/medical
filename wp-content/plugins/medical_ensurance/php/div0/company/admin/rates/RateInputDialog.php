<?php

class RateDataInputDialog extends BaseDataInputDialog{

    public function __construct(){
        $ageFromHtml = $this->createAgeSelectElement('Age from:', Constants::$rateAgeFromSelectId);
        $ageTillHtml = $this->createAgeSelectElement('Age till:', Constants::$rateAgeTillSelectId);
        $stableChronicConditionOption = $this->buildStableChronicConditionOptionElement('Stable chronic condition option', Constants::$sccoSelectId);
        $medicalDeclarationRequiredHtml = $this->createMedicalDeclarationRequiredElement('Medical declaration required:', Constants::$medicalDeclarationRequiredSelectId);
        $premiumTableHtml = $this->createPremiumTableElement('Premium table:', Constants::$premiumTableSelectId);

        $normalDeductibleAmountSelectHtml = $this->createSelectElement('Normal deductible amount:', Constants::$rateNormalDeductibleAmountSelectId);

        $okButtonHtml = $this->createButton('Add rate',Constants::$newRateDialogOkButtonId);
        $cancelButtonHtml = $this->createButton('Cancel',Constants::$newRateDialogCancelButtonId);

        $this->html .= $ageFromHtml.$ageTillHtml.$stableChronicConditionOption.$medicalDeclarationRequiredHtml. $premiumTableHtml.$normalDeductibleAmountSelectHtml.$okButtonHtml.$cancelButtonHtml;
    }

    private function buildStableChronicConditionOptionElement($legend, $selectId){
        $elementHTML = $this->createSelectPrefix($legend, $selectId);

        $elementHTML .= '<option value="0">No</option>';
        $elementHTML .= '<option value="1">Yes</option>';
        $elementHTML .= '<option value="-1">N/A</option>';

        $elementHTML .= $this->createSelectPostfix();
        return $elementHTML;
    }


    private function createMedicalDeclarationRequiredElement($legend, $selectId){
        $elementHTML = $this->createSelectPrefix($legend, $selectId);

        $elementHTML .= '<option value="0">No</option>';
        $elementHTML .= '<option value="1">Yes</option>';

        $elementHTML .= $this->createSelectPostfix();
        return $elementHTML;
    }

    private function createPremiumTableElement($legend, $selectId){
        $elementHTML = $this->createSelectPrefix($legend, $selectId);

        $elementHTML .= '<option value="scccMap">sccc table</option>';
        $elementHTML .= '<option value="standardRatesMap">standard rates table</option>';

        $elementHTML .= $this->createSelectPostfix();
        return $elementHTML;
    }
} 