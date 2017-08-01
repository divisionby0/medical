<?php
/*
Template Name: page person details
*/
get_header('noImage');

echo '<div id="pageType" style="display: none;">personDetailsPage</div>';
echo '<div id="personDataContainer" class="hidden"></div>';
?>

<h1 class="centered" id="personHeaderContainer">Your personal info</h1>
<h1 class="centered" id="confirmationHeaderContainer" style="display: none;">Please confirm your data</h1>
<div class="container" id="personDetailsContainer">
    <div class="row">
        <div class="col-sm-3"><b>First name:</b></div>
        <div class="col-sm-3 text-info" id="firstNameContainer">user first name</div>
    </div>

    <div class="row">
        <div class="col-sm-3"><b>Last name:</b></div>
        <div class="col-sm-3 text-info" id="lastNameContainer">user last name</div>
    </div>

    <div class="row">
        <div class="col-sm-3"><b>Gender:</b></div>
        <div class="col-sm-3 text-info" id="genderContainer">gender</div>
    </div>
    
    <div class="row">
        <div class="col-sm-3"><b>Date of birth:</b></div>
        <div class="col-sm-3 text-info" id="dateOfBirthContainer">date of birth</div>
    </div>
    <div class="row">
        <div class="col-sm-3"><b>Age:</b></div>
        <div class="col-sm-3 text-info" id="ageContainer">age</div>
    </div>
</div>

<div id="questionsPreloaderTextContainer" class="centered text-primary hidden">Loading questions. Please wait...</div>
<div id="questionsRootContainer"></div>

    <div style="float: right;">
        <span class="label label-danger hidden" id="userPersonalDataErrorText" style="float: right;">You have entered incorrect data. Please correct.</span>
        <br/>
        <button type="button" class="btn btn-success" id="nextButton" style="float: right; margin-left: 10px;">Next</button>
        <button type="button" class="btn btn-warning" id="prevButton" style="float: right;">Prev</button>
    </div>
<?php
get_footer();