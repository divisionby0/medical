<?php
/*
 * Template Name: page pay pal testing
*/

$GlobalTotalPremium = 1.3;
$GlobalProductID = 666;

$_POST['price'] = $GlobalTotalPremium;
$_POST['wspsc_product'] = $GlobalProductID;
clearCart();
hookCartDataCaching();

get_header('noImage');
addToCart();

echo '<div>TOTAL PREMIUM: '.$GlobalTotalPremium.'</div>';
echo '<div>TEMP app id: '.$GlobalProductID.'</div>';
echo '<div id="pageType" style="display: none;">medicalIssuesSelectionPage</div>';
echo '<div id="paymentResultCallbackPageUrl" style="display: none;">'.get_site_url().'/payment-complete-page</div>';

echo '<div class="centered" id="paypalButtonContainer">';

echo "<a href='#' id='checkOutButton'>Check out this at the PayPal</a>";
echo print_wp_cart_button_for_product($GlobalProductID, $GlobalTotalPremium);

echo print_wp_shopping_cart();

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

echo '</div>';
get_footer();