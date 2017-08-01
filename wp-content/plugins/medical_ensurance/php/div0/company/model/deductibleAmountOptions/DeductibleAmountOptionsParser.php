<?php


class DeductibleAmountOptionsParser
{
    public static function parse($data){
        $jsonDecoder = new MapJsonDecoder($data);
        return $jsonDecoder->decode();
    }
}