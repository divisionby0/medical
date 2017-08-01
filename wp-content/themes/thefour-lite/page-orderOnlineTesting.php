<?php
/*
Template Name: page order online testing
*/

$fakeCompanyData = '{"companyName":"Allianz","companyId":"56","medicalDeclarationRequired":"true","benefit":50000,"rateTableGuid":"{\"id\":\"rates\",\"type\":\"Map\",\"ageFrom:0;ageTill:59;sccOption:1;mdr:0;premiumTable:scccMap;deductible:0\":\"{\\\"id\\\":\\\"id\\\",\\\"type\\\":\\\"Map\\\",\\\"ageFrom\\\":\\\"0\\\",\\\"ageTill\\\":\\\"59\\\",\\\"scco\\\":\\\"1\\\",\\\"mdr\\\":\\\"0\\\",\\\"premiumTable\\\":\\\"scccMap\\\",\\\"deductible\\\":\\\"0\\\"}\",\"ageFrom:0;ageTill:59;sccOption:0;mdr:0;premiumTable:scccMap;deductible:0\":\"{\\\"id\\\":\\\"id\\\",\\\"type\\\":\\\"Map\\\",\\\"ageFrom\\\":\\\"0\\\",\\\"ageTill\\\":\\\"59\\\",\\\"scco\\\":\\\"0\\\",\\\"mdr\\\":\\\"0\\\",\\\"premiumTable\\\":\\\"scccMap\\\",\\\"deductible\\\":\\\"0\\\"}\",\"ageFrom:60;ageTill:79;sccOption:1;mdr:1;premiumTable:scccMap;deductible:0\":\"{\\\"id\\\":\\\"id\\\",\\\"type\\\":\\\"Map\\\",\\\"ageFrom\\\":\\\"60\\\",\\\"ageTill\\\":\\\"79\\\",\\\"scco\\\":\\\"1\\\",\\\"mdr\\\":\\\"1\\\",\\\"premiumTable\\\":\\\"scccMap\\\",\\\"deductible\\\":\\\"0\\\"}\",\"ageFrom:60;ageTill:79;sccOption:0;mdr:0;premiumTable:scccMap;deductible:0\":\"{\\\"id\\\":\\\"id\\\",\\\"type\\\":\\\"Map\\\",\\\"ageFrom\\\":\\\"60\\\",\\\"ageTill\\\":\\\"79\\\",\\\"scco\\\":\\\"0\\\",\\\"mdr\\\":\\\"0\\\",\\\"premiumTable\\\":\\\"scccMap\\\",\\\"deductible\\\":\\\"0\\\"}\",\"ageFrom:80;ageTill:89;sccOption:1;mdr:1;premiumTable:scccMap;deductible:0\":\"{\\\"id\\\":\\\"id\\\",\\\"type\\\":\\\"Map\\\",\\\"ageFrom\\\":\\\"80\\\",\\\"ageTill\\\":\\\"89\\\",\\\"scco\\\":\\\"1\\\",\\\"mdr\\\":\\\"1\\\",\\\"premiumTable\\\":\\\"scccMap\\\",\\\"deductible\\\":\\\"0\\\"}\",\"ageFrom:80;ageTill:89;sccOption:0;mdr:0;premiumTable:scccMap;deductible:0\":\"{\\\"id\\\":\\\"id\\\",\\\"type\\\":\\\"Map\\\",\\\"ageFrom\\\":\\\"80\\\",\\\"ageTill\\\":\\\"89\\\",\\\"scco\\\":\\\"0\\\",\\\"mdr\\\":\\\"0\\\",\\\"premiumTable\\\":\\\"scccMap\\\",\\\"deductible\\\":\\\"0\\\"}\"}","deductiblesCosts":"{\"0\":4.96,\"100\":4.712,\"250\":4.464,\"1000\":3.968,\"3000\":3.472,\"id\":\"deductiblesCosts\",\"type\":\"Map\"}"}';
Cookie::setSelectedCompanyData($fakeCompanyData);

get_header('noImage');
echo '<div id="pageType" style="display: none;">orderOnlinePageTesting</div>';

echo '<div id="companyData">'.stripslashes(Cookie::getSelectedCompanyData()).'</div>';

?>

<?php
get_footer();