<?php

class DeductibleAmountOptionDialog extends BaseDataInputDialog{

    private function createSurchargeOrDiscountInputElement($label, $elementId){
        $elementHtml = $this->createElementContainerPrefix($label);
        $elementHtml.= '<input type="text" id="'.$elementId.'" value="0">';
        $elementHtml.= $this->createElementContainerPostfix();
        return $elementHtml;
    }


    public function __construct(){
        $deductibleAmountOptionSelectHtml = $this->createSelectElement('Deductible Amount Option:', 'deductibleAmountOptionSelect');
        $surchargeOrDiscountInputHtml = $this->createSurchargeOrDiscountInputElement('Surcharge or Discount to Apply:', 'surchargeOrDiscountInput');
        $aggregatePolicyLimitSelectHtml = $this->createSelectElement('Aggregate Policy Limit', 'aggregatePolicyLimitSelect');

        $ageFromHtml = $this->createAgeSelectElement('Age from:', 'deductibleAmountOptionAgeFromSelect');
        $ageTillHtml = $this->createAgeSelectElement('Age till:', 'deductibleAmountOptionAgeTillSelect');

        $okButtonHtml = $this->createButton('Add deductible amount option','addDeductibleAmountOptionConfirmButton');
        $cancelButtonHtml = $this->createButton('Cancel','cancelDeductibleAmountOptionConfirmationButton');

        $this->html .= $deductibleAmountOptionSelectHtml.$surchargeOrDiscountInputHtml.$aggregatePolicyLimitSelectHtml.$ageFromHtml. $ageTillHtml.$okButtonHtml.$cancelButtonHtml;
    }
} 