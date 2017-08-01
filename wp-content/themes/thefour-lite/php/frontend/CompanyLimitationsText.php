<?php

class CompanyLimitationsText extends CompanyContentText
{
    protected function getMetaKey(){
        return 'limitationCompany';
    }

    protected function getPostType(){
        return "limitation";
    }
}