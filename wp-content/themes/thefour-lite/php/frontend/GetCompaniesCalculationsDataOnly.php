<?php


class GetCompaniesCalculationsDataOnly extends GetCompanies
{
    // override
    protected function queryPosts(){
        $query = new WP_Query($this->queryArguments);
        if( $query->have_posts() ) {
            while ($query->have_posts()) : $query->the_post();
                $id = get_the_ID();
                $name = get_the_title();
                $url = get_permalink();
                
                // collections
                $scccData = get_post_meta( $id, Constants::$scccTable, true );
                $standardRatesData = get_post_meta( $id, Constants::$standardRatesTable, true );
                $rateTableGuide = get_post_meta( $id, Constants::$ratesGuides, true );
                $deducibleAmountOptions = get_post_meta( $id, Constants::$deductibleAmountOptions, true );
                $benefitsCollection = get_post_meta( $id, Constants::$benefits, true );
                $deductiblesCollection = get_post_meta( $id, Constants::$deductibles, true );

                $familyRateMaxAge = get_post_meta( $id, Constants::$familyRateMaxAge, true );
                $familyRatePremiumTable = get_post_meta( $id, Constants::$familyRatePremiumTable, true );

                $companyData = new CompanyData($id, $name, '', '', $scccData, $standardRatesData, $rateTableGuide, $deducibleAmountOptions, $familyRateMaxAge, $benefitsCollection, $deductiblesCollection, $familyRatePremiumTable, $url);

                $company = new Company($companyData);

                $this->companies->add($name, $company);

            endwhile;
        }
    }
}