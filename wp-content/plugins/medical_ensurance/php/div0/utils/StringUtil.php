<?php

class StringUtil
{
    public static function formatMoneyInt($source){
        return "$ ".number_format($source, 0, ',', ' ');
    }
    
    public static function formatMoneyDivisional($source){
        return "$ ".number_format($source, 2, '.', ' ');
    }

    public static function unquote($string){
        return stripslashes($string);
    }
    public static function limitStringCharacters($sourceString, $charactersLimit = 250){
        $sourceStringLength = strlen($sourceString);
        if($sourceStringLength > $charactersLimit){
            return substr($sourceString, 0, $charactersLimit).'...';
        }
        else{
            return $sourceString;
        }
    }
}