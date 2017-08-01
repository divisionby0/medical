<?php
/*
Template Name: application creation page
*/
get_header('noImage');

$colors = array("#fce3e3", "#fce3fc", "#e5e3fc", "#e3fcf2", "#fcfce3", "#fcf6e3");

$savedFormData = Cookie::getUserInputFormData();
$formData = null;

$savedFormData = StringUtil::unquote($savedFormData);
$formData = json_decode($savedFormData);

// http://stackoverflow.com/questions/18576762/php-stdclass-to-array
$formData = json_decode(json_encode($formData), true);

$ages = $formData['ages'];
$useSCCC = $formData['useSccc'];
$benefit = $formData['benefit'];

// disable sort by age
//arsort($ages, SORT_NUMERIC);

$startDate = $formData['startDate']["date"];
$finishDate = $formData['finishDate']["date"];

$startDate = explode(" ", $startDate)[0];
$finishDate = explode(" ", $finishDate)[0];

$period = Cookie::getPeriod();

echo '<div id="pageType" style="display: none;">applicationCreationPage</div>';
echo '<div id="agesCollectionContainer" style="display: none;">';
echo json_encode($ages);
echo '</div>';

$selectedCompanyData = Cookie::getSelectedCompanyData();
$selectedCompanyData = StringUtil::unquote($selectedCompanyData);
$selectedCompanyData = json_decode($selectedCompanyData);

$companyId = $selectedCompanyData->companyId;
$companyRateTableGuideData = get_post_meta( $companyId, Constants::$ratesGuides, true );

echo '<div id="companyRateTableGuide" style="display: none;">';
echo $companyRateTableGuideData;
echo '</div>';

// You choose
new SelectedCompanyDataView();

echo '<h3 class="centered bg-info">Application</h3>';

createInsuredsHeader();

function createInsuredsHeader(){
    echo '<h3 class="centered bg-info">Insureds</h3>';
}
echo '<div>';

$useRelationship = false;
$firstAge = $ages[0];
$colorIndex = 0;

$isFirst = false;

if(!isset($ages)){
    get_template_part( 'template-parts/content', 'errorParsingForm' );
    return;
}

foreach($ages as $age){
    $person = new Person($age,$age, $useSCCC, $benefit);

    $isFirst = $age == $firstAge;
    $useRelationship = !$isFirst;

    $backgroundColor = $colors[$colorIndex];
    createPersonInfoRequestView($person, $backgroundColor, $useRelationship, $isFirst);
    $colorIndex++;
}
echo '</div>';

function createPersonInfoRequestView($person, $backgroundColor, $useRelationship, $isFirst){
    new PersonalInfoRequestView($person, $backgroundColor, $useRelationship, $isFirst);
}

$personsAdditionalDateRequestView = new PersonsAdditionalDataRequestView($startDate, $finishDate, $period);
echo $personsAdditionalDateRequestView->getHtml();

?>
    <div style="float: right;">
        <span class="label label-danger hidden" id="userPersonalDataErrorText" style="float: right;">You have entered incorrect data. Please correct.</span>
        <br/>
        <button type="button" class="btn btn-success" id="nextButton" style="float: right; margin-left: 10px;">Next</button>
        <button type="button" class="btn btn-warning" id="prevButton" style="float: right;">Prev</button>
    </div>
<?php

get_footer();