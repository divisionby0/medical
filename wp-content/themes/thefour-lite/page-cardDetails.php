<?php
/*
Template Name: page card details
*/
get_header('noImage');
echo '<div id="pageType" style="display: none;">cardDetailsPage</div>';
$selectedPlanData = Cookie::getSelectedCompanyPlan();
$data = StringUtil::unquote($selectedPlanData);
$decodedPlanData = json_decode($data);
$decodedPlanData = json_decode(json_encode($decodedPlanData), true);
echo '<input id="selectedPremiumContainer" type="text" value="'.$decodedPlanData['cost'].'" style="display: none;"></input>';
?>

<form action="/finish-application" method="post" id="cardDetailsForm">
    <h1 class="centered">Your card details</h1>
    <div class="container cardDetailsContainer" id="cardDetailsContainer">
        <div class="row">
            <div class="col-sm-3">Card type:</div>
            <div class="col-sm-3">
                <select name="cardTypeSelect" id="cardTypeSelect">
                    <option value="masterCard">MasterCard</option>
                    <option value="visa">Visa</option>
                    <option value="americanExpress">American Express</option>
                </select>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-3">Card number:</div>
            <div class="col-sm-3">
                <input type="text" id="cardNumberInput" name = "cardNumberInput" maxlength="16">
            </div>
            <div class="col-sm-2">
                <span id="errmsg" class="text-danger" style="float: left;"></span>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-3">Card holder name:</div>
            <div class="col-sm-3">
                <input type="text" id="cardholderNameInput" name="cardholderNameInput" placeholder="Cardholder name">
            </div>
        </div>

        <div class="row">
            <div class="col-sm-3">Expiration date:</div>
            <div class="col-sm-3">
                <input type="text" id="expirationDateInput" name="expirationDateInput" placeholder="Card expiration date">
            </div>
        </div>
    </div>

    <input id="cardTypeFormData" name="cardTypeFormData" value="mastercard" style="display: none;">
</form>


    <div id="confirmationViewContainer" class="hidden">
        <h1 class="centered">Please confirm your card details</h1>
        <div class="container">
            <div class="row">
                <div class="col-sm-3">Card type:</div>
                <b><div class="col-sm-3" id="cardTypeConfirmation"></div></b>
            </div>

            <div class="row">
                <div class="col-sm-3">Card number:</div>
                <b><div class="col-sm-3" id="cardNumberConfirmation"></div></b>
            </div>

            <div class="row">
                <div class="col-sm-3">Card holder name:</div>
                <b><div class="col-sm-3" id="cardholderConfirmation"></div></b>
            </div>

            <div class="row">
                <div class="col-sm-3">Expiration date:</div>
                <b><div class="col-sm-3" id="cardExpConfirmation"></div></b>
            </div>
        </div>
        <div style="width: 100%; text-align: center;"><input type="checkbox" id="confirmCheckBox"> <label for="confirmCheckBox" class="text-success"> I confirm all this data !</label></div>
    </div>

    <div style="float: right;">
        <span class="label label-danger hidden" id="errorText" style="float: right;"></span>
        <br/>
        <button type="button" class="btn btn-success" id="nextButton" style="float: right; margin-left: 10px;">Next</button>
        <button type="button" class="btn btn-warning" id="prevButton" style="float: right;">Prev</button>
    </div>

<?php
get_footer();