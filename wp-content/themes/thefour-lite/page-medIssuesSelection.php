<?php
/*
 * Template Name: page medical issues selection
*/

$selectedCompany = Cookie::getSelectedCompanyData();
$data = StringUtil::unquote($selectedCompany);
$companyData = json_decode($data);

// http://stackoverflow.com/questions/18576762/php-stdclass-to-array
$companyData = json_decode(json_encode($companyData), true);

$selectedPlanData = Cookie::getSelectedCompanyPlan();
$data = StringUtil::unquote($selectedPlanData);
$decodedPlanData = json_decode($data);
$decodedPlanData = json_decode(json_encode($decodedPlanData), true);

$planCost = $decodedPlanData['cost'];

//$GlobalTotalPremium = $planCost;
//global $GloblaPersonID;

$_POST['price'] = $planCost;
$_POST['wspsc_product'] = $companyData["companyName"].'___productId_'.Cookie::getQuoteId();

clearCart();

hookCartDataCaching();

get_header('noImage');
addToCart();

echo '<div id="pageType" style="display: none;">medicalIssuesSelectionPage</div>';
echo '<div id="paymentResultCallbackPageUrl" style="display: none;">'.get_site_url().'/payment-complete-page</div>';
new UserSelectionFinishPageView();

$GlobalPersonID = $GlobalPersonID." ".Cookie::getQuoteId();
echo '<div id="applicationIdContainer1" style="display: none;">'.Cookie::getQuoteId().'</div>';
echo '<div class="centered"><h1>Please select</h1><label class="radio-inline"><input type="radio" name="medIssuesRadioGroup" value="0" checked>I have no medical issues</label><label class="radio-inline"><input type="radio" name="medIssuesRadioGroup" value="1">I have medical issues</label></div>';
echo '<div style="float: right;"><button type="button" class="btn btn-success" id="finishButton" style="float: right; margin-left: 10px; display: none;">Proceed to payment</button>        <button type="button" class="btn btn-warning" id="prevButton" style="float: right;">Prev</button></div>';
echo '<div class="centered" id="paypalButtonContainer">';

echo "<a href='#' id='checkOutButton'>Pay Now !</a>";
echo print_wp_cart_button_for_product(Cookie::getQuoteId(), $planCost);

echo print_wp_shopping_cart();

echo '</div>';

echo '<script type="application/javascript">
console.log("@@@@@@@@@@@@@@@@@@");

jQuery(document).ready(function($) {
        $("#checkOutButton").click(onCheckOutButtonClicked);
        
        function onCheckOutButtonClicked(){
            console.log("onCheckOutButtonClicked");
            executeAjaxCall();
        }
        
        function executeAjaxCall(){
            var data = {
                \'action\': \'redirectToPayPalCheckOut\'
            };
    
            // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
            jQuery.post(ajaxurl, data, function(response) {
                window.location.href = response;
            });
        }
	});


</script>';

get_footer();