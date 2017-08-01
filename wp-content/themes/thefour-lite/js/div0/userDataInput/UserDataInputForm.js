var UserDataInputForm = function(){
    var benefits;
    var benefitsSelectElement;

    var savedUserData;

    var $ = jQuery.noConflict();

    function getBenefitsSelectElement(){
        benefitsSelectElement = $('#benefitsSelect');
    }

    function compareFunction(a,b){
        return a - b;
    }

    function addBenefitsToSelect(){
        var benefitsKeysSorter = new BenefitsKeysSorter();
        var sortedKeys;
        try{
            sortedKeys = benefitsKeysSorter.sort(benefits.getKeys());
        }
        catch(error){
            return;
        }
        //var sortedKeys = benefitsKeysSorter.sort(benefits.getKeys());
        
        for(i=0; i<sortedKeys.length; i++){
            var key = sortedKeys[i];
            var benefit = parseInt(benefits.get(key));
            var benefitMoneyFormatted = MoneyFormatter.format(benefit, 2, ':', ' ');
            $('<option value="'+benefit+'">$'+benefitMoneyFormatted+'</option>').appendTo(benefitsSelectElement);
        }
    }

    function getSavedUserData(){
        var cookieEnabled = Cookie.isEnabled();
        
        if(cookieEnabled){
            var savedData = Cookie.getUserInputFormData();

            if(savedData){
                savedUserData = parseSavedUserData(savedData);
                return true;
            }
            else{
                console.error("Error parsing cookie. ");
                return false;
            }
        }
        else{
            alert("Cookie disabled. This site need cookie to be enabled.");
            return false;
        }
    }

    function parseSavedUserData(dataString){
        return StringUtils.parseURI(dataString);
    }

    function updateFormBySavedUserData(){
        if(savedUserData){
            var numPersons = savedUserData.numPersons;
            var ages = savedUserData.ages;
            var benefit = savedUserData.benefit;

            var startDate = savedUserData.startDate;
            var finishDate = savedUserData.finishDate;
            var useSccc = savedUserData.useSccc;

            EventBus.dispatchEvent('SAVED_NUM_PERSONS_CHANGED', {data:numPersons});
            EventBus.dispatchEvent('SAVED_AGES_CHANGED', {data:ages});
            EventBus.dispatchEvent('SAVED_START_DATE_CHANGED', {data:startDate});
            EventBus.dispatchEvent('SAVED_FINISH_DATE_CHANGED', {data:finishDate});
            EventBus.dispatchEvent('SAVED_USE_SCCC_CHANGED', {data:useSccc});
        }
    }

    return{
        init:function(_benefits){
            benefits = _benefits;
            getSavedUserData();
            var hasSavedData = savedUserData !=null || savedUserData !=undefined;
            getBenefitsSelectElement();
            addBenefitsToSelect();

            if(hasSavedData){
                updateFormBySavedUserData();
            }
        }
    }
};