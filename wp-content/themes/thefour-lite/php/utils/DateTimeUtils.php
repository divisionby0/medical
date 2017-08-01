<?php

class DateTimeUtils {
    public static function convertToDate($dateString){
        $converted = new DateTime($dateString);
        return $converted;
    }

    public static function calculateInterval($dateStart, $dateFinish){
        $interval = $dateFinish->diff($dateStart);
        return $interval->days + 1;

    }

    public static function convertMonthNumberToMonthName($monthNumber){
        $dateObj = DateTime::createFromFormat('!m', $monthNumber);

        if(is_object($dateObj)){
            return $dateObj->format('F');
        }
        else{
            throw new Error('convert month number to name error. Could not create date from given month with number "'.$monthNumber.'"');
        }
    }
} 