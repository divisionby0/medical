<?php

class ResultTable {

    private $dataProvider;

    private $prefix = '<div id="familyRateInfo">Family rate</div><table class="fullwidth" id="companiesTable">';
    private $postfix = '</table>';
    private $header;
    private $companiesElements;
    private $companyUrls;

    public function __construct($dataProvider){
        $this->dataProvider = $dataProvider;
        $this->companiesElements = new Map('companies');
        $this->companyUrls = array();

        $this->createHeader();
        $this->createContent();
        $this->build();
        $this->createUrlsContainer();
    }

    private function createUrlsContainer(){
        echo '<div id="urls" class="invisible">'.json_encode($this->companyUrls).'</div>';
    }

    private function createHeader(){
        $this->header = new ResultTableHeader();
    }


    private function createContent(){

        global $wpdb;
        $companiesIterator = $this->dataProvider->getIterator();
        
        while($companiesIterator->hasNext()){
            $company = $companiesIterator->next();
            $companyId = $company->getId();
            $companyUrl = $company->getUrl();

            $companyName = $company -> getName();

            $this->companyUrls[$companyName] = $companyUrl;

            $companyBenefitsText = $company->getBenefitsText();
            $companyLimitationsText = $company->getLimitationsText();
            
            $companyScccData = $company->getScccData();
            $companyStandardRatesData = $company->getStandardRatesData();
            
            $companyRateTableGuide = $company->getRateTableGuide();
            $companyDeductibleAmountOptions = $company->getDeductibleAmountOptions();

            $companyBenefitsCollection = $company->getBenefitsCollection();
            $companyDeductiblesCollection = $company->getDeductiblesCollection();

            $companyFamilyRateMaxAge = $company->getFamilyRateMaxAge();
            $companyFamilyRatePremiumTable = $company->getFamilyRatePremiumTable();

            $companyRow = new CompanyResultTableRow($companyId, $companyName, $companyBenefitsText, $companyLimitationsText, $companyScccData, $companyStandardRatesData, $companyRateTableGuide, $companyDeductibleAmountOptions, $companyFamilyRateMaxAge, $companyBenefitsCollection, $companyDeductiblesCollection, $companyFamilyRatePremiumTable, $companyUrl);
            $this->companiesElements->add($companyId, $companyRow);
        }
    }

    private function build(){
        $tableHtml = '';
        $tableHtml .= $this->prefix;
        $tableHtml .= $this->header->getHTML();

        $companiesRowsIterator = $this->companiesElements->getIterator();
        while($companiesRowsIterator->hasNext()){
            $companyRow = $companiesRowsIterator->next();
            $tableHtml .= $companyRow->getHTML();
        }

        $tableHtml .= $this->postfix;

        echo $tableHtml;
    }
} 