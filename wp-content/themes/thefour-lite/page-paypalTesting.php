<?php
/*
 * Template Name: page pay pal testing
*/
get_header('noImage');

$GlobalTotalPremium = 1.3;
$GlobalPersonID = 666;

echo '<div>TOTAL PREMIUM: '.$GlobalTotalPremium.'</div>';
echo '<div>TEMP app id: '.$GlobalPersonID.'</div>';
echo '<div id="pageType" style="display: none;">medicalIssuesSelectionPage</div>';
echo '<div id="paymentResultCallbackPageUrl" style="display: none;">'.get_site_url().'/payment-complete-page</div>';

echo '<div class="centered" id="paypalButtonContainer">';

echo print_wp_cart_button_for_product($GlobalPersonID, $GlobalTotalPremium);
echo print_wp_shopping_cart();

echo '</div>';
get_footer();