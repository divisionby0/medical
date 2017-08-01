<?php

class CompanyResultTableRow extends CompanyData{
    private $html;

    public function __construct($id, $name, $benefitsText, $limitationsText, $scccTableData, $standardRatesTableData, $rateTableGuide, $deductibleAmountOptions, $familyRateMaxAge, $benefitsCollection, $deductiblesCollection, $familyRatePremiumTable, $url){
        parent::__construct($id, $name, $benefitsText, $limitationsText, $scccTableData, $standardRatesTableData, $rateTableGuide, $deductibleAmountOptions, $familyRateMaxAge, $benefitsCollection, $deductiblesCollection, $familyRatePremiumTable, $url);
        $this->createHTML();
    }

    private function createHTML(){
        $this->html = '<tr class="resultTableRow companyTableRow invisible" id="company_'.$this->id.'" data-companyurl="'.$this->url.'" data-companyid="'.$this->id.'" data-companyname="'.$this->name.'">';

        $this->createBenefits();
        $this->createLimitations();
        $this->createSCCCData();
        $this->createStandartRatesData();
        $this->createRateTableGuide();
        $this->createDeductibleAmountOptions();
        $this->createFamilyRateMaxAge();
        $this->createFamilyRatePremiumTable();

        $this->createBenefitsCollection();
        $this->createDeductiblesCollection();
        $this->html .= '</tr>';
    }

    public function getHTML(){
        return $this->html;
    }

    private function createBenefits(){
        $benefitsRenderer = new TableTextDataItemRenderer('benefitsText', $this->benefitsText);
        $this->html .= $benefitsRenderer->getHTML();
    }
    private function createLimitations(){
        $limitsRenderer = new TableTextDataItemRenderer('limitationsText', $this->limitationsText);
        $this->html .= $limitsRenderer->getHTML();
    }
    private function createSCCCData(){
        $scccRenderer = new InvisibleTableTextDataItemRenderer('scccText', $this->scccTableData);
        $this->html .= $scccRenderer->getHTML();
    }
    private function createStandartRatesData(){
        $standartRatesRenderer = new InvisibleTableTextDataItemRenderer('standartRatesText', $this->standardRatesTableData);
        $this->html .= $standartRatesRenderer->getHTML();
    }

    private function createRateTableGuide(){
        $dataRenderer = new InvisibleTableTextDataItemRenderer('rateTableGuideText', $this->rateTableGuide);
        $this->html .= $dataRenderer->getHTML();
    }
    private function createDeductibleAmountOptions(){
        $dataRenderer = new InvisibleTableTextDataItemRenderer('deductibleAmountOptionsText', $this->deductibleAmountOptions);
        $this->html .= $dataRenderer->getHTML();
    }

    private function createFamilyRateMaxAge(){
        $dataRenderer = new InvisibleTableTextDataItemRenderer('familyRateMaxAgeText', $this->familyRateMaxAge);
        $this->html .= $dataRenderer->getHTML();
    }
    private function createFamilyRatePremiumTable(){
        $dataRenderer = new TableTextDataItemRenderer('familyRatePremiumTable', $this->familyRatePremiumTable);
        $this->html .= $dataRenderer->getHTML();
    }

    private function createBenefitsCollection(){
        $dataRenderer = new InvisibleTableTextDataItemRenderer('benefitsCollection', $this->benefitsCollection);
        $this->html .= $dataRenderer->getHTML();
    }
    private function createDeductiblesCollection(){
        $dataRenderer = new InvisibleTableTextDataItemRenderer('deductiblesCollection', $this->deductiblesCollection);
        $this->html .= $dataRenderer->getHTML();
    }

} 