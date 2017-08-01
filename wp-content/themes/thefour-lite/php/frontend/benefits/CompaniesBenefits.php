<?php


class CompaniesBenefits
{
    private $allBenefitsJson;
    private $allBenefits;
    
    public function __construct()
    {
        $this->allBenefitsJson = $this->getAllBenefits();
        $mapJsonDecoder = new MapJsonDecoder($this->allBenefitsJson);
        $this->allBenefits = $mapJsonDecoder->decode();
    }
    
    private function getAllBenefits(){
        $getCompaniesBenefits = new GetCompaniesBenefits();
        $allBenefits = $getCompaniesBenefits->execute();
        $benefitsCollectionEncoder = new BenefitsCollectionEncoder($allBenefits);
        return $benefitsCollectionEncoder->encode();
    }

    /**
     * @return Map
     */
    public function getAll()
    {
        return $this->allBenefits;
    }

    /**
     * @return string
     */
    public function getAllBenefitsJson()
    {
        return $this->allBenefitsJson;
    }
}