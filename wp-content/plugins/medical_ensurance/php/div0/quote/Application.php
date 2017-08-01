<?php

class Application implements IApplicationPostType
{
    private $id;
    private $companyName;
    private $data;
    private $persons;
    private $period;
    private $numPersons;
    private $startDate;
    private $finishDate;
    
    private $quoteDate;

    private $cardType;
    private $cardNumber;
    private $cardExpDate;
    private $cardHolder;

    private $countryOfOrigin;
    private $visitorType;

    private $arrivalDate;
    private $sponsorFirstName;
    private $sponsorLastName;
    private $beneficiaryFirstName;
    private $beneficiaryLastName;
    private $address;
    private $city;
    private $province;
    private $postalCode;
    private $email;
    private $phone;
    private $type;
    private $status;

    // TODO большое кол-во параметров + поменять очередность
    public function __construct($id, $companyName, $data, $persons, $period,
                                $numPersons, $startDate, $finishDate,
                                $cardType, $cardNumber, $cardExpDate,
                                $cardHolder, $countryOfOrigin, $visitorType,
                                $arrivalDate, $sponsorFirstName, $sponsorLastName, $address, 
                                $email, $city, $province, $postalCode, $phone, $beneficiaryFirstName,$beneficiaryLastName, $type, $status)
    {
        $this->id = $id;
        $this->companyName = $companyName;
        $this->data = $data;
        $this->persons = $persons;
        $this->period = $period;
        $this->numPersons = $numPersons;
        $this->startDate = $startDate;
        $this->finishDate = $finishDate;
        
        $this->cardExpDate = $cardExpDate;
        $this->cardHolder = $cardHolder;
        $this->cardNumber = $cardNumber;
        $this->cardType = $cardType;

        $this->countryOfOrigin = $countryOfOrigin;
        $this->visitorType = $visitorType;

        $this->arrivalDate = $arrivalDate;
        
        $this->sponsorFirstName = $sponsorFirstName;
        $this->sponsorLastName = $sponsorLastName;
        
        $this->beneficiaryFirstName = $beneficiaryFirstName;
        $this->beneficiaryLastName = $beneficiaryLastName;
        
        $this->address = $address;
        
        $this->city = $city;
        $this->province = $province;
        $this->postalCode = $postalCode;
        
        $this->email = $email;
        $this->phone = $phone;
        
        $this->type = $type;
        $this->status = $status;
    }

    public function get_post_data()
    {
        return array(
            'post_content' => $this->data,
            'post_title' => $this->companyName,
            'post_status' => 'publish',
            'post_type' => 'application'
        );
    }

    /**
     * Get all the post meta as a key-value associative array.
     *
     * @return array
     */
    public function get_post_meta()
    {
        return array(
            'id' => $this->id,
            'persons' => $this->persons,
            'period' => $this->period,
            'numPersons' => $this->numPersons,
            'startDate' => $this->startDate,
            'finishDate' => $this->finishDate,
            'cardType' => $this->cardType,
            'cardNumber' => $this->cardNumber,
            'cardHolder' => $this->cardHolder,
            'cardExpDate' => $this->cardExpDate,
            'countryOfOrigin' => $this->countryOfOrigin,
            'visitorType' => $this->visitorType,
            'arrivalDate' => $this->arrivalDate,
            'sponsorFirstName' => $this->sponsorFirstName,
            'sponsorLastName' => $this->sponsorLastName,
            'beneficiaryFirstName' => $this->beneficiaryFirstName,
            'beneficiaryLastName' => $this->beneficiaryLastName,
            'address' => $this->address,
            'city' => $this->city,
            'province' => $this->province,
            'postalCode' => $this->postalCode,
            'email' => $this->email,
            'phone' => $this->phone,
            'applicationType' => $this->type,
            'applicationState' => $this->status
        );
    }
}