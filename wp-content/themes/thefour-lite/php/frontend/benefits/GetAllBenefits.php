<?php


class GetAllBenefits
{
    public function execute(){
        $getCompaniesBenefits = new GetCompaniesBenefits();
        $allBenefits = $getCompaniesBenefits->execute();
        $benefitsCollectionEncoder = new BenefitsCollectionEncoder($allBenefits);
        $allBenefitsJson = $benefitsCollectionEncoder->encode();
        return $allBenefitsJson;
    }
}