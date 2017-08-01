<?php

// TODO придумать нормальное название
class VisitorDataInputForm {

    private $userId;
    //private $prefix = '<form action="companies-by-user-data" method="post">';
    private $prefix = '<form action="benefits-by-user-data-and-zero-deductible" method="post" class="userInputForm">';
    private $postfix = '</form>';

    private $numPersonsFormRowElement;
    private $benefitFormRowElement;
    private $startDateFormRowElement;
    private $finishDateFormRowElement;
    private $countriesFormRowElement;
    private $visitorTypeFormRowElement;
    private $useScccFormRowElement;

    public function __construct($userId){

        $savedUserFormData = StringUtil::unquote(Cookie::getUserInputFormData());
        
        echo '<div id="savedUserData" class="invisible">'.$savedUserFormData.'</div>';

        $this->userId = $userId;
        $this->numPersonsFormRowElement = new NumPersonsFormRowElement('Visitor(s):');

        $this->startDateFormRowElement = new StartDateFormRowElement('Start date:');
        $this->finishDateFormRowElement = new FinishDateFormRowElement('Finish date:');
        
        $this->useScccFormRowElement = new UseScccText();
        $this->getHTML();
    }

    private function getHTML(){
        $html = '';
        $html .= $this->prefix;

        $html .= $this->numPersonsFormRowElement->getHTML();

        $html .= '<div id="agesSelectorsContainer">';

        $html .= '<input id="ages" name= "ages" style="width: 100%" type="hidden" ">';

        $agesFormRowElement = new AgesFormRowElement('Age:', 0);
        $html .= $agesFormRowElement->getHTML();

        for($i=1; $i<7; $i++){
            $agesFormRowElement = new InvisibleAgesFormRowElement('Age:', $i);
            $html .= $agesFormRowElement->getHTML();
        }
        $html .= '</div>';

        $html .= $this->startDateFormRowElement->getHTML();
        $html .= $this->finishDateFormRowElement->getHTML();

        $html .= $this->useScccFormRowElement->getHTML(); 
        
        $sccRadioButtons = new SCCCRadioButtons('');

        $html .= $sccRadioButtons->getHTML();

        $formSubmitButton = new FormSubmitButton('Get Quote !');
        $html .= $formSubmitButton->getHTML();

        $html .= '<div class="fullwidth centered">Please, read insurance policy for all<br/>terms and conditions.</div>';


        //$phoneNumber = $phone_number = get_option( "phone_number", "" );
        //$phoneNumberHtmlElement = '<a href="tel:'.$phoneNumber.'" class="callUsPhoneNumberLink">'.$phoneNumber.'</a>';
        
        $html .= $this->postfix;
        echo $html;
    }
} 