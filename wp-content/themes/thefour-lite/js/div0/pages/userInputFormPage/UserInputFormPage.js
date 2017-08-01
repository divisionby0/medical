var UserInputFormPage = function(){

    var $ = jQuery.noConflict();

    function generateQuoteRandomId(){
        return Math.round(Math.random()*999999);
    }

    return{
        create:function(companiesBenefitsJson){
            var benefitsJsonParser = new BenefitsJsonDataParser();
            var allBenefits = benefitsJsonParser.parse(companiesBenefitsJson);

            var ages = new AgesSelection();
            ages.init();

            var ageInputRow = new AgeInputRow();
            ageInputRow.init();

            var numPersons = new NumPersons();
            numPersons.init();

            var startDateCalendar = new StartDateCalendar();
            startDateCalendar.init();

            var finishDateCalendar = new FinishDateCalendar();
            finishDateCalendar.init();

            var countriesSelect = new CountriesSelect();
            countriesSelect.init();

            var useSccc = new UseSccc();
            useSccc.init();

            var userDataInput = new UserDataInputForm();
            userDataInput.init(allBenefits);

            //var indexPageSlider = new IndexPageSlider();
            //indexPageSlider.init();

            var quoteId = generateQuoteRandomId();
            
            Cookie.setQuoteId(quoteId);
        }
    }
};
