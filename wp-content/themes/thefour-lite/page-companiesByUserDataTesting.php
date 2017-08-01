<?php
/*
Template Name: CompaniesByUserData_Testing
*/
echo '<div id="resultTablePageTesting" style="display: none;">companiesTablePageTesting</div>';

$data = '{"numPersons":"1","ages":[50, 18, 20],"startDate":{"date":"2017-03-14 00:00:00.000000","timezone_type":3,"timezone":"UTC"},"finishDate":{"date":"2017-03-30 00:00:00.000000","timezone_type":3,"timezone":"UTC"},"totalDays":17,"useSccc":"Yes","benefit":"100000"}';

$savedFormData = StringUtil::unquote($data);
$formData = json_decode($savedFormData);

// http://stackoverflow.com/questions/18576762/php-stdclass-to-array
$formData = json_decode(json_encode($formData), true);

$formData["benefit"] = 100000;
Cookie::setBenefit(100000);
Cookie::setUserInputFormData(json_encode($formData));

get_header('noImage');

?>
<div id="formData" style="display: none;">{"numPersons":"1","ages":[50],"startDate":{"date":"2017-03-14 00:00:00.000000","timezone_type":3,"timezone":"UTC"},"finishDate":{"date":"2017-03-30 00:00:00.000000","timezone_type":3,"timezone":"UTC"},"totalDays":17,"useSccc":"Yes","benefit":"100000"}</div>
<form action="/companies-by-user-data" method="post" id="benefitSelectionForm">
    <input id="selectedBenefit" value="100000">
    <button class="btn btn-default" id="navigateButton">navigate</button>
</form>


<?php
get_footer();