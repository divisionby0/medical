<?php
/*
Template Name: page medical issues selection
*/

/*
	»»»
	»»»
	»»»
*/
global $GlobalTotalPremium;
global $GloblaPersonID;
/*
	»»»
	»»»
	»»»
*/

get_header('noImage');
echo '<div id="pageType" style="display: none;">medicalIssuesSelectionPage</div>';
echo '<div id="paymentResultCallbackPageUrl" style="display: none;">'.get_site_url().'/payment-complete-page</div>';
new UserSelectionFinishPageView();
//echo '<div id="applicationIdContainer"></div>';

//	»»» get the QuoteID
$GlobalPersonID = $GlobalPersonID." ".Cookie::getQuoteId();

echo '<div id="applicationIdContainer1">'.Cookie::getQuoteId().'</div>';
echo '<div class="centered"><h1>Please select</h1><label class="radio-inline"><input type="radio" name="medIssuesRadioGroup" value="0" checked>I have no medical issues</label>
<label class="radio-inline"><input type="radio" name="medIssuesRadioGroup" value="1">I have medical issues</label></div>';

echo '<div style="float: right;">
        <button type="button" class="btn btn-success" id="finishButton" style="float: right; margin-left: 10px; display: none;">Proceed to payment</button>
        <button type="button" class="btn btn-warning" id="prevButton" style="float: right;">Prev</button>
</div>';

echo '<div class="centered" id="paypalButtonContainer">';
echo 'PayPal button container';

//	»»» display the cart button with givien parameters
echo print_wp_cart_button_for_product($GlobalPersonID, $GlobalTotalPremium);
//	»»» display the shopping cart content
echo print_wp_shopping_cart();
echo '</div>';
get_footer();