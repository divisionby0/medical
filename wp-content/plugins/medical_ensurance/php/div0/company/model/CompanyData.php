<?php


class CompanyData {
    protected $id;
    protected $url;
    protected $name;
    protected $benefitsText;
    protected $limitationsText;
    protected $scccTableData;
    protected $standardRatesTableData;
    private $benefits;
    protected $rateTableGuide;
    protected $deductibleAmountOptions;
    protected $familyRateMaxAge;
    protected $familyRatePremiumTable;

    protected $benefitsCollection;
    protected $deductiblesCollection;

    public function __construct($id, $name, $benefitsText, $limitationsText, $scccTableData, $standardRatesTableData, $rateTableGuide, $deductibleAmountOptions, $familyRateMaxAge, $benefitsCollection, $deductiblesCollection, $familyRatePremiumTable, $url){
        $this->id = $id;
        $this->name = $name;
        $this->url = $url;
        $this->benefitsText = $benefitsText;
        $this->limitationsText = $limitationsText;
        $this->scccTableData = $scccTableData;
        $this->standardRatesTableData = $standardRatesTableData;
        
        $this->rateTableGuide = $rateTableGuide;
        $this->deductibleAmountOptions = $deductibleAmountOptions;
        
        $this->benefitsCollection = $benefitsCollection;
        $this->deductiblesCollection = $deductiblesCollection;
        
        $this->familyRateMaxAge = $familyRateMaxAge;
        $this->familyRatePremiumTable = $familyRatePremiumTable;
        
        $this->benefits = new Map('companyBenefits');
        //$this->deductibleAmountOptions = new Map('deductibleAmountOptions');
    }

    public function getId(){
        return $this->id;
    }
    public function getName(){
        return $this->name;
    }
    public function getBenefitsText(){
        return $this->benefitsText;
    }
    public function setBenefitsText($value){
        $this->benefitsText = $value;
    }
    public function getLimitationsText(){
        return $this->limitationsText;
    }
    public function setLimitationsText($value){
        $this->limitationsText = $value;
    }
    public function getScccData(){
        return $this->scccTableData;
    }
    public function getStandardRatesData(){
        return $this->standardRatesTableData;
    }

    public function addBenefit(Benefit $benefit){
        return $this->benefits->add($benefit->getId(), $benefit);
    }
    public function removeBenefit($id){
        $this->benefits->remove($id);
    }
    public function allBenefits(){
        return $this->benefits->getIterator();
    }

    /**
     * @return mixed
     */
    public function getRateTableGuide()
    {
        return $this->rateTableGuide;
    }

    /**
     * @return mixed
     */
    public function getDeductibleAmountOptions()
    {
        return $this->deductibleAmountOptions;
    }

    /**
     * @return mixed
     */
    public function getFamilyRateMaxAge()
    {
        return $this->familyRateMaxAge;
    }

    /**
     * @return mixed
     */
    public function getFamilyRatePremiumTable()
    {
        return $this->familyRatePremiumTable;
    }

    /**
     * @return mixed
     */
    public function getBenefitsCollection()
    {
        return $this->benefitsCollection;
    }

    /**
     * @return mixed
     */
    public function getDeductiblesCollection()
    {
        return $this->deductiblesCollection;
    }

    /**
     * @return mixed
     */
    public function getUrl()
    {
        return $this->url;
    }


} 