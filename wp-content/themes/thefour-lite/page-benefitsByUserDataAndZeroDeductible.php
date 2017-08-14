<?php
/*
Template Name: BenefitsByUSerDataAndZeroDeductible
*/
global $totalDays;
global $allBenefits;
$formDataParser = null;
$formData = null;

$state = 'normal';
try{
    $formDataParser = new ParseSubmittedFormData();
    $formData = $formDataParser->getData();
}
catch(Exception $exception){
    // no form data - need to check cookie for actual information
    $savedData = Cookie::getUserInputFormData();
    $savedFormData = Cookie::getUserInputFormData();

    $savedFormData = StringUtil::unquote($savedFormData);
    $formData = json_decode($savedFormData);
    $formData = json_decode(json_encode($formData), true);

    $startDate = $formData['startDate']["date"];
    $finishDate = $formData['finishDate']["date"];

    if(!isset($formData)){
        $state = 'error';
    }
}

if($state == 'normal'){
    $totalDays = $formData["totalDays"];

    $encodedFormData = json_encode($formData);

    $dataSaved = Cookie::setUserInputFormData($encodedFormData);

    $companiesBenefits = new CompaniesBenefits();
    $allBenefits = $companiesBenefits->getAll();
}

get_header('noImage');

echo '<div id="formData" style="display: none;">'.json_encode($formData).'</div>';
echo '<div id="baseUrl" style="display: none;">'.site_url().'</div>';
echo '<div id="pageType" style="display: none;">benefitsByUserDataAndZeroDeductiblePage</div>';
//$ages = json_decode(stripslashes($formData["ages"]));

if($state == 'normal'){
    createPage($formData);
}
else{
    get_template_part( 'template-parts/content', 'errorParsingForm' );
}

function createPage($formData){

    global $totalDays;
    global $allBenefits;
    $ages = $formData["ages"];
    
    //sort($ages);

    $agesString = createAgesString($ages);
    $useScccFormData = $formData["useSccc"];
    
    $medicalConditionRemark = new MedicalConditionRemark();
    $medicalConditionRemark = $medicalConditionRemark->create($useScccFormData);

    $benefit = $formData["benefit"];
    $benefit = number_format($benefit, 0, ',', ' ');

    echo '<div class="userDataSelectionInfoContainer"><span style="margin-left: 20px;">Age(s): '.$agesString.'</span><span style="margin-left: 20px;">Period: '.$totalDays.' day(s)</span><span style="margin-left: 20px;">'.$medicalConditionRemark.'</span></div>';

    echo '<h3 class="centered benefitsSelectionPageFormHeader" style="width: 50%;">Please select benefit</h3>';

    echo "<div class='benefitsSelectionPageContentContainer'>";

    $getCompanies = new GetCompaniesCalculationsDataOnly();
    $companiesDataProvider = $getCompanies->execute(); // Map

    // iterate companies
    // iterate each company coverage
    $companiesIterator = $companiesDataProvider->getIterator();
    while($companiesIterator->hasNext()){
        $company = $companiesIterator->next();
        $company->calculateEachBenefitZeroDeductibleCostByUserData($totalDays, $ages, $useScccFormData);
    }

    $benefitsByZeroDeductible = getCompaniesBenefitsByZeroDeductible($allBenefits, $companiesDataProvider);
    $benefitsByZeroDeductible = BenefitsSorter::sortByBenefit($benefitsByZeroDeductible);

    new BenefitSelectionForm($benefitsByZeroDeductible);
    echo "</div>";
    echo "<div class='benefitsSelectionPageContentContainer'>";
    new BenefitsSelectionPageTextContent();
    echo "</div>";
    showPrevButton();
}

function getCompaniesBenefitsByZeroDeductible(Map $allBenefits, $companiesDataProvider){
    global $totalDays;
    $filteredBenefits = new Map('companiesBenefitsByZeroDeductible');

    $allBenefitsIterator = $allBenefits->getIterator();

    $defaultBenefitLowestCost = 100000;

    while($allBenefitsIterator->hasNext()){
        $companyBenefitsData = $allBenefitsIterator->next();

        $mapJsonDecoder = new MapJsonDecoder($companyBenefitsData);
        $companyBenefits = $mapJsonDecoder->decode();

        $companyBenefitsIterator = $companyBenefits->getIterator();
        while($companyBenefitsIterator->hasNext()){
            $benefit = $companyBenefitsIterator->next();
            //Logger::logMessage('benefit: '.$benefit);
            $filteredBenefits->add($benefit, $benefit);
        }
    }

    $benefitsIterator = $filteredBenefits->getIterator();
    while($benefitsIterator->hasNext()){
        $benefit = $benefitsIterator->next();
        if($benefit!='Map'){
            //Logger::logMessage("<b>Calculating lowest cost by zero deductible for benefit: ".$benefit.'</b>');
            $selectedBenefitLowestCost = $defaultBenefitLowestCost;

            $companiesIterator = $companiesDataProvider->getIterator();
            while($companiesIterator->hasNext()){
                $company = $companiesIterator->next();
                //Logger::logMessage("Company ".$company->getName());
                $benefitZeroDeductibleCost = $company->getBenefitZeroDeductibleCost($benefit);

                //Logger::logMessage('$benefit='.$benefit.'  ZeroDeductibleCost='.$benefitZeroDeductibleCost);

                if(is_array($benefitZeroDeductibleCost)){
                    $benefitZeroDeductibleCost = $benefitZeroDeductibleCost[0];

                    //Logger::logMessage("parsed benefitZeroDeductibleCost=".$benefitZeroDeductibleCost);

                    if(!is_nan($benefitZeroDeductibleCost) && $benefitZeroDeductibleCost!=0){
                        //Logger::logMessage("benefitZeroDeductibleCost =".$benefitZeroDeductibleCost.' $selectedBenefitLowestCost='.$selectedBenefitLowestCost);
                        //Logger::logMessage("benefitZeroDeductibleCost =".$benefitZeroDeductibleCost);
                        //Logger::logMessage("Company ".$company->getName().' benefit: '.$benefit.'  benefitZeroDeductibleCost=');
                        //var_dump($benefitZeroDeductibleCost);
                        if($benefitZeroDeductibleCost < $selectedBenefitLowestCost){
                            $selectedBenefitLowestCost = $benefitZeroDeductibleCost;
                        }
                    }
                }
                else{
                    //Logger::logError("Company ".$company->getName().' benefit: '.$benefit.'  benefitZeroDeductibleCost is non a number. value is '.$benefitZeroDeductibleCost);
                }
            }

            //Logger::logMessage('selectedBenefitLowestCost='.$selectedBenefitLowestCost.' $defaultBenefitLowestCost='.$defaultBenefitLowestCost);
            if($defaultBenefitLowestCost == $selectedBenefitLowestCost){
                $lowestCost = -1;
            }
            else{
                $lowestCost = $selectedBenefitLowestCost/1000*$totalDays;
            }
            $filteredBenefits->add($benefit, $lowestCost);
        }
    }

    $filteredBenefits = removeNegativeCosts($filteredBenefits);

    return $filteredBenefits;
}

function removeNegativeCosts(Map $collection){
    $updatedMap = new Map($collection->getId());

    $keys = $collection->getKeys();
    foreach($keys as $key){
        if($key!='Map'){
            $value = $collection->get($key);
            if(intval($value)>0){
                $updatedMap->add($key, $value);
            }
        }
    }
    return $updatedMap;
}

function createAgesString($ages){
    return implode(',',$ages);
}

function showPrevButton(){
    echo '<div style="float: right; padding-top: 20px;">
        <button type="button" class="btn btn-warning" id="prevButton" style="float: right;">Prev</button>
    </div>';
}
get_footer();