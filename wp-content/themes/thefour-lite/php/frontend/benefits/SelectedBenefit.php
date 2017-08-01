<?php

class SelectedBenefit
{
    public static function get(){
        $savedBenefitFromPostData = $_POST['selectedBenefit'];
        $savedBenefitFromCookie = Cookie::getBenefit();
        $savedBenefit = null;

        if(!isset($savedBenefitFromPostData)){
            if(isset($savedBenefitFromCookie)){
                $savedBenefit = $savedBenefitFromCookie;
            }
        }
        else{
            $savedBenefit = $savedBenefitFromPostData;
        }
        
        return $savedBenefit;
    }
}