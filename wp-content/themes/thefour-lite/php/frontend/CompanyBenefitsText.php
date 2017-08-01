<?php


class CompanyBenefitsText extends CompanyContentText
{
    protected function getMetaKey(){
        return 'benefitCompany';
    }

    protected function getPostType(){
        return "benefit";
    }
}