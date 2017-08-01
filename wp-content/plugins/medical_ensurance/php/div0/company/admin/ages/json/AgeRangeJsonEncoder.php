<?php

class AgeRangeJsonEncoder {
    public static function encode(IAgeRange $ageRange){

        $data = array('ageRangeType'=>$ageRange->getType());

        switch($ageRange::getType()){
            case AgeRangeType::$range:
                $data['from']=$ageRange->getFrom();
                $data['till']=$ageRange->getTill();
                break;

            case AgeRangeType::$any:
                // only type need to save - nothing to add any more
                break;

            case AgeRangeType::$under:
                $data['till']=$ageRange->getTill();
                break;

            case AgeRangeType::$over:
                $data['from']=$ageRange->getFrom();
                break;
        }

        return json_encode($data);
    }
} 