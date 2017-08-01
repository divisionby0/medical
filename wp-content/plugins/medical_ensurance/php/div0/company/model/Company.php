<?php

class Company {
    private $companyData;
    private $benefitsAgesCostsByZeroDeductible;
    private $deductibleAmountOptions;
    private $scccTable;
    private $standardRatesTable;
    private $rateTableGuide;
    private $familyRatePremiumTableName;

    public function __construct(CompanyData $companyData){
        $this->companyData = $companyData;

        $this->scccTable = $this->parseTableData($this->companyData->getScccData());
        $this->standardRatesTable = $this->parseTableData($this->companyData->getStandardRatesData());
        $this->familyRatePremiumTableName = $this->companyData->getFamilyRatePremiumTable();

        $rateTableGuideCollection = $this->parseTableData($this->companyData->getRateTableGuide());
        $this->rateTableGuide = new RateTableGuide($rateTableGuideCollection);
        
        $deductibleAmountOptions = DeductibleAmountOptionsParser::parse($this->companyData->getDeductibleAmountOptions());
        $this->deductibleAmountOptions = new DeductibleAmountOptions($deductibleAmountOptions);
    }

    public function getId(){
        return $this->companyData->getId();
    }

    public function getName(){
        return $this->companyData->getName();
    }
    
    public function getURL(){
        return $this->companyData->getUrl();
    }

    public function getBenefitsText(){
        return $this->companyData->getBenefitsText();
    }
    public function getLimitationsText(){
        return $this->companyData->getLimitationsText();
    }
    
    public function setBenefitsText($value){
        $this->companyData->setBenefitsText($value);
    }
    public function setLimitationsText($value){
        return $this->companyData->setLimitationsText($value);
    }

    public function getScccData(){
        return $this->companyData->getScccData();
    }

    public function getStandardRatesData(){
        return $this->companyData->getStandardRatesData();
    }

    public function getRateTableGuide(){
        return $this->rateTableGuide->getJson();
    }

    public function getDeductibleAmountOptions(){
        return $this->companyData->getDeductibleAmountOptions();
    }

    public function getFamilyRateMaxAge(){
        return $this->companyData->getFamilyRateMaxAge();
    }
    public function getFamilyRatePremiumTable(){
        return $this->companyData->getFamilyRatePremiumTable();
    }

    public function getBenefitsCollection(){
        return $this->companyData->getBenefitsCollection();
    }
    public function getDeductiblesCollection(){
        return $this->companyData->getDeductiblesCollection();
    }
    
    public function getBenefitsAgesCostsByZeroDeductible()
    {
        return $this->benefitsAgesCostsByZeroDeductible;
    }

    public function getBenefitZeroDeductibleCost($benefit){
        //Logger::logMessage('Company '.$this->getName().'  getBenefitZeroDeductibleCost benefit='.$benefit);
        $benefitCostByZeroDeductible = $this->benefitsAgesCostsByZeroDeductible->getBenefitCost($benefit);
        //Logger::logMessage('$benefitCostByZeroDeductible='.$benefitCostByZeroDeductible);
        return $benefitCostByZeroDeductible;
    }

    public function calculateEachBenefitZeroDeductibleCostByUserData($totalDays, $ages, $sccc){
        //Logger::logMessage("<br/>Company '".$this->companyData->getName()."'  calculateEachBenefitZeroDeductibleCostByUserData. TotalDays=".$totalDays." ages=".$ages."  sccc=".$sccc);

        $isFamilyRate = $this->detectFamilyRate($ages);

        if($isFamilyRate){
            //Logger::logMessage('is family rate');
            $this->calculateFamilyRate($ages, $sccc);
        }
        else{
            //Logger::logMessage('Is not family rate');
            $this->calculateIndividuals($ages, $sccc);
        }
    }

    private function detectFamilyRate($ages){
        $familyRateDetector = new FamilyRateDetector();
        return $familyRateDetector->detect($ages, $this->companyData->getFamilyRateMaxAge());
    }

    private function parseTableData($tableDataJson){
        $mapJsonDecoder = new MapJsonDecoder($tableDataJson);
        return $mapJsonDecoder->decode();
    }

    private function calculateFamilyRate($ages){
        $familyRateCalculations = new FamilyRateBenefitsCostsByZeroDeductibleCalculation();
        $this->benefitsAgesCostsByZeroDeductible = $familyRateCalculations->calculate($this->deductibleAmountOptions, $ages, $this->scccTable, $this->standardRatesTable, $this->familyRatePremiumTableName);
    }

    private function calculateIndividuals($ages, $sccc){
        //Logger::logMessage("<br/><h4>Company ".$this->getName().'  calculating individuals...</h4>');
        $individualsCalculations = new IndividualsBenefitsCostsByZeroDeductibleCalculation();
        $this->benefitsAgesCostsByZeroDeductible = $individualsCalculations->calculate($this->deductibleAmountOptions, $ages, $this->scccTable, $this->standardRatesTable, $this->rateTableGuide, $sccc);
    }
}