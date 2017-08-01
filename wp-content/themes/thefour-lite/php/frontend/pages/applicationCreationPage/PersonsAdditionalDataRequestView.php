<?php

class PersonsAdditionalDataRequestView
{
    private $countriesFormRowElement;
    private $visitorTypeFormRowElement;

    private $startDate;
    private $finishDate;
    private $period;

    private $applicationHeader;
    private $sponsorHeader;
    private $beneficiaryHeader;

    private $sponsorColumn;
    private $dateColumn;
    private $addressColumn;
    private $emailColumn;
    private $beneficiaryColumn;

    private $countries;
    private $countriesSelectOptions;

    public function __construct($startDate, $finishDate, $period)
    {
        $this->startDate = $startDate;
        $this->finishDate = $finishDate;
        $this->period = $period;
        
        $this->applicationHeader = '<h3 class="centered bg-info">Information</h3>';

        $this->sponsorHeader = '<h3 class="centered bg-info">Sponsor</h3>';
        $this->beneficiaryHeader = '<h3 class="centered bg-info">Beneficiary</h3>';

        $this->countriesFormRowElement = new CountriesFormRowElement('Country of origin:');
        $this->visitorTypeFormRowElement = new VisitorTypeFormRowElement('Visitor type:');

        $this->countriesSelectOptions = new CountriesSelectOptions();

        $this->sponsorColumn = $this->createSponsorColumn();
        $this->dateColumn = $this->createDateColumn();

        $this->addressColumn = $this->createAddressColumn();
        $this->emailColumn = $this->createEmailColumn();

        $this->beneficiaryColumn = $this->createBeneficiaryColumn();
    }
    
    private function createSponsorColumn(){
        $this->countries = $this->countriesSelectOptions->getHtml();
        return '<div class="row col-sm-3">
        <div>
            <div>Sponsor</div>
            <div>
                <input type="text" id="sponsorFirstName" placeholder="First and Last name">
            </div>
        </div>
    </div>';
    }

    private function createDateColumn(){
        return '<div class="row col-sm-4">
        <div>
            <div>Arrival date to Canada</div>
            <div>
                <input type="text" id="arrivalDateInput" value="">
            </div>
        </div>
        <div>
            <div>Start date</div>
            <div>
                <input type="text" id="startDateInput" value="'.$this->startDate.'" disabled="disabled">
            </div>
        </div>
        <div>
            <div>Finish date</div>
            <div>
                <input type="text" id="finishDateInput" value="'.$this->finishDate.'" disabled="disabled">
            </div>
        </div>
        <div>
            <div>Period</div>
            <div>
                <div><b>'.$this->period.' day(s)</b></div>
            </div>
        </div>
    </div>';
    }

    private function createAddressColumn(){
        return '<div class="row col-sm-4">
        <div>
            <div>Canadian address</div>
            <div>
                <input type="text" value="" id="streetInput">
            </div>
        </div>
        <div>
            <div>City</div>
            <div>
                <input type="text" value="" id="cityInput" placeholder="City">
            </div>
        </div>
        <div>
            <div>Province</div>
            <div>
                <select id="provinceSelect">
                    <option value="British Columbia">British Columbia</option>
                    <option value="Ontario">Ontario</option>
                    <option value="Newfoundland">Newfoundland</option>
                    <option value="Nova Scotia">Nova Scotia</option>
                     <option value="Prince Edward Island">Prince Edward Island</option>
                     <option value="New Brunswick">New Brunswick</option>
                     <option value="Quebec">Quebec</option>
                     <option value="Manitoba">Manitoba</option>
                     <option value="Saskatchewan">Saskatchewan</option>
                     <option value="Alberta">Alberta</option>
                     <option value="Northwest Territories">Northwest Territories</option>
                     <option value="Nunavut">Nunavut</option>
                     <option value="Yukon Territory">Yukon Territory</option>
                </select>
            </div>
        </div>
        <div>
            <div>Postal code</div>
            <div>
                <input type="text" value="" id="postalCodeSelect" placeholder="Postal code">
            </div>
        </div>
    </div>';
    }

    private function createEmailColumn(){
        return '<div class="row col-sm-3">
        <div>
            <div>Country of origin</div>
            <div>
                <select id="countriesSelect" class="countrySelect">'.$this->countries.'</select>
            </div>
        </div>
        <div>
            <div>Visitor type</div>
            <div>
                <select id="visitorTypeSelect"><option value="Visitor">Visitor</option><option value="New Immigrant">New Immigrant</option><option value="Super Visa">Super Visa</option><option value="Work or Student Visa">Work or Student Visa</option><option value="Returning Canadian">Returning Canadian</option><option value="Other">Other</option></select>
            </div>
        </div>
        <div>
            <div>Your email</div>
            <div>
                <input type="email" value="" id="emailInput" placeholder="Your email">
                <div id="emailErrorMessage" class="text-danger" style="float: left;"></div>
            </div>
        </div>
        <div>
            <div>Your phone</div>
            <div>
                <input value="" id="phoneInput" placeholder="Numbers only">
                <div id="phoneErrorMessage" class="text-danger" style="float: left;"></div>
            </div>
        </div>
    </div>';
    }

    private function createBeneficiaryColumn(){
        return '<div class="row col-sm-3">
        <div>
            <div>Beneficiary</div>
            <div>
                <input type="text" id="beneficiaryFirstName" placeholder="First and Last name">
            </div>
        </div>
        <div>
            <div>Relationship</div>
            <div>
                <input type="text" id="beneficiaryRelationship" placeholder="Spouse, Child, etc">
            </div>
        </div>
    </div>';
    }

    public function getHtml(){
        $html = $this->applicationHeader;
        $html.= '<div class="container">';
        $html.=$this->dateColumn;
        $html.=$this->addressColumn;
        $html.=$this->emailColumn;
        $html.='</div>';

        $html.=$this->sponsorHeader;

        $html.='<div class="container">';
        $html.=$this->sponsorColumn;
        $html.='</div>';

        $html.=$this->beneficiaryHeader;
        $html.='<div class="container">';
        $html.=$this->beneficiaryColumn;
        $html.='</div>';

        return $html;
    }
}