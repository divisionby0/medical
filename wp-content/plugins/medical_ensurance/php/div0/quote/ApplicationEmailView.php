<?php

class ApplicationEmailView
{
    public function __construct()
    {
        echo '<div style="display: none;" id="quoteDate"></div>';

        $pageHtml = '<div id="emailBody" style="display: none;"><div id="quoteView">
        <h2><div style="width: 100%; background-color: #d9edf7; text-align: center;" id="application">Application</div></h2>
        
        <div style="width: 100%; text-align: center;" id="company">Company: Alianz</div>
        <div id="personsShortInfoContainer" style="width: 100%;"></div>
        
        <h2><div style="width: 100%; background-color: #d9edf7; text-align: center;">Application</div></h2>
            <table>
                <tr>
                    <td style="padding-left: 10px; padding-right: 10px;">Arrival date:</td>
                    <td style="padding-left: 10px; padding-right: 10px;" id="arrivalDate"></td>
                    <td style="padding-left: 10px; padding-right: 10px;">Canadian address:</td>
                    <td style="padding-left: 10px; padding-right: 10px;" id="address"></td>
                    <td style="padding-left: 10px; padding-right: 10px;">Country of origin:</td>
                    <td style="padding-left: 10px; padding-right: 10px;" id="countryOfOrigin"></td>
                </tr>
                <tr>
                    <td style="padding-left: 10px; padding-right: 10px;">Start date:</td>
                    <td style="padding-left: 10px; padding-right: 10px;" id="startDate"></td>
                    <td style="padding-left: 10px; padding-right: 10px;">City:</td>
                    <td style="padding-left: 10px; padding-right: 10px;" id="city"><b>City of Canada</b></td>
                    <td style="padding-left: 10px; padding-right: 10px;">Visitor(s) type:</td>
                    <td style="padding-left: 10px; padding-right: 10px;" id="visitorType"></td>
                </tr>   
                <tr>
                    <td style="padding-left: 10px; padding-right: 10px;">Finish date:</td>
                    <td style="padding-left: 10px; padding-right: 10px;" id="finishDate"></td>
                    <td style="padding-left: 10px; padding-right: 10px;">Province:</td>
                    <td style="padding-left: 10px; padding-right: 10px;" id="province"></td>
                    <td style="padding-left: 10px; padding-right: 10px;">Email:</td>
                    <td style="padding-left: 10px; padding-right: 10px;" id="email"></td>
                    
                </tr>
                <tr>
                    <td style="padding-left: 10px; padding-right: 10px;">Period:</td>
                    <td style="padding-left: 10px; padding-right: 10px;" id="period"></td>
                    <td style="padding-left: 10px; padding-right: 10px;">Postal code:</td>
                    <td style="padding-left: 10px; padding-right: 10px;" id="postalCode"></td>
                    <td style="padding-left: 10px; padding-right: 10px;">Phone:</td>
                    <td style="padding-left: 10px; padding-right: 10px;" id="phone"></td>
                </tr>
                <tr>
                   <td style="padding-left: 10px; padding-right: 10px;">Benefit:</td>
                   <td style="padding-left: 10px; padding-right: 10px;" id="benefit"></td> 
                    <td style="padding-left: 10px; padding-right: 10px;">Deductible:</td>
                    <td style="padding-left: 10px; padding-right: 10px;" id="deductible"></td>
                    <td style="padding-left: 10px; padding-right: 10px;">Cost:</td>
                    <td style="padding-left: 10px; padding-right: 10px;" id="cost"></td>
                </tr>
            </table>
        
        <h2><div style="width: 100%; background-color: #d9edf7; text-align: center;">Card details</div></h2>
            <table>
                <tr>
                    <td style="padding-left: 10px; padding-right: 10px;">Type:</td>
                    <td style="padding-left: 10px; padding-right: 10px;" id="cardTypeContainer"></td>
                </tr>
                <tr>
                    <td style="padding-left: 10px; padding-right: 10px;">Card holder: </td>
                    <td style="padding-left: 10px; padding-right: 10px;" id="cardHolder"></td>
                </tr>
                <tr>
                    <td style="padding-left: 10px; padding-right: 10px;">Card number: </td>
                    <td style="padding-left: 10px; padding-right: 10px;" id="cardNumberContainer"></td>
                </tr>
                <tr>
                    <td style="padding-left: 10px; padding-right: 10px;">Exp. date:</td>
                    <td style="padding-left: 10px; padding-right: 10px;" id="cardExpDate"></td>
                </tr>
            </table>
        
        <h2><div style="width: 100%; background-color: #d9edf7; text-align: center;">Sponsor</div></h2>
            <table>
                <tr>
                    <td style="padding-left: 10px; padding-right: 10px;">Sponsor first name:</td>
                    <td style="padding-left: 10px; padding-right: 10px;" id="sponsorFirstName"></td>
                </tr>
            </table>
            
        <h2><div style="width: 100%; background-color: #d9edf7; text-align: center;">Beneficiary</div></h2>
            <table>
                <tr>
                    <td style="padding-left: 10px; padding-right: 10px;">Beneficiary:</td>
                    <td style="padding-left: 10px; padding-right: 10px;" id="beneficiaryFirstName"></td>
                </tr>
                <tr>
                    <td style="padding-left: 10px; padding-right: 10px;">Relationship:</td>
                    <td style="padding-left: 10px; padding-right: 10px;" id="beneficiaryLastName"></td><!-- I KNOW. This id should be relationship -->
                </tr>
            </table>
    </div>
    <div id="personsContainer"></div>
</div>';
        echo $pageHtml;
    }
}