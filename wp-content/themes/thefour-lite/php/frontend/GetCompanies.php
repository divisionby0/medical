<?php

class GetCompanies {
    protected $queryArguments;
    protected $companies;

    public function __construct(){
        $this->companies = new Map('companies');
    }

    public function execute(){
        $this->createQueryArguments();
        $this->queryPosts();
        $this->updateBenefits();
        $this->updateLimitations();
        return $this->companies;
    }

    private function createQueryArguments(){
        $this->queryArguments=array(
            'post_type' => Constants::$postType,
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'caller_get_posts'=> 1);
    }

    protected function queryPosts(){
        global $wpdb;
        $query = new WP_Query($this->queryArguments);
        if( $query->have_posts() ) {
            while ($query->have_posts()) : $query->the_post();
                $id = get_the_ID();
                $name = get_the_title();
                
                $url = get_post_meta( $id, Constants::$companyPageUrl, true );
                
                // collections
                $scccData = get_post_meta( $id, Constants::$scccTable, true );
                $standardRatesData = get_post_meta( $id, Constants::$standardRatesTable, true );
                $rateTableGuide = get_post_meta( $id, Constants::$ratesGuides, true );
                $deducibleAmountOptions = get_post_meta( $id, Constants::$deductibleAmountOptions, true );
                $benefitsCollection = get_post_meta( $id, Constants::$benefits, true );
                $deductiblesCollection = get_post_meta( $id, Constants::$deductibles, true );
                
                $familyRateMaxAge = get_post_meta( $id, Constants::$familyRateMaxAge, true );
                $familyRatePremiumTable = get_post_meta( $id, Constants::$familyRatePremiumTable, true );
                
                $companyData = new CompanyData($id, $name, "", "", $scccData, $standardRatesData, $rateTableGuide, $deducibleAmountOptions, $familyRateMaxAge, $benefitsCollection, $deductiblesCollection, $familyRatePremiumTable, $url);

                $company = new Company($companyData);

                $this->companies->add($name, $company);

            endwhile;
        }
    }

    private function updateBenefits(){
        $companiesIterator = $this->companies->getIterator();
        while($companiesIterator->hasNext()){
            $company = $companiesIterator->next();
            $companyName = $company->getName();

            $companyBenefitsText = new CompanyBenefitsText();
            $benefitsText = $companyBenefitsText->get($companyName);
            $company->setBenefitsText($benefitsText);
        }
    }
    private function updateLimitations(){
        $companiesIterator = $this->companies->getIterator();
        while($companiesIterator->hasNext()){
            $company = $companiesIterator->next();
            $companyName = $company->getName();

            $companyLimitationsText = new CompanyLimitationsText();
            $limitationsText = $companyLimitationsText->get($companyName);
            $company->setLimitationsText($limitationsText);
        }
    }
}