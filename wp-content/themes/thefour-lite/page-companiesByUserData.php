<?php
/*
Template Name: CompaniesByUserData
*/

$state = 'normal';
$savedFormData = Cookie::getUserInputFormData();

$formData = null;

$selectedBenefit = SelectedBenefit::get();

if($state!='error' && isset($savedFormData)){

    $savedFormData = StringUtil::unquote($savedFormData);
    $formData = json_decode($savedFormData);

    // http://stackoverflow.com/questions/18576762/php-stdclass-to-array
    $formData = json_decode(json_encode($formData), true);

    $formData["benefit"] = $selectedBenefit;
    Cookie::setUserInputFormData(json_encode($formData));
}
else{
    $state = 'error';
}

get_header('noImage');

echo '<div id="formData" style="display: none;">'.json_encode($formData).'</div>';
echo '<div id="pageType" style="display: none;">companiesTablePage</div>';

if($state == 'normal'){
    createPage($formData);
}
else{
    get_template_part( 'template-parts/content', 'errorParsingForm' );
}

function updateBenefitSavedData($savedBenefit){
    $formData["benefit"] = $savedBenefit;
    Cookie::setUserInputFormData(json_encode($formData));
}

function createPage($formData){
    $ages = $formData["ages"];

    //sort($ages);

    $agesString = implode(',',$ages);
    
    $useScccFormData = $formData["useSccc"];
    
    $medicalConditionRemark = new MedicalConditionRemark();
    $medicalConditionRemark = $medicalConditionRemark->create($useScccFormData);

    $benefit = $formData["benefit"];
    //$benefit = number_format($benefit, 0, ',', ' ');
    //$benefit = StringUtil::formatMoneyDivisional($benefit);

    $benefit = StringUtil::formatMoneyInt($benefit);

    get_template_part('template-parts/result', 'sendQuoteToEmail');

    echo '<div id="resultPageContent">';

    echo '<div class="userDataSelectionInfoContainer"><span style="margin-left: 20px;">Age(s):'.$agesString.'</span><span style="margin-left: 20px;">    Benefit: '.$benefit.'</span><span style="margin-left: 20px;">    Period:'.$formData["totalDays"].' day(s)</span><span style="margin-left: 20px;">  '.$medicalConditionRemark.'</span></div>';

    $getCompanies = new GetCompanies();
    $companiesDataProvider = $getCompanies->execute(); // Map

    // все расчеты по family rate происходят в JS
    new ResultTable($companiesDataProvider);
    echo '</div>';
}

get_footer();




