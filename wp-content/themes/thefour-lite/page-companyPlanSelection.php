<?php
/*
Template Name: Company plan selection
*/

get_header('noImage');

echo '<div id="pageType" style="display: none;">companyPlanSelection</div>';

$selectedCompany = Cookie::getSelectedCompanyData();
$data = StringUtil::unquote($selectedCompany);
$companyData = json_decode($data);

// http://stackoverflow.com/questions/18576762/php-stdclass-to-array
$companyData = json_decode(json_encode($companyData), true);

$companyName = $companyData['companyName'];
$costsData = $companyData['deductiblesCosts'];
$mapDecoder = new MapJsonDecoder($costsData);
$costs = $mapDecoder->decode();

new CompanyCostsView($companyName, $costs);

echo "<div class='benefitsSelectionPageContentContainer'>";
new DeductibleSelectionPageTextContent();
echo "</div>";
get_footer();
