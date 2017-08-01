


var CompaniesByUserDataPageTesting = (function(){

    var $ = jQuery.noConflict();

    var parsedFormData;
    var selectedBenefit;

    function navigateToNextPage(){
        Cookie.setBenefit("100000");
        $('#benefitSelectionForm').submit();
    }

    return{
        create:function(){
            var formDataGetter = new GetFormData();
            var formData = formDataGetter.init();

            var formDataParser = new FormDataParser();
            parsedFormData = formDataParser.parse(formData);

            selectedBenefit = parsedFormData.benefit;

            console.log("parsedFormData",parsedFormData);

            //navigateToNextPage();

            $("#navigateButton").click(navigateToNextPage);
        }
    }
})();
