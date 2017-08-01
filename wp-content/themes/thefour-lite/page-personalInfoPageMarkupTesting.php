<?php
/*
Template Name: personalInfoPageMarkupTesting
*/
get_header('noImage');
?>
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
                <div class="container">
                    <div class="row">
                        <h3 class="centered">Person age 50</h3>
                        <div class="col-xs-4"><b>First name:</b></div>
                        <div class="col-xs-6 text-info" id="firstNameContainer">
                            <input id="firstname" class="form-control input-group-lg reg_name" type="text" name="firstname"
                                   title="Enter first name"
                                   placeholder="First name"
                                   style="display: block; float: left; width: 100%;"/>
                        </div>
                        <div class="col-xs-6">
                            <span class="label label-danger hidden" id="firstNameErrorText" style="display: block; float: left;">First name incorrect. Must be at least 1 character.</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4"><b>Last name:</b></div>
                        <div class="col-xs-6 text-info" id="lastNameContainer">
                            <input id="lastname" class="form-control input-group-lg reg_name" type="text" name="lastname"
                                   title="Enter last name"
                                   placeholder="Last name"
                                   style="display: block; float: left; width: 100%;"/>
                        </div>
                        <div class="col-xs-6">
                            <span class="label label-danger hidden" id="lastNameErrorText">Last name incorrect. Must be at least 1 character.</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4"><b>Gender:</b></div>
                        <div class="col-xs-6 text-info" id="genderContainer">
                            <select id="genderSelect" name="genderSelect">
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4"><b>Birthday:</b></div>
                        <div class="col-xs-6 text-info" id="startDateContainer">
                            <input id="dateOfBirthSelect"
                                   name="dateOfBirthSelect"
                                   class=""
                                   placeholder="pick your date of birth"
                                   readonly="true">
                        </div>
                        <div class="col-xs-6">
                            <span class="label label-danger hidden" id="dateOfBirthErrorText" style="display: block; float: left;">Date of birth incorrect. Cannot be empty.</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-sm-6">
                <div class="container">
                    <div class="row">
                        <h3 class="centered">Person age 18</h3>
                        <div class="col-xs-4"><b>First name:</b></div>
                        <div class="col-xs-6 text-info" id="firstNameContainer">
                            <input id="firstname" class="form-control input-group-lg reg_name" type="text" name="firstname"
                                   title="Enter first name"
                                   placeholder="First name"
                                   style="display: block; float: left; width: 100%;"/>
                        </div>
                        <div class="col-xs-6">
                            <span class="label label-danger hidden" id="firstNameErrorText" style="display: block; float: left;">First name incorrect. Must be at least 1 character.</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4"><b>Last name:</b></div>
                        <div class="col-xs-6 text-info" id="lastNameContainer">
                            <input id="lastname" class="form-control input-group-lg reg_name" type="text" name="lastname"
                                   title="Enter last name"
                                   placeholder="Last name"
                                   style="display: block; float: left; width: 100%;"/>
                        </div>
                        <div class="col-xs-6">
                            <span class="label label-danger hidden" id="lastNameErrorText">Last name incorrect. Must be at least 1 character.</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4"><b>Gender:</b></div>
                        <div class="col-xs-6 text-info" id="genderContainer">
                            <select id="genderSelect" name="genderSelect">
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4"><b>Birthday:</b></div>
                        <div class="col-xs-6 text-info" id="startDateContainer">
                            <input id="dateOfBirthSelect"
                                   name="dateOfBirthSelect"
                                   class=""
                                   placeholder="pick your date of birth"
                                   readonly="true">
                        </div>
                        <div class="col-xs-6">
                            <span class="label label-danger hidden" id="dateOfBirthErrorText" style="display: block; float: left;">Date of birth incorrect. Cannot be empty.</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4">Relationship:</div>
                        <div class="col-xs-6 text-info" id="relationshipContainer">
                            <input id="relationship" class="form-control input-group-lg reg_name" type="text" name="relationship"
                                   title="Enter relationship"
                                   placeholder="relationship"
                                   style="display: block; float: left; width: 100%;"/>
                        </div>
                    </div>

                </div>
            </div>

            <div class="col-sm-6">
                <div class="container">
                    <div class="row">
                        <h3 class="centered">Person age 20</h3>
                        <div class="col-xs-4"><b>First name:</b></div>
                        <div class="col-xs-6 text-info" id="firstNameContainer">
                            <input id="firstname" class="form-control input-group-lg reg_name" type="text" name="firstname"
                                   title="Enter first name"
                                   placeholder="First name"
                                   style="display: block; float: left; width: 100%;"/>
                        </div>
                        <div class="col-xs-6">
                            <span class="label label-danger hidden" id="firstNameErrorText" style="display: block; float: left;">First name incorrect. Must be at least 1 character.</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4"><b>Last name:</b></div>
                        <div class="col-xs-6 text-info" id="lastNameContainer">
                            <input id="lastname" class="form-control input-group-lg reg_name" type="text" name="lastname"
                                   title="Enter last name"
                                   placeholder="Last name"
                                   style="display: block; float: left; width: 100%;"/>
                        </div>
                        <div class="col-xs-6">
                            <span class="label label-danger hidden" id="lastNameErrorText">Last name incorrect. Must be at least 1 character.</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4"><b>Gender:</b></div>
                        <div class="col-xs-6 text-info" id="genderContainer">
                            <select id="genderSelect" name="genderSelect">
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4"><b>Birthday:</b></div>
                        <div class="col-xs-6 text-info" id="startDateContainer">
                            <input id="dateOfBirthSelect"
                                   name="dateOfBirthSelect"
                                   class=""
                                   placeholder="pick your date of birth"
                                   readonly="true">
                        </div>
                        <div class="col-xs-6">
                            <span class="label label-danger hidden" id="dateOfBirthErrorText" style="display: block; float: left;">Date of birth incorrect. Cannot be empty.</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4">Relationship:</div>
                        <div class="col-xs-6 text-info" id="relationshipContainer">
                            <input id="relationship" class="form-control input-group-lg reg_name" type="text" name="relationship"
                                   title="Enter relationship"
                                   placeholder="relationship"
                                   style="display: block; float: left; width: 100%;"/>
                        </div>
                    </div>

                </div>
            </div>

            <!--
            <div class="col-sm-6">
                <div class="container">
                    <div class="row">
                        <h3 class="centered">Person age 18</h3>
                        <div class="col-sm-4">First name:</div>
                        <div class="col-sm-8 text-info" id="firstNameContainer">
                            <input id="firstname" class="form-control input-group-lg reg_name" type="text" name="firstname"
                                   title="Enter first name"
                                   placeholder="First name"
                                   style="display: block; float: left; width: 100%;"/>
                        </div>
                        <div class="col-sm-3">
                            <span class="label label-danger hidden" id="firstNameErrorText" style="display: block; float: left;">First name incorrect. Must be at least 1 character.</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">Last name:</div>
                        <div class="col-sm-8 text-info" id="lastNameContainer">
                            <input id="lastname" class="form-control input-group-lg reg_name" type="text" name="lastname"
                                   title="Enter last name"
                                   placeholder="Last name"
                                   style="display: block; float: left; width: 100%;"/>
                        </div>
                        <div class="col-sm-3">
                            <span class="label label-danger hidden" id="lastNameErrorText">Last name incorrect. Must be at least 1 character.</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-4">Gender:</div>
                        <div class="col-sm-8 text-info" id="genderContainer">
                            <select id="genderSelect" name="genderSelect">
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-4">Date of birth:</div>
                        <div class="col-sm-8 text-info" id="startDateContainer">
                            <input id="dateOfBirthSelect"
                                   name="dateOfBirthSelect"
                                   class=""
                                   placeholder="pick your date of birth"
                                   readonly="true">
                        </div>
                        <div class="col-sm-3">
                            <span class="label label-danger hidden" id="dateOfBirthErrorText" style="display: block; float: left;">Date of birth incorrect. Cannot be empty.</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-4">Relationship:</div>
                        <div class="col-sm-8 text-info" id="relationshipContainer">
                            <input id="relationship" class="form-control input-group-lg reg_name" type="text" name="relationship"
                                   title="Enter relationship"
                                   placeholder="relationship"
                                   style="display: block; float: left; width: 100%;"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-6">
                <div class="container">
                    <div class="row">
                        <h3 class="centered">Person age 20</h3>
                        <div class="col-sm-4"><b>First name:</b></div>
                        <div class="col-sm-8 text-info" id="firstNameContainer">
                            <input id="firstname" class="form-control input-group-lg reg_name" type="text" name="firstname"
                                   title="Enter first name"
                                   placeholder="First name"
                                   style="display: block; float: left; width: 100%;"/>
                        </div>
                        <div class="col-sm-3">
                            <span class="label label-danger hidden" id="firstNameErrorText" style="display: block; float: left;">First name incorrect. Must be at least 1 character.</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4"><b>Last name:</b></div>
                        <div class="col-sm-8 text-info" id="lastNameContainer">
                            <input id="lastname" class="form-control input-group-lg reg_name" type="text" name="lastname"
                                   title="Enter last name"
                                   placeholder="Last name"
                                   style="display: block; float: left; width: 100%;"/>
                        </div>
                        <div class="col-sm-3">
                            <span class="label label-danger hidden" id="lastNameErrorText">Last name incorrect. Must be at least 1 character.</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-4"><b>Gender:</b></div>
                        <div class="col-sm-8 text-info" id="genderContainer">
                            <select id="genderSelect" name="genderSelect">
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-4"><b>Date of birth:</b></div>
                        <div class="col-sm-8 text-info" id="startDateContainer">
                            <input id="dateOfBirthSelect"
                                   name="dateOfBirthSelect"
                                   class=""
                                   placeholder="pick your date of birth"
                                   readonly="true">
                        </div>
                        <div class="col-sm-3">
                            <span class="label label-danger hidden" id="dateOfBirthErrorText" style="display: block; float: left;">Date of birth incorrect. Cannot be empty.</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-4"><b>Relationship:</b></div>
                        <div class="col-sm-8 text-info" id="relationshipContainer">
                            <input id="relationship" class="form-control input-group-lg reg_name" type="text" name="relationship"
                                   title="Enter relationship"
                                   placeholder="relationship"
                                   style="display: block; float: left; width: 100%;"/>
                        </div>
                    </div>
                </div>
            </div>
            -->
        </div>
    </div>

<?php
get_footer();
