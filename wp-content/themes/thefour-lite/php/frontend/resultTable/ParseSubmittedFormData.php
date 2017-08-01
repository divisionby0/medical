<?php

class ParseSubmittedFormData {

    private $numPersons;
    private $ages;
    private $benefit;

    private $startMonth;
    private $startDay;
    private $startYear;
    private $startDate;

    private $finishMonth;
    private $finishDay;
    private $finishYear;
    private $finishDate;

    private $totalDays;

    private $useSccc;

    public function __construct(){
        $this->numPersons = $_POST['numPersons'];

        if(!isset($this->numPersons)){
            throw new Exception('Error parsing form data. Num persons is not set. Stopping');
        }

        $this->ages = $_POST['ages'];
        $this->benefit = $_POST['benefit'];

        //Logger::logMessage("ParseSubmittedFormData ages=".$this->ages);

        $this->ages = json_decode(stripslashes($this->ages));
        $this->ages = ArrayUtils::parseIntValues($this->ages);

        try{
            $this->startMonth = DateTimeUtils::convertMonthNumberToMonthName($_POST['startDateMonth']);
        }
        catch(Error $error){
            throw new Error('parse submited form data error. '.$error->getMessage());
        }

        $this->startDay = $_POST['startDateDay'];
        $this->startYear = $_POST['startDateYear'];

        $this->useSccc = $_POST['scccCovering'];

        try{
            $this->finishMonth =  DateTimeUtils::convertMonthNumberToMonthName($_POST['finishDateMonth']);
        }
        catch(Error $error){
            throw new Error('parse submited form data error. '.$error->getMessage());
        }

        //$this->finishMonth =  DateTimeUtils::convertMonthNumberToMonthName($_POST['finishDateMonth']);
        $this->finishDay = $_POST['finishDateDay'];
        $this->finishYear = $_POST['finishDateYear'];

        $this->startDate = DateTimeUtils::convertToDate($this->startYear.'-'.$_POST['startDateMonth'].'-'.$this->startDay);
        $this->finishDate = DateTimeUtils::convertToDate($this->finishYear.'-'.$_POST['finishDateMonth'].'-'.$this->finishDay);

        $this->totalDays = DateTimeUtils::calculateInterval($this->startDate,$this->finishDate);
    }

    public function getData(){
        return array('numPersons'=>$this->numPersons, 'ages'=>$this->ages, 'startDate'=>$this->startDate, 'finishDate'=>$this->finishDate, 'totalDays'=>$this->totalDays, 'useSccc'=>$this->useSccc);
    }
} 