<?php

class GetCompaniesBenefits
{
    private $allBenefits;
    private $benefits = array();

    public function __construct()
    {
        $this->allBenefits = new Map('allBenefits');
    }
    
    public function execute(){
        $this->getAllCompaniesBenefits();
        //return $this->allBenefits;
        return $this->benefits;
    }

    private function getAllCompaniesBenefits(){
        global $wpdb;
        $results = $wpdb->get_results( "SELECT id FROM wp_posts WHERE post_type='company' AND post_status='publish'");

        foreach($results as $companyData){
            $companyId = $companyData->id;
            $companyBenefitsData = get_post_meta($companyId, Constants::$benefits);
            $companyBenefits = $companyBenefitsData[0];
            $this->allBenefits->add($companyId, $companyBenefits);
            array_push($this->benefits,$companyBenefits);
        }
    }
}