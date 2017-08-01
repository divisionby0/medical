<?php

class ArrayUtils
{
    public static function parseIntValues(array $sourceArray){
        $resultArray = array();
        foreach($sourceArray as $item){
            $itemIntegerValue = intval($item);
            array_push($resultArray, $itemIntegerValue);
        }
        
        return $resultArray;
    }
}