<?php

class Cookie
{
    public static function setUserInputFormData($userData){
        return setcookie("userFormData", $userData, time()+3600, "/");
    }
    public static function getUserInputFormData(){
        return $_COOKIE["userFormData"];
    }

    public static function setCurrentCompany($id){
        return setcookie("currentCompany", $id, time()+3600, "/");
    }
    public static function getCurrentCompany(){
        return $_COOKIE["currentCompany"];
    }
    
    public static function setAllBenefits($data){
        setcookie('allBenefits', $data, time()+3600);
    }
    public static function getAllBenefits(){
        return $_COOKIE['allBenefits'];
    }
    
    public static function setBenefit($data){
        setcookie('benefit', $data, time()+3600);
    }
    public static function getBenefit(){
        return $_COOKIE['benefit'];
    }
    
    public static function setUserPersonalData($data){
        setcookie('userPersonalData', $data, time()+3600);
    }
    public static function getUserPersonalData(){
        return $_COOKIE['userPersonalData'];
    }
    
    public static function setSelectedCompanyData($data){
        setcookie('selectedCompany', $data, time()+3600);
    }
    public static function getSelectedCompanyData(){
        return $_COOKIE['selectedCompany'];
    }

    public static function getSelectedCompanyPlan(){
        return $_COOKIE['plan'];
    }

    public static function getPeriod(){
        return $_COOKIE['period'];
    }
    
    public static function getArrivalDate(){
        return $_COOKIE['arrivalDate'];
    }
    public static function getQuoteId(){
        return $_COOKIE['quoteId'];
    }
}