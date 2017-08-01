<?php

class CompanyMetaBox {
	public function show($company){
        //$companyBenefitsText =  get_post_meta( $company->ID, Constants::$benefitsText, true );
        //$company_limitations = get_post_meta( $company->ID, Constants::$limitationsText, true );

		//echo '<h1>Benefits text</h1>';
        //echo '<font color="red">Please use admin editor functions(buttons) to format text instead of pasting formatted text</font>';
		//wp_editor( $companyBenefitsText, Constants::$benefitsTextMetaBoxEditor, $settings = array() );

		//echo '<h1>Limitations text</h1>';
        //echo '<font color="red">Please use admin editor functions(buttons) to format text instead of pasting formatted text</font>';
		//wp_editor( $company_limitations, Constants::$limitationsTextMetaBoxEditor, $settings = array() );

        new CompanyPageUrlMetaBox($company);

        $benefitsMetaBox = new BaseMetaBox($company, 'Benefits', Constants::$benefits, 'addBenefitButton', 'benefit', 'removeBenefitButton', 'benefit', Constants::$benefitsMetaBoxEditor, 'benefitsErrorTextContainer', 'benefitsSelect');
        $deductibleAmountsMetaBox = new BaseMetaBox($company, 'Deductibles', Constants::$deductibles, 'addDeductibleButton', 'deductible', 'removeDeductibleButton', 'deductible', Constants::$deductiblesMetaBoxEditor, 'deductiblesErrorTextContainer', 'deductiblesSelect');


        new RateTableGuideMetaBox($company);

        new DeductibleAmountOptionsMetaBox($company);

        new SCCCMetaBox($company);
        new StandardRatesMetaBox($company);
        new FamilyRateMaxAgeMetabox($company);
        new QuestionaryMetaBox($company);
	}
} 