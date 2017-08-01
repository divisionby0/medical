<?php

class SaveCompany {
	private $companyId;
	public function __construct($company_id, $company){
		$isCompanyPostType = $company->post_type == Constants::$postType;

		if ( $isCompanyPostType ) {
			$this->companyId = $company_id;

			//$this->saveBenefitsText();
			//$this->saveLimitationsText();
            $this->saveBenefitsCollection();
            $this->saveDeductibleAmountsCollection();
            $this->saveRateTableGuideCollection();
            $this->saveDeductibleAmountOptionsCollection();
			$this->saveSCCCTable();
            $this->saveStandardRatesTable();
            $this->saveFamilyRateMaxAge();
            $this->saveCompanyPageUrl();
            $this->saveQuestionary();
		}
	}

	private function saveBenefitsText(){
        $benefits = $_POST[Constants::$benefitsTextMetaBoxEditor];
		if ( isset( $benefits )) {
			update_post_meta( $this->companyId, Constants::$benefitsText, $benefits );
		}
	}

	private function saveLimitationsText(){
        $limitations = $_POST[Constants::$limitationsTextMetaBoxEditor];
		if ( isset( $limitations )) {
			update_post_meta( $this->companyId, Constants::$limitationsText, $limitations );
		}
	}

    private function saveBenefitsCollection(){
        $benefits = $_POST[Constants::$benefitsMetaBoxEditor];
        if ( isset( $benefits ) && $benefits != '' ) {
            update_post_meta( $this->companyId, Constants::$benefits, $benefits );
        }
    }
    private function saveDeductibleAmountsCollection(){
        $deductibles = $_POST[Constants::$deductiblesMetaBoxEditor];
        if ( isset( $deductibles ) && $deductibles != '' ) {
            update_post_meta( $this->companyId, Constants::$deductibles, $deductibles );
        }
    }

    private function saveRateTableGuideCollection(){
        $rateTableCollectionData = $_POST[Constants::$rateTableEditorId];
        if ( isset( $rateTableCollectionData ) && $rateTableCollectionData != '' ) {
            update_post_meta( $this->companyId, Constants::$ratesGuides, $rateTableCollectionData );
        }
    }
    private function saveDeductibleAmountOptionsCollection(){
        $deductibleAmountOptionsTableCollectionData = $_POST[Constants::$deductibleAmountOptionsEditorId];
        if ( isset( $deductibleAmountOptionsTableCollectionData ) && $deductibleAmountOptionsTableCollectionData != '' ) {
            update_post_meta( $this->companyId, Constants::$deductibleAmountOptions, $deductibleAmountOptionsTableCollectionData );
        }
    }

	private function saveSCCCTable(){
        $scccTableData = $_POST[Constants::$scccTableMetaBoxEditor];
		if ( isset( $scccTableData ) && $scccTableData != '' ) {
			update_post_meta( $this->companyId, Constants::$scccTable, $scccTableData );
		}
	}

    private function saveStandardRatesTable(){
        $standardRatesTableData = $_POST[Constants::$standardRatesTableEditor];
        if ( isset( $standardRatesTableData ) && $standardRatesTableData != '' ) {
            update_post_meta( $this->companyId, Constants::$standardRatesTable, $standardRatesTableData );
        }
    }
    private function saveFamilyRateMaxAge(){
        $familyRateMaxAge = $_POST[Constants::$familyRateMaxAgeMetaBoxEditor];
        $familyRatePremiumTable = $_POST[Constants::$familyRatePremiumTableEditor];
        
        if ( isset( $familyRateMaxAge ) && $familyRateMaxAge != '' ) {
            update_post_meta( $this->companyId, Constants::$familyRateMaxAge, $familyRateMaxAge );
        }
        if ( isset( $familyRatePremiumTable ) && $familyRatePremiumTable != '' ) {
            update_post_meta( $this->companyId, Constants::$familyRatePremiumTable, $familyRatePremiumTable );
        }
    }
    
    private function saveCompanyPageUrl(){
        $companyPageUrl = $_POST[Constants::$companyPageUrlMetaBoxEditor];
        if ( isset( $companyPageUrl )) {
            update_post_meta( $this->companyId, Constants::$companyPageUrl, $companyPageUrl );
        }
    }

    private function saveQuestionary()
    {
        $questionsData = $_POST[Constants::$questionaryEditor];
        if ( isset( $questionsData ) && $questionsData != '' ) {
            update_post_meta( $this->companyId, Constants::$questionary, $questionsData );
        }
    }
}