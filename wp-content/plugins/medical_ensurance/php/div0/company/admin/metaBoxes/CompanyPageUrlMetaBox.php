<?php


class CompanyPageUrlMetaBox
{
    public function __construct($company){
        $companyPageUrl = get_post_meta( $company->ID, Constants::$companyPageUrl, true );
        echo '<h1 class="centered">COMPANY PAGE URL</h1>';
        echo '<input type="text" size="100%" name="'.Constants::$companyPageUrlMetaBoxEditor.'" id = "'.Constants::$companyPageUrlMetaBoxEditor.'" value="'.$companyPageUrl.'" class="fullWidth"></input>';
    }
}