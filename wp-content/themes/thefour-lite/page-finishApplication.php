<?php
/*
Template Name: page finish application
*/
get_header('noImage');
echo '<div id="pageType" style="display: none;">applicationFinishPage</div>';
echo '<div id="cardholderName" style="display: none;">'.$_POST["cardholderNameInput"].'</div>';
echo '<div id="cardNumber" style="display: none;">'.$_POST["cardNumberInput"].'</div>';
echo '<div id="expirationDate" style="display: none;">'.$_POST["expirationDateInput"].'</div>';
echo '<div id="cardType" style="display: none;">'.$_POST["cardTypeFormData"].'</div>';

echo '<input id="quoteData" style="display: none;">';

//$appId = $_GET["appId"];

echo '<input id="appIdContainer" value="'.Cookie::getQuoteId().'" type="hidden"></input>';

new UserSelectionFinishPageView();
?>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post();
    the_content();
endwhile; else: ?>
<?php endif;


new ApplicationEmailView();

get_footer();
