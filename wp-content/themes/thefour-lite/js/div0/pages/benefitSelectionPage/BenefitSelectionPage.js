var BenefitSelectionPage = function(){

    var personsCollection;
    var parsedData;
    var useSCCC;
    var savedBenefit;
    var benefitsSelectionForm;

    var $ = jQuery.noConflict();

    function createPersons() {

        // detect is collection exists at the cookie

        personsCollection = new QuotePersonCollection();

        for(var i = 0; i<parsedData.ages.length; i++ ){
            var age = parsedData.ages[i];

            var person = new QuotePerson(age);
            person.setIsUseSCCC(useSCCC);
            person.setPeriod(parsedData.totalDays);

            if(i==0){
                person.setRelationship(PRIMARY);
            }
            
            personsCollection.add(person);
        }
    }

    function savePersons(){
        var personsData = personsCollection.getData();
        Cookie.setPersons(personsData);
    }

    function savePeriod(){
        var period = parsedData.totalDays;
        Cookie.setPeriod(period);
    }

    function benefitSelectedHandler(benefit){
        Cookie.setBenefit(benefit);
        benefitsSelectionForm.submit();
    }

    return{
        create:function(){

            EventBus.addEventListener("BENEFIT_SELECTED", benefitSelectedHandler);

            var savedFormData = Cookie.getUserInputFormData();
            parsedData = StringUtils.parseURI(savedFormData);

            console.log("parsedData",parsedData);

            if(!parsedData){
                parsedData = {benefit:null};
            }
            savedBenefit = parsedData.benefit;
            
            useSCCC = parsedData.useSccc == "Yes" ? true : false;
            console.log("useSCCC="+useSCCC);

            createPersons();
            savePersons();
            savePeriod();

            benefitsSelectionForm = new BenefitSelectionFormTS(savedBenefit, "selectedBenefitInput", "benefitSelectionForm", "benefitsSelectionTable");
        }
    }
};
