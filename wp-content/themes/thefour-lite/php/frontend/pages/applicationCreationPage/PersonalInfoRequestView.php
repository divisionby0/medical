<?php

class PersonalInfoRequestView
{
    private $person;
    private $backgroundColor;
    private $relationshipElementHtml;
    private $isFirst;

    public function __construct(Person $person, $backgroundColor, $useRelationship, $isFirst){
        $this->person = $person;
        $this->backgroundColor = $backgroundColor;

        $this->isFirst = $isFirst;

        if($useRelationship){
            $this->relationshipElementHtml =  $this->getRelationshipInput();
        }
        else{
            $this->relationshipElementHtml = "";
        }

        $this->create();
    }

    private function create(){

        $headerText = $this->person->getAge();
        if($this->isFirst){
            //$headerText .= " (Primary)";
            $headerText .= " (".Constants::$primary.")";
        }

        echo '<div class="fullWidth" style="margin-bottom:10px;">
                <div class="container centered bg-info" style="max-width: 100% !important;"><b>Person age '.$headerText.'</b></div>
                <div class="container" style="border:1px solid #ddd; max-width: 100% !important;">
                    <!-- first name -->
                    <div class="row" id="firstNameRow_'.$this->person->getAge().'">
                        <div style="padding-top:10px;"></div>
                        <div class="col-xs-4"><b>First name:</b></div>
                        <div class="col-xs-8 text-info" style="padding-bottom:4px;" id="firstNameContainer_'.$this->person->getAge().'">
                            <input id="firstname_'.$this->person->getAge().'" class="form-control input-group-lg reg_name" type="text" name="firstname"
                                   title="Enter first name"
                                   placeholder="First name"
                                   style="display: block; float: left; width: 100%; color:black !important; font-weight:bold !important;"/>
                                   <span id="firstNameError_'.$this->person->getAge().'" class="glyphicon glyphicon-remove form-control-feedback hidden" style="margin-top:-6px; margin-right:6px;"></span>
                        </div>
                    </div>
                    
                    <!-- last name -->
                    <div class="row" id="lastNameRow_'.$this->person->getAge().'">
                        <div class="col-xs-4"><b>Last name:</b></div>
                        <div class="col-xs-8 text-info" id="lastNameContainer_'.$this->person->getAge().'">
                            <input id="lastname_'.$this->person->getAge().'" class="form-control input-group-lg reg_name" type="text" name="lastname"
                                   title="Enter last name"
                                   placeholder="Last name"
                                   style="display: block; float: left; width: 100%; color:black !important; font-weight:bold !important;"/>
                                   <span id="lastNameError_'.$this->person->getAge().'" class="glyphicon glyphicon-remove form-control-feedback hidden" style="margin-top:-6px; margin-right:6px;"></span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4"><b>Gender:</b></div>
                        <div class="col-xs-8 text-info" id="genderContainer" style="padding-top: 4px;">
                            <select id="genderSelect_'.$this->person->getAge().'" name="genderSelect_'.$this->person->getAge().'">
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                        </div>
                    </div>';

                    echo $this->relationshipElementHtml;

                    echo '<div class="row" id="birthdayRow_'.$this->person->getAge().'">
                        <div class="col-xs-4"><b>Birthday:</b></div>
                        <div class="col-xs-8 text-info" style="padding-bottom:4px; padding-top: 4px;" id="birthdayContainer_'.$this->person->getAge().'">
                            <input id="dateOfBirthSelect_'.$this->person->getAge().'"
                                   name="dateOfBirthSelect"
                                   class="form-control input-group-lg"
                                   placeholder="Click to pick date of birth"
                                   readonly="true">
                                   <span id="birthdayError_'.$this->person->getAge().'" class="glyphicon glyphicon-remove form-control-feedback hidden" style="margin-top:-2px; margin-right:6px;"></span>
                        </div>
                    </div>';

                    echo '<div style="padding-bottom:10px;"></div></div></div>';
    }

    private function getRelationshipInput(){
        return '<div class="row">
                        <div class="col-xs-4"><b>Relationship:</b></div>
                        <div class="col-xs-8 text-info" style="padding-top:4px;" id="relationshipContainer">
                            <input id="relationship_'.$this->person->getAge().'" class="form-control input-group-lg reg_name" type="text" name="relationship"
                                   title="Enter relationship"
                                   placeholder="Child, wife, etc"
                                   style="display: block; float: left; width: 100%;"/>
                        </div>
                    </div>';
    }
}