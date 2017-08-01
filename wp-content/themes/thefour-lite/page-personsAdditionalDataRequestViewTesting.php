<?php
/*
Template Name: page personsAdditionalDataRequestViewTesting
*/
get_header('noImage');

$countriesSelectOptions = new CountriesSelectOptions();
$countries=$countriesSelectOptions->getHtml();

?>
<div class="container">
    <div class="row col-sm-4">
        <div>
            <div>Country of origin</div>
            <div>
                <select id="countriesSelect" class="countrySelect">?> <?php echo $countries;?></select>
            </div>
        </div>
        <div>
            <div>Visitor type</div>
            <div>
                <select id="visitorTypeSelect"><option value="Visitor">Visitor</option><option value="New Immigrant">New Immigrant</option><option value="Super Visa">Super Visa</option><option value="Work or Student Visa">Work or Student Visa</option><option value="Returning Canadian">Returning Canadian</option><option value="Other">Other</option></select>
            </div>
        </div>
        <div>
            <div>Sponsor first name</div>
            <div>
                <input type="text" id="sponsorFirstName" value="First name">
            </div>
        </div>
        <div>
            <div>Sponsor last name</div>
            <div>
                <input type="text" id="sponsorLastName" value="Last name">
            </div>
        </div>
    </div>


    <div class="row col-sm-4">
        <div>
            <div>Arrival date to Canada</div>
            <div>
                <input type="text" id="arrivalDateInput" value="">
            </div>
        </div>
        <div>
            <div>Start date</div>
            <div>
                <input type="text" id="startDateInput" value="2017-12-06" disabled="disabled">
            </div>
        </div>
        <div>
            <div>Finish date</div>
            <div>
                <input type="text" id="finishDateInput" value="2017-12-06" disabled="disabled">
            </div>
        </div>
        <div>
            <div>Period</div>
            <div>
                <div><b>2 days</b></div>
            </div>
        </div>
    </div>

    <div class="row col-sm-4">
        <div>
            <div>Canadian address</div>
            <div>
                <input type="text" value="" id="canadianAddressStreet" placeholder="street, house, flat">
            </div>
        </div>
        <div>
            <div>Canadian address city</div>
            <div>
                <input type="text" value="" id="cityInput" placeholder="City">
            </div>
        </div>
        <div>
            <div>Canadian address province</div>
            <div>
                <select id="provinceSelect">
                    <option value="province 1">Province 1</option>
                    <option value="province 2">Province 2</option>
                    <option value="province 3">Province 3</option>
                    <option value="province 4">Province 4</option>
                </select>
            </div>
        </div>
        <div>
            <div>postal code</div>
            <div>
                <input type="text" value="" id="postalCodeSelect" placeholder="postal code">
            </div>
        </div>
    </div>

    <div class="row col-sm-2">
        <div>
            <div>Email</div>
            <div>
                <input type="email" value="" id="email" placeholder="email">
                <div id="emailErrorMessage" class="text-danger" style="float: left;"></div>
            </div>
        </div>
    </div>
</div>

<?php
get_footer();
?>