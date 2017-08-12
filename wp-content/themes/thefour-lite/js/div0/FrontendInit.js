var $ = jQuery.noConflict();

var companyFamilyRateMinNumPersons = 3;

$(document).ready(function($) {

    console.log('FrontendInit');

    var $window = $( window );
    var $navBar = $( '.navbar' );
    var $body = $( 'body' );

    $.datepicker.setDefaults({dateFormat: 'yy-mm-dd'});

    var getCompaniesBenefitsDataJson = new GetCompaniesBenefitsDataJson();
    var companiesBenefitsJson = getCompaniesBenefitsDataJson.execute();
    
   // var isAtCompaniesTablePage = $('#pageType').text() == 'companiesTablePage';
    //var isAtApplicationCreationPage = $('#pageType').text() == 'applicationCreationPage';
    //var isAtBenefitsByUserDataAndZeroDeductiblePage = $('#pageType').text() == 'benefitsByUserDataAndZeroDeductiblePage';
    //var isAtUserDetailsPage = $('#pageType').text() == 'personDetailsPage';
   // var isAtOrderOnlineTestingPage = $('#pageType').text() == 'orderOnlinePageTesting';
    //var isAtCompanyPlanSelectionPage = $('#pageType').text() == 'companyPlanSelection';
    var isAtSimplePage = $('#pageType').text() == 'simplePage';

    var pageType = $('#pageType').text();

    var page = PageFactory.create(pageType);


    if(!page){
        return;
    }
    if(isAtSimplePage){
        page.create(companiesBenefitsJson);
    }
    else{
        page.create();
    }
});




