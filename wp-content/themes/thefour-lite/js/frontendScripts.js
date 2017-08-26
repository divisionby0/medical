var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var BUY_ONLINE_BUTTON_CLICKED = "BUY_ONLINE_BUTTON_CLICKED";

// EmailSender
var EmailSender = (function () {
    function EmailSender() {
        this.$j = jQuery.noConflict();
    }
    EmailSender.prototype.sendApplicationResult = function (receiver, emailContent, appId) {
        var _this = this;
        var dataToSave = this.createApplicationResultData(receiver, emailContent, appId);
        this.$j.post(ajaxurl, dataToSave, function (response) { return _this.onComplete(response); });
    };
    EmailSender.prototype.sendApplicationAdminEmail = function (appId) {
        var _this = this;
        var dataToSave = { 'action': 'sendApplicationAdminEmail',
            'appId': appId
        };
        this.$j.post(ajaxurl, dataToSave, function (response) { return _this.onApplicationAdminEmailSent(response); });
    };
    EmailSender.prototype.createApplicationResultData = function (receiver, emailContent, appId) {
        return { 'action': 'sendApplicationResultEmail',
            'receiver': receiver,
            'body': emailContent,
            'appId': appId
        };
    };
    EmailSender.prototype.onComplete = function (response) {
        EventBus.dispatchEvent("APPLICATION_EMAIL_SENT_RESULT", response);
    };
    EmailSender.prototype.onApplicationAdminEmailSent = function (response) {
        EventBus.dispatchEvent("APPLICATION_ADMIN_EMAIL_SENT_RESULT", response);
    };
    return EmailSender;
}());

// HTMLExporter
var HTMLExporter = (function () {
    //private siteUrl:string;
    function HTMLExporter() {
        this.$j = jQuery.noConflict();
    }
    HTMLExporter.prototype.export = function (id, content) {
        var _this = this;
        var dataToSave = this.createApplicationResultData(id, content);
        this.$j.post(ajaxurl, dataToSave, function (response) { return _this.onComplete(response); });
    };
    HTMLExporter.prototype.createApplicationResultData = function (id, content) {
        return { 'action': 'saveApplicationHTML',
            'appId': id,
            'appContent': content
        };
    };
    HTMLExporter.prototype.onComplete = function (response) {
        //console.log("html export response: ",response);
        EventBus.dispatchEvent("HTML_EXPORT_COMPLETE", response);
    };
    return HTMLExporter;
}());

// PageMarkupResposabilityTS
var PageMarkupResposabilityTS = (function () {
    function PageMarkupResposabilityTS() {
        this.$j = jQuery.noConflict();
    }
    PageMarkupResposabilityTS.prototype.removeResponsabilityMarkup = function () {
        this.$j("meta[width='device-width']").remove();
        this.$j("meta[initial-scale='1.0']").remove();
    };
    return PageMarkupResposabilityTS;
}());

// BenefitsJsonDataParser
var BenefitsJsonDataParser = function(){
    return{
        parse:function(jsonData){

            var companiesBenefits;
            try{
                companiesBenefits = JSON.parse(jsonData);
            }
            catch(error){
                console.error("Benefits parse error. "+error+". Given string '"+jsonData+"'" );
                return;
            }

            var benefits = new Map('allBenefits');

            var companyBenefitsJsonDataDecoder = new MapJsonDecoder();

            for(var i=0;i<companiesBenefits.length;i++){
                var companyBenefitsJsonData = companiesBenefits[i];
                companyBenefitsJsonDataDecoder = new MapJsonDecoder(companyBenefitsJsonData);
                var companyBenefitsMap = companyBenefitsJsonDataDecoder.decode();

                // я исхожу из того что тут невозможны дублирования ключей без дублирования значений. Поэтому все дубликаты я отбрасываю
                var companyBenefitsMapIterator = companyBenefitsMap.getIterator();
                while(companyBenefitsMapIterator.hasNext()){
                    var companyBenefit = companyBenefitsMapIterator.next();
                    try{
                        benefits.add(companyBenefit, companyBenefit);
                    }
                    catch(error){
                        //console.log('benefit duplication error: '+error);
                    }
                }
            }

            return benefits;
        }
    }
}

// GetCompaniesBenefitsDataJson
var GetCompaniesBenefitsDataJson = function(){
    return{
        execute:function(){
            var jsonData = $('#allBenefits').text();
            return jsonData;
        }
    }
};

// BenefitsKeysSorter
var BenefitsKeysSorter = function(){
    function compareFunction(a,b){
        return a - b;
    }
    return{
        sort:function(keys){
            var i;

            var keysInt = new Array();

            for(i=0; i<keys.length; i++){
                keysInt.push(parseInt(keys[i]));
            }

            keysInt.sort(compareFunction);
            
            return keysInt;
        }
    }
}

// Card
var Card = (function () {
    function Card(cardNumber, holderName, expDate, type) {
        if (cardNumber === void 0) { cardNumber = ""; }
        if (holderName === void 0) { holderName = ""; }
        if (expDate === void 0) { expDate = ""; }
        if (type === void 0) { type = ""; }
        this.cardNumber = cardNumber;
        this.holderName = holderName;
        this.expDate = expDate;
        this.type = type;
    }
    Card.prototype.getNumber = function () {
        return this.cardNumber;
    };
    Card.prototype.setNumber = function (number) {
        this.cardNumber = number;
    };
    Card.prototype.getHolderName = function () {
        return this.holderName;
    };
    Card.prototype.setHolderName = function (name) {
        this.holderName = name;
    };
    Card.prototype.getExpDate = function () {
        return this.expDate;
    };
    Card.prototype.setExpDate = function (date) {
        this.expDate = date;
    };
    Card.prototype.getType = function () {
        return this.type;
    };
    Card.prototype.setType = function (type) {
        this.type = type;
    };
    return Card;
}());

// Persons
var Persons = function(){
    var collection;
    function sortingFunction(a, b){
        return a-b
    }
    return{
        setCollection:function(_collection){
            collection = _collection;
        },
        findByAge:function(age){
            var iterator = collection.getIterator();
            while(iterator.hasNext()){
                var person = iterator.next();
                var personAge = person.getAge();
                if(personAge == age){
                    return person;
                }
            }
        },
        getIterator:function(){
            return collection.getIterator();
        },
        getAges:function(){
            var ages = new Array();

            var personsIterator = collection.getIterator();
            while(personsIterator.hasNext()) {
                var person = personsIterator.next();
                var age = person.getAge();
                ages.push(age);
            }

            ages.sort(sortingFunction);
            return ages;
        }
    }
}

var QuoteId = (function () {
    function QuoteId(value) {
        this.$j = jQuery.noConflict();
        //this.cookieValue = Cookie.getQuoteId();
        this.cookieValue = value;
        this.decorateQuoteIdWithCurrentDate();
    }
    QuoteId.prototype.decorateQuoteIdWithCurrentDate = function () {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var day = now.getDate();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        this.id = DateUtils.getCurrentDate() + "__" + hours + "-" + minutes + "-" + seconds;
    };
    QuoteId.prototype.getTempValue = function () {
        return this.cookieValue;
    };
    QuoteId.prototype.getId = function () {
        return this.id;
    };
    return QuoteId;
}());

// Person
var Person = function(){
    var id;
    var age;
    var benefit;
    var useSCCC;
    var totalDays;
    
    return{
        create:function(_id, _age, _benefit, _useSCCC, _totalDays){
            id = _id;
            age = _age;
            benefit = _benefit;
            useSCCC = _useSCCC;
            totalDays = _totalDays;
        },
        getId:function(){
            return id;
        },
        getAge:function(){
            return age;
        },
        getBenefit:function(){
            return benefit;
        },
        getUseSCCC:function(){
            return useSCCC;
        },
        getTotalDays:function(){
            return totalDays;
        }
    }
};

// PersonCollectionAgesParser
var PersonCollectionAgesParser = (function(){
    function sortingFunction(a, b){
        return a-b
    }
    return{
        parse:function(persons){
            var ages = new Array();

            var personsIterator = persons.getIterator();
            while(personsIterator.hasNext()) {
                var person = personsIterator.next();
                var age = person.getAge();
                ages.push(age);
            }

            ages.sort(sortingFunction);
            return ages;
        }
    }
})();
// FamilyRateDetector
var FamilyRateDetector = (function(){
    return{
        detect:function(familyRateMaxAge, persons){
            var ages = persons.getAges();
            ages.sort();
            if(ages.length >= companyFamilyRateMinNumPersons){
                var oldest = ages[ages.length-1];
                if(oldest <= familyRateMaxAge){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                return false;
            }
        }
    }
})();

// GetFormData
var GetFormData = function(){
    var $ = jQuery.noConflict();
    return{
        init:function(){
            var element = $('#formData');
            var formDataObject = JSON.parse(element.text());
            return formDataObject;
        }
    }
};

// FormDataParser
var FormDataParser = function(){
    function parseAges(ages){
        if(typeof ages === 'string' || ages instanceof String){
            ages = ages.replace(/\\"/g, '"');
            var parsedAges = JSON.parse(ages);
            return parsedAges;
        }
        else{
            return ages;
        }
    }
    function parseBenefit(benefit){
        return parseInt(benefit);
    }

    function parseNumPersons(numPerson){
        return parseInt(numPerson);
    }

    function parseUseSccc(useSccc) {
        if(useSccc == 'Yes'){
            return 1;
        }
        else{
            return 0;
        }
    }

    function parseTotalDays(startDate, finishDate){
        var timeDiff = Math.abs(finishDate.getTime() - startDate.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }

    return{
        parse:function(formData){
            var startDateString;
            try{
                startDateString = formData.startDate.date;
            }
            catch(error){
                return;
            }
            var finishDateString = formData.finishDate.date;

            var startDate = new Date(startDateString);
            var finishDate = new Date(finishDateString);

            var parsedAges = parseAges(formData.ages);
            formData.ages = parsedAges;

            var useSccc = parseUseSccc(formData.useSccc);
            formData.useSccc = useSccc;

            var benefit = parseBenefit(formData.benefit);
            formData.benefit = benefit;

            var numPersons = parseNumPersons(formData.numPersons);
            formData.numPersons = numPersons;
            return formData;
        }
    }
}

// CreatePersons
var CreatePersons = function(){
    var numPersons;
    var benefit;
    var totalDays;
    var useSCCC;
    var personsCollection = new Map('persons');
    function createPersonsFromAges(ages){
        var i;
        var total = ages.length;
        
        for(i=0; i < total; i++){
            var age = ages[i];
            var person = new Person();

            person.create(i, age, benefit, useSCCC, totalDays);
            personsCollection.add(i, person);
        }
    }
    return{
        create:function(data){
            benefit = data.benefit;
            useSCCC = data.useSccc;
            totalDays = data.totalDays;

            createPersonsFromAges(data.ages);

            var persons = new Persons();
            persons.setCollection(personsCollection);

            return persons;
        }
    }
}
// CountriesSelect
var CountriesSelect = function(){
    var $ = jQuery.noConflict();
    var element;
    function getElement(){
        element = $('#countriesSelect');
    }
   
    function addBlankItem(){
        var blankOption = $("<option value='null' selected='selected'>Select country</option>");
        element.prepend(blankOption);
        blankOption.prop('disabled', true);
    }
    return{
        init:function(){
            getElement();
            addBlankItem();
        }
    }
}

// SelectionForm
var SelectionForm = (function () {
    function SelectionForm(selectedItem, inputElementId, formId, tableId) {
        this.selectedItem = 1;
        this.$j = jQuery.noConflict();
        this.inputElementId = inputElementId;
        this.inputElement = this.getInputElement();
        this.formId = formId;
        this.form = this.getFormElement();
        this.tableId = tableId;
        this.table = this.getTableElement();
        this.addListener();
        console.log("selectedItem=", selectedItem);
        if (selectedItem) {
            this.selectedItem = selectedItem;
            this.updateSelectedIndexByValue(this.selectedItem);
            this.selectedIndex += 1;
        }
        this.selectItem(this.selectedIndex);
        this.updateInput();
    }
    SelectionForm.prototype.submit = function () {
        this.$j("#" + this.formId).submit();
    };
    SelectionForm.prototype.getSelection = function () {
        return this.selectedItem;
    };
    SelectionForm.prototype.getInputElement = function () {
        return this.$j("#" + this.inputElementId);
    };
    SelectionForm.prototype.getFormElement = function () {
        return this.$j("#" + this.formId);
    };
    SelectionForm.prototype.getTableElement = function () {
        return this.$j("#" + this.tableId);
    };
    SelectionForm.prototype.updateInput = function () {
        this.inputElement.val(this.selectedItem);
    };
    SelectionForm.prototype.selectItem = function (index) {
        var row = this.$j("#" + this.tableId + " > tbody  > tr").eq(index);
        this.selectedItem = row.attr('id');
        row.addClass('itemSelected');
        this.selectedRow = row;
    };
    SelectionForm.prototype.updateSelectedIndexByValue = function (givenValue) {
        var _this = this;
        this.selectedIndex = -1;
        this.$j('#' + this.tableId + ' > tbody  > tr').not(':first').each(function (index, value) { return _this.findIndex(index, value, givenValue); });
    };
    SelectionForm.prototype.findIndex = function (index, value, givenIndex) {
        var element = this.$j(value);
        var elementId = element.attr("id");
        if (parseInt(elementId) == parseInt(givenIndex)) {
            this.selectedIndex = index;
        }
    };
    SelectionForm.prototype.tableRowIterator = function (index, value) {
        this.addListeners(value);
    };
    SelectionForm.prototype.addListeners = function (value) {
        var _this = this;
        this.$j(value).hover(function (event) { return _this.onRowHoverIn(event); }, function (event) { return _this.onRowHoverOut(event); });
        this.$j(value).click(function (event) { return _this.onClick(event); });
    };
    SelectionForm.prototype.onClick = function (event) {
        var element = this.$j(event.target).parent();
        var itemId = element.attr('id');
        this.selectedItem = itemId;
        this.updateInput();
        try {
            this.selectedRow.removeClass('itemSelected');
        }
        catch (error) {
        }
        this.selectedRow = element;
        this.submitForm();
        element.addClass('itemSelected');
    };
    SelectionForm.prototype.onRowHoverIn = function (event) {
        this.$j(event.target).parent().addClass('itemHovered');
    };
    SelectionForm.prototype.onRowHoverOut = function (event) {
        this.$j(event.target).parent().removeClass('itemHovered');
    };
    SelectionForm.prototype.addListener = function () {
        var _this = this;
        this.$j('#' + this.tableId + ' > tbody  > tr').not(':first').each(function (index, value) { return _this.tableRowIterator(index, value); });
    };
    SelectionForm.prototype.submitForm = function () {
    };
    return SelectionForm;
}());

// BenefitSelectionFormTS
var BenefitSelectionFormTS = (function (_super) {
    __extends(BenefitSelectionFormTS, _super);
    function BenefitSelectionFormTS(selectedItem, inputElementId, formId, tableId) {
        _super.call(this, selectedItem, inputElementId, formId, tableId);
    }
    // override
    BenefitSelectionFormTS.prototype.submitForm = function () {
        EventBus.dispatchEvent("BENEFIT_SELECTED", this.selectedItem);
    };
    return BenefitSelectionFormTS;
}(SelectionForm));

// SCCCParser
var SCCCParser = function(){
    return{
        parse:function(string){
            var jsonMapDecoder = new MapJsonDecoder(string);
            var scccData = jsonMapDecoder.decode();

            var sccc = new SCCC();
            sccc.create(scccData);
            return sccc;
        }
    }
}

// DeductibleAmountOptionsParser
var DeductibleAmountOptionsParser = function(){
    return{
        parse:function(string){
            var jsonMapDecoder = new MapJsonDecoder(string);
            var deductibleAmountOptionsData = jsonMapDecoder.decode();

            var deductibleAmountOptions = new DeductibleAmountOptions();
            deductibleAmountOptions.create(deductibleAmountOptionsData);
            return deductibleAmountOptions;
        }
    }
}
// StandardRatesParser
var StandardRatesParser = function(){
    return{
        parse:function(string){
            var jsonMapDecoder = new MapJsonDecoder(string);
            var standardRatesData = jsonMapDecoder.decode();

            var standardRates = new StandardRates();
            standardRates.create(standardRatesData);
            return standardRates;
        }
    }
}

// RateTableGuideParser
var RateTableGuideParser = function(){
    return{
        parse:function(string){
            var jsonMapDecoder = new MapJsonDecoder(string);
            var rateTableGuideData = jsonMapDecoder.decode();

            var keys = rateTableGuideData.getKeys();
            for(var i=0; i<keys.length; i++){
                var key = keys[i];
                var item = rateTableGuideData.get(key);
                if (typeof item === 'string' || item instanceof String){
                    jsonMapDecoder = new MapJsonDecoder(item);
                    var parsedItem = jsonMapDecoder.decode();
                    rateTableGuideData.update(key, parsedItem);
                }
            }


            var rateTableGuide = new RateTableGuide();
            rateTableGuide.create(rateTableGuideData);
            return rateTableGuide;
        }
    }
}

// SCCC
var SCCC = function(){
    var dataProvider;
    return{
        create:function(data){
            dataProvider = data;
        },
        getCost:function(benefit, age){
            var benefitRow = dataProvider.get(benefit.toString());
            if(benefitRow){
                return benefitRow.get(age.toString())/1000;
            }
            else{
                return -1;
            }
        }
    }
}
// StandardRates
var StandardRates = function(){
    var dataProvider;
    return{
        create:function(data){
            dataProvider = data;
        },
        getCost:function(benefit, age){
            var benefitRow = dataProvider.get(benefit.toString());

            if(benefitRow){
                return benefitRow.get(age.toString())/1000;
            }
            else{
                return null;
            }
        }
    }
}

// GetDefaultRateTableGuideDataOperation
var GetDefaultRateTableGuideDataOperation = function(){
    var strategy;
    return{
        setStrategy:function(_strategy){
            strategy = _strategy;
        },
        execute:function(dataProvider, age, useSccc){
            return strategy.getDeductibleAndTable(dataProvider, age, useSccc);
        }
    }
}

// GetMedicalDeclarationRequiredOperation
var GetMedicalDeclarationRequiredOperation = function(){
    var strategy;
    return{
        setStrategy:function(_strategy){
            strategy = _strategy;
        },
        execute:function(dataProvider, age, useSccc){
            return strategy.getMedicalDeclarationRequired(dataProvider, age, useSccc);
        }
    }
}

// MedicalDeclarationRequirementUpdater
var MedicalDeclarationRequirementUpdater = (function () {
    function MedicalDeclarationRequirementUpdater(persons, rateTableGuide) {
        this.persons = persons;
        this.rateTableGuide = rateTableGuide;
    }
    MedicalDeclarationRequirementUpdater.prototype.update = function () {
        var personIterator = this.persons.getIterator();
        while (personIterator.hasNext()) {
            var person = personIterator.next();
            var personAge = person.getAge();
            var useSCCC = person.getIsUseSCCC();
            var medicalDeclarationRequired = this.rateTableGuide.isMedicalDeclarationRequired(personAge, useSCCC);
            person.setMedicalDeclarationRequired(medicalDeclarationRequired);
            console.log("Person " + personAge + "  medicalDeclarationRequired=" + medicalDeclarationRequired);
        }
    };
    return MedicalDeclarationRequirementUpdater;
}());

// AgeUnderDefaultStrategy
var AgeUnderDefaultStrategy = function(){

    this.getDeductibleAndTable = function(dataProvider){

        var keys = dataProvider.getKeys();
        var defaultKey = keys[0];
        var rateTableGuideItem = dataProvider.get(defaultKey);

        console.log("AgeUnderDefaultStrategy rateTableGuideItem:");
        console.log(rateTableGuideItem);

        var defaultDeductible = rateTableGuideItem.get('deductible');
        var defaultTable = rateTableGuideItem.get('premiumTable');

        return {deductible: defaultDeductible, table: defaultTable};
    }
}

// AgeOverDefaultStrategy
//TODO вообще непонятно почему называется Over 
var AgeOverDefaultStrategy = function(){
    function isAgeInsideRange(rateTableGuideItem, age){
        var ageFrom = parseInt(rateTableGuideItem.get('ageFrom'));
        var ageTill = parseInt(rateTableGuideItem.get('ageTill'));

        var ageInsideAgeRange = false;

        if(age >= ageFrom && age <= ageTill){
            ageInsideAgeRange = true;
        }
        if(ageInsideAgeRange){
            return true;
        }
        else{
            return false;
        }
    }

    return{
        getDeductibleAndTable:function(dataProvider, age, useSccc){
            var defaultDeductible = -1;
            var defaultTable = 'notAvailble';

            var dataIterator = dataProvider.getIterator();
            while(dataIterator.hasNext()){

                var rateTableGuideItem = dataIterator.next();

                var ageInsideRange = isAgeInsideRange(rateTableGuideItem, age);

                if(ageInsideRange){
                    defaultDeductible = rateTableGuideItem.get('deductible');
                    defaultTable = rateTableGuideItem.get('premiumTable');

                    var itemSccc =  rateTableGuideItem.get('scco');

                    if(itemSccc == useSccc || itemSccc == -1){
                        return {deductible: defaultDeductible, table: defaultTable};
                        break;
                    }
                }
            }
        },
        getMedicalDeclarationRequired:function(dataProvider, age, useSccc){
            var dataIterator = dataProvider.getIterator();
            while(dataIterator.hasNext()){

                var rateTableGuideItem = dataIterator.next();

                var ageInsideRange = isAgeInsideRange(rateTableGuideItem, age);

                if(ageInsideRange){
                     var itemSccc =  rateTableGuideItem.get('scco');

                     if(itemSccc == useSccc || itemSccc == -1){
                         var medicalDeclarationRequired = rateTableGuideItem.get("mdr");
                         return medicalDeclarationRequired == 1;
                     }
                }
            }
        }
    }
}

// RateTableGuide
var RateTableGuide = function(){
    var dataProvider;
    var ageToGetDefaultDeductible = 60;
    function getDefaultDeductibleAndTable(age, useSccc){
        
        var strategy;
        var operation = new GetDefaultRateTableGuideDataOperation();

        strategy = new AgeOverDefaultStrategy();
        operation.setStrategy(strategy);

        return operation.execute(dataProvider, age, useSccc);
    }

    return{
        create:function(data){
            dataProvider = data;
        },
        getDefaultData:function(age, useSccc){
            var defaultData = getDefaultDeductibleAndTable(age, useSccc);
            return defaultData;
        },
        isMedicalDeclarationRequired:function(age, useSCCC){
            console.log("isMedicalDeclarationRequired   age="+age+"  useSccc="+useSCCC);
            var operation = new GetMedicalDeclarationRequiredOperation();
            var strategy = new AgeOverDefaultStrategy();
            operation.setStrategy(strategy);

            return operation.execute(dataProvider, age, useSCCC);
        }
    }
}

// DeductibleAmountOptions
var DeductibleAmountOptions = function(){
    var dataProvider;

    function isAgeInsideRange(age, ageFrom, ageTill){
        if(parseInt(age) >= parseInt(ageFrom) && parseInt(age) <= parseInt(ageTill)){
            return true;
        }
        return false;
    }
    return{
        create:function(data){
            dataProvider = data;
        },
        getDeductibles:function(){
            var deductibles = new Array();
            var dataProviderIterator = dataProvider.getIterator();
            while(dataProviderIterator.hasNext()){
                var option = dataProviderIterator.next();
                deductibles.push(option.get('deductible'));
            }
            return deductibles;
        },
        getSurchargeOrDiscountProcent:function(deductible, benefit, age){
            var dataProviderIterator = dataProvider.getIterator();

            var procentsByDeductible = new List('procentsByDeductible');

            while(dataProviderIterator.hasNext()){
                var option = dataProviderIterator.next();
                
                var optionDeductible = option.get('deductible');
                var optionBenefit = option.get('aggregatePolicyLimit');
                var optionAgeFrom = option.get('ageFrom');
                var optionAgeTill= option.get('ageTill');

                var ageInsideOptionAgeRange = isAgeInsideRange(age, optionAgeFrom, optionAgeTill);

                if(ageInsideOptionAgeRange){
                    if(optionDeductible == deductible){
                        if(benefit == optionBenefit || optionBenefit=='any'){
                            var optionSurchargeOrDiscount = option.get('surchargeOrDiscount');
                            procentsByDeductible.add({deductible:optionDeductible, procent:optionSurchargeOrDiscount, benefit:optionBenefit});
                        }
                    }
                }
            }
            
            return procentsByDeductible;
        }
    }
}
// UpdateCostByDeductibleAmountOption
var UpdateCostByDeductibleAmountOption = function(){
    var table;
    function updateCompanyCostsByBenefitAndAge(collection, baseCost){
        var keys = collection.getKeys();
        for(var i = 0; i < keys.length; i++){
            var key = keys[i];
            var procent = collection.get(key);
            var updatedCost = baseCost + baseCost/100*procent;
            collection.update(key, updatedCost);
        }

        return collection;
    }
    return{
        setTable:function(_table){
            table = _table;
        },
        update:function(benefit, age, baseCost){
            var result = new Map('costs');
            var deductibles = table.getDeductibles();

            var companyCostsByBenefitAndAge = new Map('companyCostsByBenefitAndAge');
            
            for(var i=0;i<deductibles.length; i++) {
                var deductible = deductibles[i];
                var optionsList = table.getSurchargeOrDiscountProcent(deductible, benefit, age);
                var listIterator = optionsList.getIterator();

                while (listIterator.hasNext()) {
                    var option = listIterator.next();

                    var optionDeductible = option.deductible;
                    var optionProcent = option.procent;
                    var optionBenefit = option.benefit;

                    if (optionBenefit == benefit || optionBenefit == 'any') {
                        try{
                            companyCostsByBenefitAndAge.add(optionDeductible, optionProcent);
                        }
                        catch(error){
                        }
                    }
                }
            }
            companyCostsByBenefitAndAge = updateCompanyCostsByBenefitAndAge(companyCostsByBenefitAndAge, baseCost);
            return companyCostsByBenefitAndAge;
        }
    }
}

// CompaniesCostsCalculator
var CompaniesCostsCalculator = function(){
    return{
        execute:function(persons, companies, selectedBenefit, period){
            var companiesIterator = companies.getIterator();
            while(companiesIterator.hasNext()){
                var company = companiesIterator.next();
                company.setSelectedBenefit(selectedBenefit);
                company.setPeriod(period);
                company.calculateCosts(persons);
            }
        }
    }
}

// RemoveEmptyCosts
var RemoveEmptyCosts = function(){
    return{
        execute:function(companies){
            var companiesIterator = companies.getIterator();
            while(companiesIterator.hasNext()){
                var company = companiesIterator.next();
                var companyId = company.getId();
                var companyCosts = company.getDeductiblesCosts();
                if(companyCosts && companyCosts.size() == 0){
                    companyCosts = null;
                }
            }
        }
    }
}

// CreateTableDataProvider
var CreateTableDataProvider = function(){
    return{
        execute:function(companies){
            var tableDataProvider = new List('tableDataProvider');
            var companiesIterator = companies.getIterator();
            
            while(companiesIterator.hasNext()){
                var company = companiesIterator.next();
                var companyDeductiblesCosts = company.getDeductiblesCosts();
                
                var companyCostsExists = companyDeductiblesCosts!=null;

                if(companyCostsExists){
                    var companyTotalCosts = companyDeductiblesCosts.size();
                    if(companyTotalCosts!=0){
                        tableDataProvider.add(company);
                    }
                }
            }

            return tableDataProvider;
        }
    }
}

// SortCompaniesByZeroDeductibleCost
var SortCompaniesByZeroDeductibleCost = function(){
    function zeroDeductibleCompareAscendingFunction(companyObject1, companyObject2){
        return companyObject1.zeroDeductible - companyObject2.zeroDeductible;
    }
    function zeroDeductibleCompareDescendingFunction(companyObject1, companyObject2){
        return companyObject2.zeroDeductible - companyObject1.zeroDeductible;
    }

    function sortAscending(arr){
        arr.sort(zeroDeductibleCompareAscendingFunction);
    }
    function sortDescending(arr){
        arr.sort(zeroDeductibleCompareDescendingFunction);
    }

    return{
        sort:function(companies){
            var arr = new Array();

            var sortedCompanies = new List('companies');

            var companiesIterator = companies.getIterator();
            while(companiesIterator.hasNext()){
                var company = companiesIterator.next();
                var companyDeductiblesCosts = company.getDeductiblesCosts();

                if(companyDeductiblesCosts){
                    var companyTotalCosts = companyDeductiblesCosts.size();

                    if(companyTotalCosts!=0){
                        var companyZeroDeductible = companyDeductiblesCosts.get('0');
                        arr.push({zeroDeductible:parseFloat(companyZeroDeductible).toFixed(2), companyId:company.getId()});
                    }
                }
            }

            sortAscending(arr);
            //sortDescending(arr);
            for(var i=0; i<arr.length; i++){
                var companyObject = arr[i];
                var companyId = companyObject.companyId;
                var company = companies.get(companyId);
                sortedCompanies.add(company);
            }
            
            return sortedCompanies;
        }
    }
}

// CompanyDeductibles
var CompanyDeductibles = function(){
    var deductibles;
    var costs = new Map('deductiblesCosts');
    function createEmptyCosts(){
        var deductiblesKeys = deductibles.getKeys();
        for(var i=0; i < deductiblesKeys.length; i++){
            var deductible = deductiblesKeys[i];
            costs.add(deductible, NaN);
        }
    }
    function increaseCostByDeductible(deductible, cost){
        if(costs.has(deductible)){
            var deductibleCurrentCost = costs.get(deductible);

            if(isNaN(deductibleCurrentCost)){
                deductibleCurrentCost = 0;
            }
            var sum = deductibleCurrentCost + cost;
            costs.update(deductible, sum);
        }
    }
    return{
        setCollection:function(collection){
            deductibles = collection;
            createEmptyCosts();
            console.log("");
        },
        getCollection:function(){
            return deductibles;
        },
        getCosts:function(){
            return costs;
        },
        excludeUnavailableCosts:function(){
            var tempCollection = new Map('deductiblesCosts');

            var keys = costs.getKeys();
            for(var i=0; i<keys.length; i++){
                var deductible = keys[i];
                var deductibleCost = costs.get(deductible);
                if(!isNaN(deductibleCost) && deductibleCost > 0){
                    tempCollection.add(deductible, deductibleCost);
                }
            }
            costs = tempCollection;
        },
        updateCosts:function(costs){
            if(costs){
                var costDeductibles = costs.getKeys();
                for(var i = 0; i < costDeductibles.length; i++){
                    var deductible = costDeductibles[i];
                    var deductibleCost = costs.get(deductible);

                    increaseCostByDeductible(deductible, deductibleCost);
                }
            }
        }
    }
}

// CompanyDeductiblesParser
var CompanyDeductiblesParser = function(){ 
    return{
        parse:function(json){
            var jsonMapDecoder = new MapJsonDecoder(json);
            return jsonMapDecoder.decode();
        }
    }
}

// CompanyModel
var CompanyModel = function(){
    var id;
    var name;
    var rateTableGuide;
    var rateTableGuideData;
    var deductibleAmountOptions;
    var sccc;
    var standardRates;
    var familyRateMaxAge;
    var familyRatePremiumTable;
    var benefits;
    var url;

    var defaultRates;
    var defaultTableName;
    var defaultTable;
    var defaultDeductible;
    var selectedBenefit;
    var selectedAge;

    var costByDefaultDeductible;
    var companyCostsByBenefitAndAge;
    var updateCostByDeductibleAmountOption;
    
    var companyDeductibles = new CompanyDeductibles();
    var isFamilyRate;
    
    var benefitsText;
    var limitationsText;
    var familyRateAges;
    var enabled = true;

    var selectedBenefit;
    var period;

    function parseRateTableGuide(string){
        var rateTableGuideParser = new RateTableGuideParser();
        rateTableGuide = rateTableGuideParser.parse(string);
    }
    function parseDeductibleAmountOptions(string){
        var deductibleAmountOptionsParser = new DeductibleAmountOptionsParser();
        deductibleAmountOptions = deductibleAmountOptionsParser.parse(string);
    }
    
    function parseSCCC(string){
        var scccParser = new SCCCParser();
        sccc = scccParser.parse(string);
    }
    function parseStandardRates(string){
        var standardRatesParser = new StandardRatesParser();
        standardRates = standardRatesParser.parse(string);
    }

    function parseBenefits(string){
        var jsonMapDecoder = new MapJsonDecoder(string);
        benefits = jsonMapDecoder.decode();
    }

    function getDefaultRates(age, useSCCC){
        var defaultRates = rateTableGuide.getDefaultData(age, useSCCC);
        return defaultRates;
    }

    function getDefaultRateTableGuideData(age, useSCCC){
        defaultRates = getDefaultRates(age, useSCCC);

        if(defaultRates){
            defaultDeductible = defaultRates.deductible;
            defaultTableName = defaultRates.table;
        }
        else{
            console.error("Company "+name+" has no data for age "+age+"  and selected sccc "+useSCCC+"! Excluding.");
            disableCompany();
        }
    }

    function getCostPerDayForBenefitAndDefaultDeductible(benefit, age){
        if(enabled){
            costByDefaultDeductible = defaultTable.getCost(benefit, age);
        }
    }

    function selectPremiumTableByName(tableName){
        if(tableName == 'standardRatesMap'){
            defaultTable = standardRates;
        }
        else if(tableName == 'scccMap'){
            defaultTable = sccc;
        }
        else{
            console.error("Company "+name+" no default table selected! tableName="+tableName+" Excluding.");
            disableCompany();
        }
    }

    function selectDefaultTable(){
        if(isFamilyRate){
            selectPremiumTableByName(familyRatePremiumTable);
        }
        else{
            selectPremiumTableByName(defaultTableName);
        }
    }

    function updateCostByDeductibleAmountOptionsTable(){
        companyCostsByBenefitAndAge = updateCostByDeductibleAmountOption.update(selectedBenefit, selectedAge, costByDefaultDeductible);
    }
    
    function updateCostByPeriod(period){
        var keys = companyCostsByBenefitAndAge.getKeys();

        for(var i = 0; i < keys.length; i++){
            var key = keys[i];
            var cost = companyCostsByBenefitAndAge.get(key);
            cost = cost * period;
            companyCostsByBenefitAndAge.update(key, cost);
        }
    }

    function getCostsForPerson(person){
        console.log("Company",name,"getCostsForPerson ",person.getAge());
        selectedAge = person.getAge();
        var useSCCC = person.getIsUseSCCC();

        getDefaultRateTableGuideData(selectedAge, useSCCC);
        selectDefaultTable();
        getCostPerDayForBenefitAndDefaultDeductible(selectedBenefit, selectedAge);
        
        if(costByDefaultDeductible == -1){
            // exclude company
            disableCompany();
            return null;
        }

        updateCostByDeductibleAmountOptionsTable();
        updateCostByPeriod(period);
        return companyCostsByBenefitAndAge;
    }

    function disableCompany(){
        enabled = false;
    }


    function getAgesForFamilyRateCalculations(persons){
        return getOldestAge(persons);
    }

    function getOldestAge(persons){
        var ages = persons.getAges();
        var agesInt = [];
        for(var i = 0; i < ages.length; i++){
            agesInt.push(parseInt(ages[i]));
        }
        agesInt.sort(function(a, b){return b - a});
        return [agesInt[0]];
    }

    function calculateByFamilyRate(persons){
        familyRateAges = getAgesForFamilyRateCalculations(persons);

        var familyRateSinglePersonAge = familyRateAges[0];
        var person = persons.getPersonByAge(familyRateSinglePersonAge.toString());
        var costs = getCostsForPerson(person);

        var doubledCosts = new Map("costs");

        // double costs
        var keys = costs.getKeys();
        for(var i = 0; i < keys.length; i++){
            var key = keys[i];
            var cost = costs.get(key);
            var doubledCost = cost*2;
            doubledCosts.add(key, doubledCost);
        }
        companyDeductibles.updateCosts(doubledCosts);
    }

    function calculateByIndividuals(persons){
        //console.log("Company ",name,"  calculateByIndividuals. persons: ",persons);

        var personsIterator = persons.getIterator();
        while(personsIterator.hasNext()){
            var person = personsIterator.next();
            var costs = getCostsForPerson(person);

            companyDeductibles.updateCosts(costs);
        }
    }

    return{
        init:function(_id, _name){
            id = _id;
            name = _name;
            updateCostByDeductibleAmountOption = new UpdateCostByDeductibleAmountOption();
        },
        setUrl:function(_url){
            url = _url;
        },
        getUrl:function(){
            return url;
        },
        setBenefitsText:function(text){
            benefitsText = text;
        },
        setLimitationsText:function(text){
            limitationsText = text;
        },
        getBenefitsText:function(){
            return benefitsText;
        },
        getLimitationsText:function(){
            return limitationsText;
        },
        setRateTableGuide:function(jsonString){
            rateTableGuideData = jsonString;
            parseRateTableGuide(jsonString);
        },
        getRateTableGuide:function(){
            return rateTableGuideData;
        },
        isMedicalDeclarationRequired:function(age, useSCCC){
            console.log("Company "+name+"  isMedicalDeclarationRequired age="+age+"  useSCCC="+useSCCC);
            return rateTableGuide.isMedicalDeclarationRequired(age, useSCCC);
        },
        setDeductibleAmountOptions:function(jsonString){
            parseDeductibleAmountOptions(jsonString);
            updateCostByDeductibleAmountOption.setTable(deductibleAmountOptions);
        },
        setSCCC:function(jsonString){
            parseSCCC(jsonString);
        },
        setStandardRates:function(jsonString){
            parseStandardRates(jsonString);
        },
        setFamilyRateMaxAge:function(age){
            familyRateMaxAge = age;
        },
        setFamilyRatePremiumTable:function(tableName){
            familyRatePremiumTable = tableName;
        },
        setBenefits:function(jsonString){
            parseBenefits(jsonString);
        },
        setSelectedBenefit:function(benefit){
            selectedBenefit = benefit;
        },
        setPeriod:function(_period){
            period = _period;
        },
        setDeductibles:function(jsonString){
            var companyDeductiblesParser = new CompanyDeductiblesParser();
            companyDeductibles.setCollection(companyDeductiblesParser.parse(jsonString));
        },
        getDeductibles:function(){
            return companyDeductibles.getCollection();
        },
        getId:function(){
            return id;
        },
        getName:function(){
            return name;
        },
        calculateCosts:function(persons){
            isFamilyRate = FamilyRateDetector.detect(familyRateMaxAge, persons);

            if(isFamilyRate){
                calculateByFamilyRate(persons);
            }
            else{
                calculateByIndividuals(persons);
            }
            companyDeductibles.excludeUnavailableCosts();
        },
        getDeductiblesCosts:function(){
            if(enabled){
                return companyDeductibles.getCosts();
            }
            else{
                return null;
            }
        },
        getIsFamilyRate:function(){
            return isFamilyRate;
        },
        getIsFamilyRateAges:function(){
            return familyRateAges;
        }
    }
}

// CompanyTableRowView
var CompanyTableRowView = function(){
    var $ = jQuery.noConflict();
    var company;
    function createReadMoreLinkElement(url){
        return $('<div class="fullwidth centered resultTableTextDataReadMore"><a id="readMoreLink" href="'+url+'">read more</a></div>');
    }
    
    function createBuyOnlineButton(companyId, companyName){
        var button = $('<div class="buyButton centered" id="buyButton" data-companyId="'+companyId+'" data-companyName="'+companyName+'"><button type="button" class="btn btn-success">Order online</button></div>');
        createBuyOnlineButtonListener(button);
        return button;
    }
    function createBuyOnlineButtonListener(element){
        element.on('click', buyOnlineButtonClicked);
    }

    function buyOnlineButtonClicked(){
        var element = $(this);
        var companyName = element.attr("data-companyName");
        var companyId = element.attr("data-companyid");
        var medicalDeclarationRequired = element.attr("data-medicalDeclarationRequired");
        console.log("clicked element = "+element.attr("id")+"  companyId="+element.attr("data-companyId")+ "name:"+companyName+"  medicalDeclarationRequired="+medicalDeclarationRequired);
        onSelect(companyName, companyId, medicalDeclarationRequired);
    }

    
    function onSelect(name, id, medicalDeclarationRequired){
        EventBus.dispatchEvent(BUY_ONLINE_BUTTON_CLICKED, {name:name, id:id, medicalDeclarationRequired:medicalDeclarationRequired});
    }

    function isMedicalDeclarationRequired(){
        return company.isMedicalDeclarationRequired();
    }
    
    return{
        create:function(companyModel){
            company = companyModel;

            console.log("company: ",company);

            var name = company.getName();
            var id = company.getId();
            var costs = company.getDeductiblesCosts();
            var url = company.getUrl();

            var readMoreLinkElement;

            var benefitsText = company.getBenefitsText();
            var limitationsText = company.getLimitationsText();

            var companyIsFamilyRate = company.getIsFamilyRate();

            var row = $('<tr class="resultTableRow companyTableRow" id="company_126" data-companyid="'+id+'" data-companyname="'+name+'">');

            var planColumn = $('<td class="planTableColumn">');
            planColumn.appendTo(row);

            var companyNameContainer = $('<div class="fullwidth centered colorRed companyName">');
            var companyNameElement = $('<a href="'+url+'" class="colorRed"><b>'+name+'</b></a>');
            companyNameElement.appendTo(companyNameContainer);

            companyNameContainer.appendTo(planColumn);

            var planTable = $('<table class="fullwidth planTable" id="planTable">');
            planTable.appendTo(planColumn);

            var planTableLegendElement = $('<tr class="resultTableRow"><th class="fullwidth centered">Deductible</th><th class="fullwidth centered">Premium</th></tr>');
            planTableLegendElement.appendTo(planTable);

            var deductibles = costs.getKeys();
            for(var i=0; i<deductibles.length; i++ ){
                var deductible = deductibles[i];
                var cost = costs.get(deductible);
                var formatedCost = cost.toFixed(2);

                var costRow = $('<tr class="resultTableRow companyBenefitAndCost"><td class="planTableItemRenderer benefit">$ '+deductible+'</td><td class="planTableItemRenderer benefitCost">$ '+formatedCost+'</td></tr>');
                costRow.appendTo(planTable);
            }

            if(companyIsFamilyRate){
                $('<div class="centered familyRateInfo">Family Rate</div>').appendTo(planColumn);
            }

            var buyOnlineButton = createBuyOnlineButton(id, name);
            buyOnlineButton.appendTo(planColumn);

            var limitationsContainer = $('<td class="companyTableItemRenderer resultTableTextDataPositionRelative">');
            var limitationsTextElement = $('<div class="companyTextData" id="limitationsText"><p>'+limitationsText+'</p></div>');
            readMoreLinkElement = createReadMoreLinkElement(url);

            limitationsTextElement.appendTo(limitationsContainer);

            readMoreLinkElement.appendTo(limitationsContainer);
            limitationsContainer.appendTo(row);

            var benefitsContainer = $('<td class="companyTableItemRenderer resultTableTextDataPositionRelative">');
            var benefitsTextElement = $('<div class="companyTextData" id="benefitsText"><p>'+benefitsText+'</p></div>');
            readMoreLinkElement = createReadMoreLinkElement(url);
            benefitsTextElement.appendTo(benefitsContainer);
            readMoreLinkElement.appendTo(benefitsContainer);
            benefitsContainer.appendTo(row);

            return row;
        }
    }
}

// CompaniesTable
var CompaniesTable = function(){

    var $ = jQuery.noConflict();
    var rowElements;
    var companies = new Map('companies');
    var urls;

    function getRowElements(){
        rowElements = new Map('companiesRowsElements');

        $('.companyTableRow').each(function(){
            var companyTableRowElement = $(this);
            var companyId = companyTableRowElement.data('companyid');
            rowElements.add(companyId, companyTableRowElement);
        });
    }

    function removeRows(){
        $('.companyTableRow').each(function(){
            var companyTableRowElement = $(this);
            companyTableRowElement.remove();
        });
    }

    function parseCompanies(){
        var rowElementsIterator = rowElements.getIterator();
        while(rowElementsIterator.hasNext()){
            var companyRowElement = rowElementsIterator.next();
            
            var companyRowId = companyRowElement.attr('id');
            var companyId = companyRowElement.data('companyid');
            var companyName = companyRowElement.data('companyname');

            var companyModel = new CompanyModel();
            companyModel.init(companyId, companyName);

            companies.add(companyId, companyModel);

            companyRowElement.find('.companyTextData').each(function(){
                var companyDataKey = $(this).attr('id');

                switch(companyDataKey){

                    case 'benefitsText':
                        companyModel.setBenefitsText($(this).html());
                        break;
                    case 'limitationsText':
                        companyModel.setLimitationsText($(this).html());
                        break;

                    case 'rateTableGuideText':
                        companyModel.setRateTableGuide($(this).text());
                        break;
                    case 'scccText':
                        companyModel.setSCCC($(this).text());
                        break;
                    case 'standartRatesText':
                        companyModel.setStandardRates($(this).text());
                        break;
                    case 'deductibleAmountOptionsText':
                        companyModel.setDeductibleAmountOptions($(this).text());
                        break;
                    case 'benefitsCollection':
                        companyModel.setBenefits($(this).text());
                        break;
                    case 'deductiblesCollection':
                        companyModel.setDeductibles($(this).text());
                        break;
                    case 'familyRateMaxAgeText':
                        companyModel.setFamilyRateMaxAge(parseInt($(this).text()));
                        break;
                    case 'familyRatePremiumTable':
                        companyModel.setFamilyRatePremiumTable($(this).text());
                        break;
                }
            });
        }
    }

    function createCompanyRow(companyModel){
        var companyURL = urls.get(companyModel.getName());
        companyModel.setUrl(companyURL);
        var companyTableRowView = new CompanyTableRowView();
        var row = companyTableRowView.create(companyModel);
        row.appendTo($('#companiesTable'));
    }

    function addFamilyRateListener(){
        EventBus.addEventListener('FAMILY_RATE_DETECTED', familyRateDetectedHandler);
    }

    function familyRateDetectedHandler(event){
        var ages = event.ages;

        $('#familyRateInfo').show();
        $('#familyRateInfo').text('Family rate. Ages: '+ages);
    }

    function getUrls(){
        var urlsJson = $('#urls').text();
        var urlsObject = JSON.parse(urlsJson);
        urls = parseUrls(urlsObject);
    }

    function parseUrls(urlsObject){
        var map = new Map('urls');
        for(var property in urlsObject){
            map.add(property, urlsObject[property]);
        }
        return map;
    }

    return{
        getData:function(){

            addFamilyRateListener();
            getRowElements();
            parseCompanies();
            return companies;
        },
        setData:function(data){
            urls = new Map('urls');
            getUrls();
            removeRows();

            var companiesDataIterator = data.getIterator();
            while(companiesDataIterator.hasNext()){
                var companyModel = companiesDataIterator.next();
                createCompanyRow(companyModel);
            }
        }
    }
}

// AgeInputRow
var AgeInputRow = function(){

    var $ = jQuery.noConflict();

    var savedAges;

    function createListener(){
        $('[id*="ageRow_"]').click(function(){
            var id = parseId($(this).attr('id'));
            var rowState = $(this).data('rowstate');
        });

        EventBus.addEventListener('SAVED_AGES_CHANGED', onSavedAgesChangedHandler);
    }

    function onSavedAgesChangedHandler(event){
        savedAges = parseSavedAges(event.data);
        updateAgeSelectElements();
    }

    function parseId(string){
        return string.substring(7, string.length);
    }

    function onLegendClick(){

    }

    function parseSavedAges(ages){
        if(typeof ages === 'string' || ages instanceof String){
            ages = ages.replace(/\\/g, '');
            return JSON.parse(ages);
        }
        else{
            return ages;
        }
    }

    function updateAgeSelectElements(){
        for(var i=0; i<savedAges.length; i++){
            var id = i;
            var element = $('#agesSelect_'+id).val(savedAges[i]);
        }
    }
    
    return{
        init:function(){
            createListener();
        }
    }
}

// AgesSelection
var AgesSelection = function(){
    var $ = jQuery.noConflict();

    var ageRowsElements = new Map('agesElements');
    var elementIds;
    var agesArray = new Array();
    var dataContainerElement;

    function numPersonsChangedHandler(event) {
        onNumPersonsChanged(event.data);
    }

    function onNumPersonsChanged(totalPersons){
        showRows(totalPersons);
    }

    function showRows(total){
        for(var i = elementIds.length - 1; i > -1; i--){
            var element = ageRowsElements.get(elementIds[i]);

            if(i < total){
                element.removeClass('invisible');
                var age = $('#agesSelect_'+i).val();
                onAgeChanged(i, age);
            }
            else{
                clearAgeSelect(i);
                clearBirthdaySelect(i);
                onAgeRemoved(i);
                element.addClass('invisible');
            }
        }
    }

    function clearAgeSelect(id){
        $('#agesSelect_'+id).val(0);
    }
    function clearBirthdaySelect(id){
        $('#ageCalendarInput_'+id).val('');
    }

    function getRowElements(){
        $('.ageRow').each(function( index ) {
            var rowElementId = $( this ).attr('id');
            rowElementId = rowElementId.replace('ageRow_','');
            addAgeRowElementToCollection(rowElementId, $( this ));
        });
        getRowsIDs();
    }

    function getRowsIDs(){
        elementIds = ageRowsElements.getKeys();
    }

    function addAgeRowElementToCollection(id, element){
        ageRowsElements.add(id, element);
    }

    function ageChangedHandler(event){
        var id = event.id;
        var value = event.value;
        onAgeChanged(id, value);
    }

    function onAgeRemoved(id){
        agesArray.splice(id, 1);

        updateDataContainer();
    }

    function onAgeChanged(id, age){
        agesArray[id] = age;
        updateDataContainer();
    }

    function onSavedAgesChangedHandler(event){
        var savedAges = parseSavedAges(event.data);
        for(var i=0; i<savedAges.length; i++){
            onAgeChanged(i, savedAges[i]);
        }
    }

    function parseSavedAges(ages){
        if(typeof ages === 'string' || ages instanceof String){
            ages = ages.replace(/\\/g, '');
            return JSON.parse(ages);
        }
        else{
            return ages;
        }
    }

    function updateDataContainer(){
        dataContainerElement.val(JSON.stringify(agesArray));
    }

    function getDataContainer(){
        dataContainerElement = $('#ages');
    }

    function addAgesSelectorsListener() {
        // СТРАХ !!!
        // iterate over all selects with partial id
        $('select[id^="agesSelect_"]').each(function(index){
            var select = $(this);

            // listen to select changed event
            select.on('change',function(){
                var id = index;
                var age = $(this).val();
                onAgeChanged(id, age);

                // clear birthday input
                clearBirthdayInput(id);
            });
        });
    }

    function clearBirthdayInput(id){
        $('#ageCalendarInput_'+id).val('');
    }

    return{
        init:function(){
            getDataContainer();
            getRowElements();
            
            showRows(1);
            updateDataContainer();
            addAgesSelectorsListener();

            EventBus.addEventListener('NUM_PERSONS_CHANGED', numPersonsChangedHandler);
            EventBus.addEventListener('ON_AGE_CHANGED', ageChangedHandler);
            EventBus.addEventListener('SAVED_AGES_CHANGED', onSavedAgesChangedHandler);
        }
    }
}

// UseSccc
var UseSccc = function(){
    var $ = jQuery.noConflict();
    function addListener(){
        EventBus.addEventListener('SAVED_USE_SCCC_CHANGED', onUseScccSavedDataHandler);
    }
    function onUseScccSavedDataHandler(event){
        updateRadioGroup(event.data);
    }
    function updateRadioGroup(value){
        $("input[name=scccCovering][value=" + value + "]").attr('checked', 'checked');
    }
    return{
        init:function(){
            addListener();
        }
    }
}

// NumPersons
var NumPersons = function(){
    var $ = jQuery.noConflict();
    function onSavedNumPersonsHandler(event){
        $('#numPersonsSelect').val(event.data);
        EventBus.dispatchEvent('NUM_PERSONS_CHANGED', {data:event.data});
    }
    return{
        init:function(){
            EventBus.addEventListener('SAVED_NUM_PERSONS_CHANGED', onSavedNumPersonsHandler);

            $('#numPersonsSelect').change(function(){
                EventBus.dispatchEvent('NUM_PERSONS_CHANGED', {data:$(this).val()});
            });
        }
    }
}

// StartDateCalendar
var StartDateCalendar = function(){
    var $ = jQuery.noConflict();
    function updateInputs(year, month, day){
        $('#startDateMonth').val(month);
        $('#startDateYear').val(year);
        $('#startDateDay').val(day);
    }
    
    function onChange(dateText){
        var dateArray = DateUtils.parseToArray(dateText);
        var year = dateArray[0];
        var month = dateArray[1];
        var day = dateArray[2];
        updateInputs(year, month, day);
    }

    function addListener(){
        EventBus.addEventListener('SAVED_START_DATE_CHANGED', onSavedStartDateChangedHandler);
    }
    function onSavedStartDateChangedHandler(event){
        var parsedDate = DateUtils.parseDate(event.data.date);
        $( "#startDateCalendarContainer").val(parsedDate);
        onChange(parsedDate);
    }
    return{
        init:function(){
            try{
                var currentDate = DateUtils.getCurrentDate();
                $( "#startDateCalendarContainer" ).val(currentDate);
                $( "#startDateCalendarContainer" ).datepicker({onSelect: function(dateText) {
                    onChange(dateText);
                }, minDate: 0, defaultDate: new Date()});
                onChange(DateUtils.getCurrentDate());
                addListener();
            }
            catch(error){

            }
        }
    }
};

// FinishDateCalendar
var FinishDateCalendar = function(){
    var $ = jQuery.noConflict();
    function updateInputs(year, month, day){
        $('#finishDateMonth').val(month);
        $('#finishDateYear').val(year);
        $('#finishDateDay').val(day);
    }
    function onChange(dateText){
        var dateArray = DateUtils.parseToArray(dateText);
        var year = dateArray[0];
        var month = dateArray[1];
        var day = dateArray[2];
        updateInputs(year, month, day);
    }
    function addListener(){
        EventBus.addEventListener('SAVED_FINISH_DATE_CHANGED', onSavedFinishDateChangedHandler);
    }
    function onSavedFinishDateChangedHandler(event){
        var parsedData = DateUtils.parseDate(event.data.date);
        $( "#finishDateCalendarContainer").val(parsedData);
        onChange(parsedData);
    }
    return{
        init:function(){

            try{
                var tomorrowDate = DateUtils.getTomorrowDate();
                var tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                $( "#finishDateCalendarContainer" ).val(tomorrowDate);
                $( "#finishDateCalendarContainer" ).datepicker({onSelect: function(dateText) {
                    onChange(dateText);
                }, minDate: +1, defaultDate: tomorrow});
                onChange(tomorrowDate);
                addListener();
            }
            catch(error){

            }
        }
    }
}


// BenefitsSelectionForm
var BenefitsSelectionForm = function(){
    var $ = jQuery.noConflict();
    var selectedBenefit = 1;
    var selectedBenefitRow;
    function updateInput(){
        $('#selectedBenefitInput').val(selectedBenefit);
    }
    function submitForm(){
        Cookie.setBenefit(selectedBenefit);
        $('#benefitSelectionForm').submit();
    }
    function addListener(){
        $('#benefitsSelectionForm > tbody  > tr').not(':first').each(function() {
            $(this).hover(
                function () {
                    $(this).addClass('itemHovered');
                },
                function () {
                    $(this).removeClass('itemHovered');
                });

            $(this).click(function(){
                var newBenefit = $(this).attr('id');
                if(newBenefit!=selectedBenefit){
                    selectedBenefit = newBenefit;
                    updateInput();
                    try{
                        selectedBenefitRow.removeClass('itemSelected');
                    }
                    catch(error){
                    }
                    selectedBenefitRow = $(this);
                }
                $(this).addClass('itemSelected');
                submitForm();
            });
        });
    }
    function selectBenefit(index){
        var benefitRow = $( "#benefitsSelectionForm > tbody  > tr").eq(index);
        selectedBenefit = benefitRow.attr('id');
        benefitRow.addClass('itemSelected');
        selectedBenefitRow = benefitRow;
    }
    function getBenefitIndexByValue(value){
        var selectedIndex = -1;
        $('#benefitsSelectionForm > tbody  > tr').not(':first').each(function(index) {
            var benefit = $(this).attr('id');
            if(parseInt(benefit) == parseInt(value)){
                selectedIndex = index;
            }
        });
        return selectedIndex;
    }
    return{
        init:function(_selectedBenefit){
            addListener();
            var defaultSelectedIndex = 1;
            if(_selectedBenefit){
                selectedBenefit = _selectedBenefit;
                defaultSelectedIndex = getBenefitIndexByValue(selectedBenefit);
                defaultSelectedIndex+=1;
            }
            selectBenefit(defaultSelectedIndex);
            updateInput();
        }
    }
}

// CompanyPlanSelectionForm
var CompanyPlanSelectionForm = (function (_super) {
    __extends(CompanyPlanSelectionForm, _super);
    function CompanyPlanSelectionForm(selectedItem, inputElementId, formId, tableId) {
        _super.call(this, selectedItem, inputElementId, formId, tableId);
    }
    // override
    CompanyPlanSelectionForm.prototype.submitForm = function () {
        EventBus.dispatchEvent("COMPANY_PLAN_SELECTED", { deductible: this.selectedItem });
    };
    return CompanyPlanSelectionForm;
}(SelectionForm));


// UserDataInputForm
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

// ResultTableEmail
var ResultTableEmail = function(){
    var $ = jQuery.noConflict();
    var button;
    var content;
    var urls;
    var emailData;
    var receiverEmail;
    function getReceiverEmail(){
        return $('#emailInput').val();
    }
    function validateReceiverEmail(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    function addButtonListener(){
        button.click(function(){
            receiverEmail = getReceiverEmail();
            var emailValid = validateReceiverEmail(receiverEmail);
            if(emailValid){
                var data = {'action':'sendResultFormEmail', 'data':emailData, receiver:receiverEmail};
                $.post(ajaxurl, data, function(response) {
                    console.log("email sending response: "+response);
                    var responseData = JSON.parse(response);
                    var result = responseData.result;

                    if(result == "complete"){
                        showDialog("Email sent");
                    }
                    else{
                        showDialog("Error sending email");
                    }
                });
            }
            else{
                alert('Email address not valid.');
            }
        })
    }
    function showDialog(content){
        var dialogContent = $("<div>"+content+"</div>");
        dialogContent.dialog({modal: true, buttons: [
            {
                text: "Ok", click: function (event) {
                dialogContent.dialog("close");
            }
            }
        ]});
    }
    function removeHiddenAgesContainer(){
        $('#urls').remove();
    }

    function createCompanyPlanContent(sourceRowElement, resultRowElement){
        var plan = new Array();
        var  planTableElement= $('<table><tbody><tr><td>Deductible</td><td>Premium</td></tr></tbody>');
        planTableElement.appendTo(resultRowElement);

        sourceRowElement.find('.companyBenefitAndCost').each(function(){
            var benefitAndCostElement = $(this);
            var benefit = benefitAndCostElement.find('.benefit').text();
            var benefitCost = benefitAndCostElement.find('.benefitCost').text();
            plan.push({benefit:benefit, cost:benefitCost});
        });
        return plan;
    }

    function createTableJson(){
        var testTableContainer = $("#testTableContainer");
        var container = $('<div>');
        container.appendTo(testTableContainer);
        var table = $('<table style="border-bottom: 1px solid #ddd;"><tbody><tr><td style="width: 200px; text-align: center;"><b>Plan</b></td><td style="width: 300px; text-align: center;"><b>Exclusions and Limitations</b></td><td style="width: 300px; text-align: center;"><b>Benefits</b></td></tr></tbody>');
        table.appendTo(container);
        var userDataInfo = $('.userDataSelectionInfoContainer').text();
        var companies = new Array();

        $('.companyTableRow').each(function(){
            var sourceCompanyTableRowElement = $(this);
            var companyName = sourceCompanyTableRowElement.data('companyname');
            var companyUrl = sourceCompanyTableRowElement.find('#readMoreLink').attr('href');
            var companyTableRow = $('<tr>');
            var companyNameElement = $('<td style="width: 200px; text-align: center;"><b style="color: #bd070f">'+companyName+"</b></td>");
            companyNameElement.appendTo(companyTableRow);
            companyTableRow.appendTo(table);
            var companyPlan = createCompanyPlanContent(sourceCompanyTableRowElement, companyNameElement);
            var benefitsText = sourceCompanyTableRowElement.find('#benefitsText').html();
            var limitationsText = sourceCompanyTableRowElement.find('#limitationsText').html();
            companies.push({name:companyName, url:companyUrl, plan:companyPlan, benefits:benefitsText, limitations:limitationsText });
        });
        var emailData = {userDataInfo: userDataInfo, companies:companies};
        emailData = JSON.stringify(emailData);
        return emailData;
    }

    return{
        init:function(){
            button = $("#sendEmailButton");
            addButtonListener();
            emailData = createTableJson();
            content = $("#resultPageContent").html();
        }
    }
}

// BasePage
var BasePage = (function () {
    function BasePage() {
        this.$j = jQuery.noConflict();
    }
    BasePage.prototype.getPersons = function () {
        var personsData = Cookie.getPersons();
        var parsedPersonsData = StringUtils.parseURI(personsData);
        var mapJsonDecoder = new MapJsonDecoder(JSON.stringify(parsedPersonsData));
        var decodedMap = mapJsonDecoder.decode();
        return this.parsePersons(decodedMap);
    };
    BasePage.prototype.parsePersons = function (source) {
        var collection = new QuotePersonCollection();
        var iterator = source.getIterator();
        while (iterator.hasNext()) {
            var personData = iterator.next();
            var age = personData._age;
            var firstName = personData._firstName;
            var lastName = personData._lastName;
            var gender = personData._gender;
            var relationship = personData._relationship;
            var questions = personData._questions;
            var birthday = personData._birthday;
            var complete = personData._complete;
            var useSCCC = personData._useSCCC;
            var period = personData._period;
            var medicalDeclarationRequired = personData._medicalDeclarationRequired;
            var person = new QuotePerson(age, firstName, lastName, gender, relationship, birthday, questions);
            person.setIsComplete(complete);
            person.setIsUseSCCC(useSCCC);
            person.setPeriod(period);
            person.setMedicalDeclarationRequired(medicalDeclarationRequired);
            collection.add(person);
        }
        return collection;
    };
    return BasePage;
}());

// PersonDetailsErrorView
var PersonDetailsErrorView = (function () {
    function PersonDetailsErrorView(container) {
        this.container = container;
    }
    PersonDetailsErrorView.prototype.showAnswerError = function () {
        this.container.text("Error. You must answer YES at least the first question !");
        this.container.removeClass("hidden");
    };
    PersonDetailsErrorView.prototype.showConfirmationError = function () {
        this.container.text("Error. You must confirm all data !");
        this.container.removeClass("hidden");
    };
    PersonDetailsErrorView.prototype.destroy = function () {
        this.container.addClass("hidden");
        this.container.text("");
    };
    return PersonDetailsErrorView;
}());

// PersonQuestionsView
var PersonQuestionsView = (function () {
    function PersonQuestionsView(person, companyId) {
        this.hasAnsweredSavedQuestions = false;
        this.$j = jQuery.noConflict();
        this.person = person;
        this.companyId = companyId;
        this.createChildren();
    }
    PersonQuestionsView.prototype.destroy = function () {
        this.$j("#questionsRootContainer").empty();
    };
    PersonQuestionsView.prototype.isValid = function () {
        var validator = new PersonMedicalDeclarationAnswerValidator(this.userQuestionsView.getData());
        return validator.validate();
    };
    PersonQuestionsView.prototype.getAnswers = function () {
        return this.person.getQuestions().getEncoder().encode();
    };
    PersonQuestionsView.prototype.createChildren = function () {
        this.$j("#personHeaderContainer").show();
        this.$j("#confirmationHeaderContainer").hide();
        this.$j("#personHeaderContainer").text(this.person.getFirstName() + "   " + this.person.getLastName());
        this.$j("#firstNameContainer").text(this.person.getFirstName());
        this.$j("#lastNameContainer").text(this.person.getLastName());
        this.$j("#genderContainer").text(this.person.getGender());
        this.$j("#dateOfBirthContainer").text(this.person.getBirthday());
        this.$j("#ageContainer").text(this.person.getAge());
        this.getQuestions();
    };
    PersonQuestionsView.prototype.getQuestions = function () {
        var questionsLoaded = this.questionsIsLoaded();
        if (!questionsLoaded) {
            this.loadQuestions();
        }
        else {
            this.createSavedQuestionsFrontend();
        }
    };
    PersonQuestionsView.prototype.onQuestionsLoadComplete = function (response) {
        this.$j("#questionsPreloaderTextContainer").addClass("hidden");
        var personQuestions;
        var dataDecoder = new MapJsonDecoder(response);
        var map = dataDecoder.decode();
        var parsedQuestions = QuestionCollectionParser.parse(map, '');
        console.log("this.person.getMedicalDeclarationRequired()=" + this.person.getMedicalDeclarationRequired());
        if (!this.person.getMedicalDeclarationRequired()) {
            var collectionCutter = new QuestionCollectionCutter(parsedQuestions);
            var cuttedQuestions = collectionCutter.getQuestionsBeforeFirstBoolean();
            personQuestions = cuttedQuestions;
        }
        else {
            personQuestions = parsedQuestions;
        }
        var encodedQuestionsData = personQuestions.getEncoder().encode();
        this.userQuestionsView = new FrontendUserQuestions(encodedQuestionsData, "questionsRootContainer");
        this.person.setQuestions(this.userQuestionsView.getData());
    };
    PersonQuestionsView.prototype.questionsIsLoaded = function () {
        return !this.$j.isEmptyObject(this.person.getQuestions());
    };
    PersonQuestionsView.prototype.loadQuestions = function () {
        var _this = this;
        this.$j("#questionsPreloaderTextContainer").removeClass("hidden");
        var data = { 'action': 'loadQuestions', 'companyId': this.companyId };
        this.$j.post(ajaxurl, data, function (response) { return _this.onQuestionsLoadComplete(response); });
    };
    PersonQuestionsView.prototype.createSavedQuestionsFrontend = function () {
        var savedQuestionsData = this.person.getQuestions().getEncoder().encode();
        this.userQuestionsView = new FrontendUserQuestions(savedQuestionsData, "questionsRootContainer");
        this.person.setQuestions(this.userQuestionsView.getData());
    };
    return PersonQuestionsView;
}());

// PersonConfirmationView
var PersonConfirmationView = (function () {
    function PersonConfirmationView(person) {
        this.$j = jQuery.noConflict();
        this.person = person;
        this.containerId = "questionsRootContainer";
        this.createChildren();
    }
    PersonConfirmationView.prototype.destroy = function () {
        this.$j("#" + this.containerId).empty();
    };
    PersonConfirmationView.prototype.isValid = function () {
        return this.confirmCheckBox.is(':checked');
    };
    PersonConfirmationView.prototype.createChildren = function () {
        this.$j("#personHeaderContainer").hide();
        this.$j("#confirmationHeaderContainer").show();
        this.createConfirmCheckBox();
        this.updatePersonPrivateDetails();
        this.$j("#" + this.containerId).append(this.checkBoxContainer);
    };
    PersonConfirmationView.prototype.createConfirmCheckBox = function () {
        this.confirmCheckBox = this.$j('<input type="checkbox" id="confirmCheckBox">  <label for="confirmCheckBox" class="text-success"> I confirm all this data !</label><br/>');
        this.checkBoxContainer = this.$j("<div style='width:100%; text-align: center; display:inline-block; text-align: center;' id='cont'>").append(this.confirmCheckBox);
    };
    PersonConfirmationView.prototype.updatePersonPrivateDetails = function () {
        this.$j("#personHeaderContainer").text(this.person.getFirstName() + "   " + this.person.getLastName());
        this.$j("#firstNameContainer").text(this.person.getFirstName());
        this.$j("#lastNameContainer").text(this.person.getLastName());
        this.$j("#genderContainer").text(this.person.getGender());
        this.$j("#dateOfBirthContainer").text(this.person.getBirthday());
        this.$j("#ageContainer").text(this.person.getAge());
    };
    return PersonConfirmationView;
}());

// PersonConfirmationAnswersView
var PersonConfirmationAnswersView = (function (_super) {
    __extends(PersonConfirmationAnswersView, _super);
    function PersonConfirmationAnswersView(person) {
        _super.call(this, person);
    }
    PersonConfirmationAnswersView.prototype.createChildren = function () {
        var answeredQuestions = this.person.getQuestions();
        this.answers = answeredQuestions.getEncoder().encode();
        this.loadAnswers();
        _super.prototype.createChildren.call(this);
    };
    PersonConfirmationAnswersView.prototype.loadAnswers = function () {
        this.answersView = new FrontendUserAnswers(this.answers, this.containerId);
    };
    return PersonConfirmationAnswersView;
}(PersonConfirmationView));

// PersonMedicalDeclarationAnswerValidator
var PersonMedicalDeclarationAnswerValidator = (function () {
    function PersonMedicalDeclarationAnswerValidator(questions) {
        this.questions = questions;
    }
    // предпологается что первый вопрос это всегда TextView, а первый вложенный в него это вопрос с типом ответа boolean
    PersonMedicalDeclarationAnswerValidator.prototype.validate = function () {
        var firstRootQuestionGetter = new FirstRootQuestion(this.questions);
        var firstRootQuestionAnswer = firstRootQuestionGetter.getAnswer();
        if (firstRootQuestionAnswer && firstRootQuestionAnswer.getType() == ObjectType.BOOLEAN_ANSWER) {
            var firstSubQuestionAnswerValue = firstRootQuestionAnswer.getValue();
            return firstSubQuestionAnswerValue == "Yes" ? true : false;
        }
        else {
            console.error("First sub question is not boolean.");
            return false;
        }
    };
    return PersonMedicalDeclarationAnswerValidator;
}());

// PageFactory
var PageFactory = (function () {
    function PageFactory() {
    }
    PageFactory.create = function (type) {
        console.log("PageFactory create by type " + type);
        if (type == "companiesTablePage") {
            return new CompaniesByUserDataPageTS();
        }
        else if (type == "benefitsByUserDataAndZeroDeductiblePage") {
            return new BenefitSelectionPage();
        }
        else if (type == "personDetailsPage") {
            return new PersonDetailsPage();
        }
        else if (type == "cardDetailsPage") {
            return new CardDetailsPage();
        }
        else if (type == "medicalIssuesSelectionPage") {
            console.log("create MedIssuesSelectionPage");
            return new MedIssuesSelectionPage();
        }
        else if (type == "applicationCreationPage") {
            return new ApplicationCreationPage();
        }
        else if (type == "applicationFinishPage") {
            return new ApplicationFinishPage();
        }
        else if (type == "sendResultEmailPage") {
            return new SendResultEmailPage();
        }
        else if (type == "companyPlanSelection") {
            return new CompanyPlanSelectionPage();
        }
        else if (type == "simplePage") {
            return new UserInputFormPage();
        }
        else if (type == "datePickerYearAndMonthOnlyTestingPage") {
            return new DatePickerYearAndMonthOnlyTestingPage();
        }
        else if (type == "quizTestingPage") {
            console.log("Loading Quiz testing page...");
            return new QuizTestingPage();
        }
    };
    return PageFactory;
}());

// PersonalInfoRequestView
var PersonalInfoRequestView = (function () {
    // TODO привести сюда QuotePerson вместо объекта
    function PersonalInfoRequestView(personData) {
        this.$j = jQuery.noConflict();
        this.age = personData.age;
        this.firstName = personData.firstName;
        this.lastName = personData.lastName;
        this.gender = personData.gender;
        this.relationship = personData.relationship;
        this.birthday = personData.birthday;
        this.firstNameValid = false;
        this.lastNameValid = false;
        this.dateOfBirthValid = false;
        this.relationshipValid = false;
        this.dateOfBirth = "";
        this.createChildren();
    }
    PersonalInfoRequestView.prototype.validate = function () {
        this.firstName = this.firstNameInput.val();
        this.lastName = this.lastNameInput.val();
        this.gender = this.genderSelect.val();
        this.dateOfBirth = this.dateSelect.val();
        this.firstNameValid = this.isFirstNameValid();
        this.lastNameValid = this.isLastNameValid();
        this.dateOfBirthValid = this.isBirthdayValid();
        if (!this.firstNameValid) {
            EventBus.dispatchEvent("PERSONAL_INFO_FIRST_NAME_VALIDATE_ERROR", this.age);
            this.showFirstNameError();
        }
        else if (!this.lastNameValid) {
            EventBus.dispatchEvent("PERSONAL_INFO_LAST_NAME_VALIDATE_ERROR", this.age);
            this.showLastNameError();
        }
        else if (!this.dateOfBirthValid) {
            EventBus.dispatchEvent("PERSONAL_INFO_BIRTHDAY_VALIDATE_ERROR", this.age);
            this.showDateOfBirthError();
        }
    };
    PersonalInfoRequestView.prototype.isValid = function () {
        this.validate();
        if (this.firstNameValid && this.lastNameValid && this.dateOfBirthValid) {
            return true;
        }
        else {
            return false;
        }
    };
    PersonalInfoRequestView.prototype.dropError = function () {
        this.hideFirstNameError();
        this.hideLastNameError();
        this.hideDateOfBirthError();
    };
    PersonalInfoRequestView.prototype.getData = function () {
        var userData = { age: this.age, firstName: this.firstName, lastName: this.lastName, gender: this.gender, birthday: this.dateOfBirth, relationship: this.$j("#relationship_" + this.age).val() };
        return userData;
    };
    PersonalInfoRequestView.prototype.createChildren = function () {
        var _this = this;
        this.lastNameInput = this.$j('#lastname_' + this.age);
        this.firstNameInput = this.$j('#firstname_' + this.age);
        this.relationshipInput = this.$j("#relationship_" + this.age);
        this.firstNameErrorText = this.$j('#firstNameErrorText_' + this.age);
        this.lastNameErrorText = this.$j('#lastNameErrorText_' + this.age);
        this.dateOfBirthErrorText = this.$j('#dateOfBirthErrorText_' + this.age);
        this.genderSelect = this.$j('#genderSelect_' + this.age);
        this.dateSelect = this.$j('#dateOfBirthSelect_' + this.age);
        this.lastNameInput.keydown(function () { return _this.lastNameChangedHandler(); });
        this.firstNameInput.keydown(function () { return _this.firstNameChangedHandler(); });
        if (this.firstName) {
            this.firstNameInput.val(this.firstName);
        }
        if (this.lastName) {
            this.lastNameInput.val(this.lastName);
        }
        if (this.relationship) {
            this.relationshipInput.val(this.relationship);
        }
        if (this.birthday) {
            this.dateSelect.val(this.birthday);
        }
        this.createDateSelector();
    };
    PersonalInfoRequestView.prototype.createDateSelector = function () {
        var _this = this;
        this.dateSelect.datepicker({
            maxDate: 0,
            changeMonth: true,
            changeYear: true,
            yearRange: '-99:+0',
            defaultDate: new Date(),
            onSelect: function (dateText) { return _this.dateOfBirthSelected(dateText); }
        });
    };
    PersonalInfoRequestView.prototype.isBirthdayValid = function () {
        var validator = new TextLengthValidator(this.dateOfBirth);
        var isNotEmpty = validator.validate(1);
        var calculatedAge = DateUtils.getYearsFromDate(this.dateOfBirth);
        if (calculatedAge != this.age) {
            return false;
        }
        return isNotEmpty;
    };
    PersonalInfoRequestView.prototype.isFirstNameValid = function () {
        var validator = new TextLengthValidator(this.firstName);
        return validator.validate(1);
    };
    PersonalInfoRequestView.prototype.isLastNameValid = function () {
        var validator = new TextLengthValidator(this.lastName);
        return validator.validate(1);
    };
    PersonalInfoRequestView.prototype.showFirstNameError = function () {
        this.$j("#firstNameRow_" + this.age).css("color", "#a94442");
        this.$j("#firstNameError_" + this.age).removeClass("hidden");
        this.$j("#firstNameContainer_" + this.age).addClass("has-error has-feedback");
    };
    PersonalInfoRequestView.prototype.hideFirstNameError = function () {
        this.$j("#firstNameRow_" + this.age).css("color", "");
        this.$j("#firstNameError_" + this.age).addClass("hidden");
        this.$j("#firstNameContainer_" + this.age).removeClass("has-error has-feedback");
    };
    PersonalInfoRequestView.prototype.showLastNameError = function () {
        this.$j("#lastNameRow_" + this.age).css("color", "#a94442");
        this.$j("#lastNameError_" + this.age).removeClass("hidden");
        this.$j("#lastNameContainer_" + this.age).addClass("has-error has-feedback");
    };
    PersonalInfoRequestView.prototype.hideLastNameError = function () {
        this.$j("#lastNameRow_" + this.age).css("color", "");
        this.$j("#lastNameError_" + this.age).addClass("hidden");
        this.$j("#lastNameContainer_" + this.age).removeClass("has-error has-feedback");
    };
    PersonalInfoRequestView.prototype.showDateOfBirthError = function () {
        this.$j("#birthdayRow_" + this.age).css("color", "#a94442");
        this.$j("#birthdayError_" + this.age).removeClass("hidden");
        this.$j("#birthdayContainer_" + this.age).addClass("has-error has-feedback");
        this.$j("#dateOfBirthSelect_" + this.age).val("").attr("placeholder", "Empty or not " + this.age + " y.o.").addClass("dateInputError_webkit").addClass("dateInputError_moz").addClass("dateInputError_moz_2").addClass("dateInputError_ms");
    };
    PersonalInfoRequestView.prototype.hideDateOfBirthError = function () {
        this.$j("#birthdayRow_" + this.age).css("color", "");
        this.$j("#birthdayError_" + this.age).addClass("hidden");
        this.$j("#birthdayContainer_" + this.age).removeClass("has-error has-feedback");
        this.$j("#dateOfBirthSelect_" + this.age).attr("placeholder", "Click to pick date of birth").removeClass("dateInputError_webkit").removeClass("dateInputError_moz").removeClass("dateInputError_moz_2").removeClass("dateInputError_ms");
    };
    PersonalInfoRequestView.prototype.lastNameChangedHandler = function () {
        this.hideLastNameError();
        this.dispatchValueChanged();
    };
    PersonalInfoRequestView.prototype.firstNameChangedHandler = function () {
        this.hideFirstNameError();
        this.dispatchValueChanged();
    };
    PersonalInfoRequestView.prototype.dateOfBirthSelected = function (dateText) {
        this.hideDateOfBirthError();
        this.dispatchValueChanged();
    };
    PersonalInfoRequestView.prototype.dispatchValueChanged = function () {
        EventBus.dispatchEvent("PERSONAL_INFO_VALUE_CHANGED", null);
    };
    return PersonalInfoRequestView;
}());

// CompaniesByUserDataPageTS
var CompaniesByUserDataPageTS = (function (_super) {
    __extends(CompaniesByUserDataPageTS, _super);
    function CompaniesByUserDataPageTS() {
        _super.call(this);
        this.prevPage = "benefits-by-user-data-and-zero-deductible";
        this.period = Cookie.getPeriod();
    }
    CompaniesByUserDataPageTS.prototype.create = function () {
        var _this = this;
        EventBus.addEventListener("BUY_ONLINE_BUTTON_CLICKED", function (data) { return _this.onBuyOnlineButtonClickedHandler(data); });
        var pageMarlupResponsability = new PageMarkupResposabilityTS();
        pageMarlupResponsability.removeResponsabilityMarkup();
        this.companiesTable = new CompaniesTable();
        this.companies = this.companiesTable.getData();
        var formDataGetter = new GetFormData();
        var formData = formDataGetter.init();
        var formDataParser = new FormDataParser();
        this.parsedFormData = formDataParser.parse(formData);
        try {
            this.selectedBenefit = this.parsedFormData.benefit;
        }
        catch (error) {
            return;
        }
        //this.selectedBenefit = this.parsedFormData.benefit;
        this.persons = this.getPersons();
        var companiesCostsCalculator = new CompaniesCostsCalculator();
        companiesCostsCalculator.execute(this.persons, this.companies, this.selectedBenefit, this.period);
        var removeEmptyCosts = new RemoveEmptyCosts();
        removeEmptyCosts.execute(this.companies);
        var companiesSort = new SortCompaniesByZeroDeductibleCost();
        var sortedCompanies = companiesSort.sort(this.companies);
        var tableDataProviderCreator = new CreateTableDataProvider();
        var tableDataProvider = tableDataProviderCreator.execute(sortedCompanies);
        this.companiesTable.setData(tableDataProvider);
        var resultTableEmail = new ResultTableEmail();
        resultTableEmail.init();
        this.prevButton = this.$j('#prevButton');
        this.prevButton.on("click", function () { return _this.prevButtonClickHandler(); });
    };
    CompaniesByUserDataPageTS.prototype.prevButtonClickHandler = function () {
        this.navigateToPrevPage();
    };
    CompaniesByUserDataPageTS.prototype.navigateToPrevPage = function () {
        NavigatorUtil.navigateTo(this.prevPage);
    };
    CompaniesByUserDataPageTS.prototype.onBuyOnlineButtonClickedHandler = function (data) {
        var companyData = { companyName: data.name, companyId: data.id, medicalDeclarationRequired: data.medicalDeclarationRequired, benefit: this.selectedBenefit, deductiblesCosts: null };
        this.selectedCompany = this.companies.get(data.id);
        if (this.selectedCompany) {
            var companyDeductiblesCosts = this.selectedCompany.getDeductiblesCosts();
            companyData.deductiblesCosts = companyDeductiblesCosts.getEncoder().encode();
        }
        else {
            console.error("selected company not defined");
        }
        this.saveSelectedCompany(companyData);
        this.navigateToPlanSelectionPage();
    };
    CompaniesByUserDataPageTS.prototype.saveSelectedCompany = function (companyData) {
        var convertedCompanyData = JSON.stringify(companyData);
        Cookie.setSelectedCompanyData(convertedCompanyData);
    };
    CompaniesByUserDataPageTS.prototype.navigateToPlanSelectionPage = function () {
        NavigatorUtil.navigateTo("plan-selection");
    };
    return CompaniesByUserDataPageTS;
}(BasePage));

// TODO удалить после тестов
var QuizTestingPage = (function (_super) {
    __extends(QuizTestingPage, _super);
    function QuizTestingPage() {
        _super.call(this);
    }
    QuizTestingPage.prototype.create = function () {
        var questionsData = this.$j("#sampleQuestions").text();
        console.log("Quiz testing page create...");
        console.log("questions: " + questionsData);
        //new FrontendUserQuestions()
        new FrontendUserQuestions(questionsData, "questionsRootContainer");
    };
    return QuizTestingPage;
}(BasePage));


// PersonDetailsPage
var PersonDetailsPage = (function (_super) {
    __extends(PersonDetailsPage, _super);
    function PersonDetailsPage() {
        _super.call(this);
        this.prevPage = "application-creation";
        this.nextPage = "/medicalissusselectionpage";
        this.QUESTIONS = "QUESTIONS";
        this.CONFIRMATION = "CONFIRMATION";
        this.COMPLETE = "COMPLETE";
        this.PREV_PAGE_REQUESTED = "PREV_PAGE_REQUESTED";
        this.answerInvalidErrorType = "answerInvalid";
        this.confirmationInvalidErrorType = "confirmationInvalid";
    }
    PersonDetailsPage.prototype.create = function () {
        this.companyData = this.getCompany();
        this.parseCompany(this.companyData);
        this.persons = this.getPersons();
        this.currentPerson = this.getUncompletePerson();
        this.onCurrentPersonChanged();
        this.createNavigationListeners();
    };
    PersonDetailsPage.prototype.onCurrentPersonChanged = function () {
        var isUndefined = typeof this.currentPerson == 'undefined';
        if (!isUndefined) {
            this.currentState = this.QUESTIONS;
            this.onStateChanged();
        }
        else {
            this.savePersonsData();
            this.navigateTo(this.nextPage);
        }
    };
    PersonDetailsPage.prototype.savePersonsData = function () {
        var quoteId = Cookie.getQuoteId();
        var personsData = this.persons.getData();
        var decodedPersonsData = escape(personsData);
        //alert("saving persons data quoteId="+quoteId);
        DB.savePersons(decodedPersonsData, quoteId);
    };
    PersonDetailsPage.prototype.getUncompletePerson = function () {
        var personIterator = this.persons.getIterator();
        while (personIterator.hasNext()) {
            var person = personIterator.next();
            if (!person.getIsComplete()) {
                return person;
            }
        }
        return;
    };
    PersonDetailsPage.prototype.onStateChanged = function () {
        if (this.currentState == this.QUESTIONS) {
            this.showQuestions();
        }
        else if (this.currentState == this.CONFIRMATION) {
            this.showConfirmation();
        }
    };
    PersonDetailsPage.prototype.showQuestions = function () {
        this.questionsView = new PersonQuestionsView(this.currentPerson, this.companyId);
    };
    PersonDetailsPage.prototype.hideQuestions = function () {
        if (this.questionsView) {
            this.questionsView.destroy();
        }
    };
    PersonDetailsPage.prototype.showConfirmation = function () {
        this.confirmationView = new PersonConfirmationAnswersView(this.currentPerson);
    };
    PersonDetailsPage.prototype.hideConfirmation = function () {
        if (this.confirmationView) {
            this.confirmationView.destroy();
        }
    };
    PersonDetailsPage.prototype.createNavigationListeners = function () {
        var _this = this;
        this.$j("#nextButton").click(function () { return _this.onNextButtonClick(); });
        this.$j("#prevButton").click(function () { return _this.onPrevButtonClick(); });
    };
    PersonDetailsPage.prototype.onNextButtonClick = function () {
        this.hideError();
        if (this.currentState == this.QUESTIONS) {
            var personMedicalAnswerIsValid = this.questionsView.isValid();
            if (personMedicalAnswerIsValid) {
                this.onQuestionsAnswerValid();
            }
            else {
                this.showError(this.answerInvalidErrorType);
            }
        }
        else if (this.currentState == this.CONFIRMATION) {
            var dataIsValid = this.confirmationView.isValid();
            if (dataIsValid) {
                this.onAnswersConfirmed();
            }
            else {
                this.showError(this.confirmationInvalidErrorType);
            }
        }
    };
    PersonDetailsPage.prototype.onPrevButtonClick = function () {
        var personIterator = this.persons.getIterator();
        var navigateToPrevPageDetector = new NavigateToPrevPageDetector(personIterator);
        var prevPageNavigateRequested = navigateToPrevPageDetector.detect(this.currentState);
        if (prevPageNavigateRequested) {
            this.navigateTo(this.prevPage);
        }
        else {
            this.prevPerson();
        }
    };
    PersonDetailsPage.prototype.prevPerson = function () {
        this.dropCompleteForEachPerson();
        this.hideConfirmation();
        this.hideQuestions();
        this.hideError();
        this.currentPerson = this.getUncompletePerson();
        this.onCurrentPersonChanged();
    };
    PersonDetailsPage.prototype.dropCompleteForEachPerson = function () {
        var personIterator = this.persons.getIterator();
        while (personIterator.hasNext()) {
            var person = personIterator.next();
            person.setIsComplete(false);
        }
    };
    PersonDetailsPage.prototype.onQuestionsAnswerValid = function () {
        this.hideQuestions();
        this.currentState = this.CONFIRMATION;
        this.onStateChanged();
    };
    PersonDetailsPage.prototype.onAnswersConfirmed = function () {
        this.hideConfirmation();
        this.currentPerson.setIsComplete(true);
        this.currentPerson = this.getUncompletePerson();
        this.onCurrentPersonChanged();
    };
    PersonDetailsPage.prototype.navigateTo = function (page) {
        console.log("navigate to " + page);
        //this.$j("#confirmationHeaderContainer").text("Please wait...");
        //this.$j("#personDetailsContainer").hide();
        if (page == "/medicalissusselectionpage") {
            this.$j("#confirmationHeaderContainer").text("Please wait...");
            this.$j("#personDetailsContainer").hide();
            this.$j("#nextButton").hide();
            this.$j("#prevButton").hide();
        }
        NavigatorUtil.navigateTo(page);
    };
    PersonDetailsPage.prototype.getCompany = function () {
        var companyDecodedData = Cookie.getSelectedCompanyData();
        var companyData = StringUtils.parseURI(companyDecodedData);
        return companyData;
    };
    PersonDetailsPage.prototype.parseCompany = function (companyData) {
        this.companyId = companyData.companyId;
    };
    PersonDetailsPage.prototype.hideError = function () {
        if (this.errorView) {
            this.errorView.destroy();
        }
    };
    PersonDetailsPage.prototype.showError = function (type) {
        this.errorView = new PersonDetailsErrorView(this.$j("#userPersonalDataErrorText"));
        if (type == "answerInvalid") {
            this.errorView.showAnswerError();
        }
        else if (type == "confirmationInvalid") {
            this.errorView.showConfirmationError();
        }
    };
    return PersonDetailsPage;
}(BasePage));

// CardDetailsConfirmationView
var CardDetailsConfirmationView = (function () {
    function CardDetailsConfirmationView(card) {
        this.$j = jQuery.noConflict();
        this.card = card;
        this.checkBox = this.$j("#confirmCheckBox");
        this.update();
        // uncheck check box
        this.uncheckCheckBox();
    }
    CardDetailsConfirmationView.prototype.update = function () {
        this.$j("#cardTypeConfirmation").text(this.card.getType());
        this.$j("#cardNumberConfirmation").text(this.card.getNumber());
        this.$j("#cardholderConfirmation").text(this.card.getHolderName());
        this.$j("#cardExpConfirmation").text(this.card.getExpDate());
    };
    CardDetailsConfirmationView.prototype.destroy = function () {
        this.$j("#cardTypeConfirmation").text("");
        this.$j("#cardNumberConfirmation").text("");
        this.$j("#cardholderConfirmation").text("");
        this.$j("#cardExpConfirmation").text("");
        this.uncheckCheckBox();
    };
    CardDetailsConfirmationView.prototype.isConfirmed = function () {
        return this.checkBox.is(':checked');
    };
    CardDetailsConfirmationView.prototype.uncheckCheckBox = function () {
        this.checkBox.prop("checked", false);
    };
    return CardDetailsConfirmationView;
}());

var SaveApplication = (function () {
    function SaveApplication(companyData, quoteId, personsData, persons) {
        console.log("saving application quoteId=", quoteId.getId(), " tempId:", quoteId.getTempValue());
        this.$j = jQuery.noConflict();
        this.companyData = companyData;
        this.quoteId = quoteId;
        this.personsData = personsData;
        this.persons = persons;
        var quoteSaver = new QuoteSaver();
        var period = Cookie.getPeriod();
        var encodedPlanData = Cookie.getCompanyPlan();
        var planData = StringUtils.parseURI(encodedPlanData);
        var encodedFormData = Cookie.getUserInputFormData();
        var formData = StringUtils.parseURI(encodedFormData);
        var startDate = formData.startDate.date;
        var finishDate = formData.finishDate.date;
        startDate = startDate.split("+")[0];
        finishDate = finishDate.split("+")[0];
        var quoteData = JSON.stringify({ company: this.companyData.companyName, benefit: this.companyData.benefit, period: period, deductible: planData.deductible, cost: planData.cost, startDate: startDate, finishDate: finishDate });
        var numPersons = this.persons.size();
        var countryOfOrigin = Cookie.getCountryOfOrigin();
        var visitorType = Cookie.getVisitorType();
        var arrivalDate = Cookie.getArrivalDate();
        var sponsorFirstName = Cookie.getSponsorFirstName();
        var sponsorLastName = Cookie.getSponsorLastName();
        var beneficiaryFirstName = Cookie.getBeneficiaryFirstName();
        var beneficiaryLastName = Cookie.getBeneficiaryLastName();
        var address = Cookie.getAddress();
        var city = Cookie.getSponsorCity();
        var province = Cookie.getSponsorProvince();
        var postalCode = Cookie.getSponsorPostalCode();
        var email = Cookie.getEmail();
        var phone = Cookie.getPhone();
        var applicationType = Cookie.getApplicationType();
        console.log("application type: " + applicationType);
        this.quoteDataToSave = {
            quoteId: this.quoteId.getId(),
            companyName: this.companyData.companyName,
            quoteData: quoteData,
            persons: this.personsData,
            period: period,
            numPersons: numPersons,
            startDate: startDate,
            finishDate: finishDate,
            countryOfOrigin: countryOfOrigin,
            visitorType: visitorType,
            arrivalDate: arrivalDate,
            sponsorFirstName: sponsorFirstName,
            sponsorLastName: sponsorLastName,
            beneficiaryFirstName: beneficiaryFirstName,
            beneficiaryLastName: beneficiaryLastName,
            address: address,
            city: city,
            province: province,
            postalCode: postalCode,
            email: email,
            phone: phone,
            type: applicationType,
            state: "IN_PROGRESS"
        };
        this.$j("#quoteData").val(JSON.stringify(this.quoteDataToSave));
        quoteSaver.save(this.quoteDataToSave);
    }
    return SaveApplication;
}());

// MedIssuesSelectionPage
var MedIssuesSelectionPage = (function (_super) {
    __extends(MedIssuesSelectionPage, _super);
    function MedIssuesSelectionPage() {
        _super.call(this);
        this.prevPage = "person-details";
        this.nextPage = "finish-application";
        console.log("MedIssuesSelectionPage");
    }
    MedIssuesSelectionPage.prototype.create = function () {
        /*
        this.persons = this.getPersons();
        this.companyData = this.getCompany();
        this.createQuoteId();
        this.loadQuotePersonsData();
        console.log("QuoteId: id=", this.quoteId.getId(), "tempValue:", this.quoteId.getTempValue());
        */
        
        this.finishButton = this.$j("#finishButton");
        this.prevButton = this.$j("#prevButton");
        this.payNowButton = this.$j(".wspsc_add_cart_submit");
        this.cartCheckoutButton = this.$j(".wspsc_add_cart_submit");
        console.log("pay now button: ", this.payNowButton);
        this.createButtonsListener();
        this.createRadioGroupListener();
        this.updateApplicationType("NORMAL");
        //this.decorateApplicationIdWithCurrentDate();
        //this.saveApplicationId();
        this.updateApplicationIdContainer();
        //this.updatePayPalCostInput();
    };
    MedIssuesSelectionPage.prototype.loadQuotePersonsData = function () {
        var _this = this;
        EventBus.addEventListener("personsDataLoadComplete", function (data) { return _this.personsDataLoadComplete(data); });
        DB.loadPersons(this.quoteId.getTempValue());
    };
    MedIssuesSelectionPage.prototype.personsDataLoadComplete = function (data) {
        var _this = this;
        EventBus.removeEventListener("personsDataLoadComplete", function (data) { return _this.personsDataLoadComplete(data); });
        this.onPersonDataLoadComplete(data);
    };
    MedIssuesSelectionPage.prototype.onPersonDataLoadComplete = function (data) {
        var dataIsValid = this.validatePersonsLoadedData(data);
        if (dataIsValid) {
            this.personsData = data;
            this.onPersonsDataValid();
        }
        else {
            console.error("persons loaded data not valid. data: " + data);
        }
    };
    MedIssuesSelectionPage.prototype.onPersonsDataValid = function () {
        //console.log("persons data is valid. Data is: ", this.personsData);
        //this.$j("#quoteDate").text(this.$j("#quoteData").val());
        this.createPayNowButtonListener();
        this.createCartCheckoutButtonListener();
        //this.saveApplication();
        //this.onApplicationSaved();
        //this.deletePersonsTempData();
    };
    MedIssuesSelectionPage.prototype.saveApplication = function () {
        new SaveApplication(this.companyData, this.quoteId, this.personsData, this.persons);
    };
    MedIssuesSelectionPage.prototype.createRadioGroupListener = function () {
        var _this = this;
        this.$j('input[type=radio][name=medIssuesRadioGroup]').change(function (event) { return _this.onRadioGroupChanged(event); });
    };
    MedIssuesSelectionPage.prototype.onRadioGroupChanged = function (event) {
        this.selectedOption = parseInt(this.$j(event.target).val());
        this.onOptionChanged();
    };
    MedIssuesSelectionPage.prototype.onOptionChanged = function () {
        if (this.selectedOption == 0) {
            this.finishButton.hide();
            this.$j("#paypalButtonContainer").show();
            this.updateApplicationType("NORMAL");
        }
        else {
            this.finishButton.show();
            this.$j("#paypalButtonContainer").hide();
            this.finishButton.text("Finish");
            this.updateApplicationType("MEDICAL_ISSUES");
        }
    };
    MedIssuesSelectionPage.prototype.createButtonsListener = function () {
        var _this = this;
        this.finishButton.click(function () { return _this.onFinishButtonClick(); });
        this.prevButton.click(function () { return _this.onPrevButtonClick(); });
    };
    MedIssuesSelectionPage.prototype.onFinishButtonClick = function () {
        if (this.selectedOption == 1) {
            this.navigateToNextPage();
        }
    };
    MedIssuesSelectionPage.prototype.onPrevButtonClick = function () {
        this.navigateToPrevPage();
    };
    MedIssuesSelectionPage.prototype.navigateToPrevPage = function () {
        NavigatorUtil.navigateTo(this.prevPage);
    };
    MedIssuesSelectionPage.prototype.navigateToNextPage = function () {
        NavigatorUtil.navigateTo(this.nextPage);
    };
    MedIssuesSelectionPage.prototype.updateApplicationIdContainer = function () {
        this.$j("#applicationIdContainer").text(Cookie.getQuoteId());
    };
    MedIssuesSelectionPage.prototype.getCompany = function () {
        var companyDecodedData = Cookie.getSelectedCompanyData();
        var companyData = StringUtils.parseURI(companyDecodedData);
        return companyData;
    };
    MedIssuesSelectionPage.prototype.updateApplicationType = function (type) {
        console.log("updateApplicationType " + type);
        Cookie.setApplicationType(type);
    };
    MedIssuesSelectionPage.prototype.createQuoteId = function () {
        this.quoteId = new QuoteId();
    };
    MedIssuesSelectionPage.prototype.validatePersonsLoadedData = function (data) {
        var decodedData = unescape(data);
        try {
            var dataJson = JSON.parse(decodedData);
            return true;
        }
        catch (error) {
            return false;
        }
    };
    MedIssuesSelectionPage.prototype.createPayNowButtonListener = function () {
        var _this = this;
        this.payNowButton.click(function (event) { return _this.onPayNowButtonClicked(event); });
    };
    MedIssuesSelectionPage.prototype.onPayNowButtonClicked = function (event) {
        console.log("PAY NOW OR cart checkout BUTTON CLICKED");
        this.saveApplication();
        //return false;
        //event.stopPropagation();
        //return ReadForm(this, true);
    };
    MedIssuesSelectionPage.prototype.createCartCheckoutButtonListener = function () {
        var _this = this;
        console.log("createCartCheckoutButtonListener");

        this.cartCheckoutButton
            .unbind('click') // takes care of jQuery-bound click events
            .attr('onclick', '') // clears `onclick` attributes in the HTML
            .each(function () {
                this.onclick = null;
            });

        //this.cartCheckoutButton.click(function (event) { return _this.onPayNowButtonClicked(event); });
    };
    MedIssuesSelectionPage.prototype.updatePayPalCostInput = function () {
        var totalPremium = this.$j("input[name='totalPremiumValueInput']").val();
        console.log("totalPremium: " + totalPremium);
        this.$j("input[name='price']").val(totalPremium);
    };
    return MedIssuesSelectionPage;
}(BasePage));

// CardDetailsPage
var CardDetailsPage = (function () {
    function CardDetailsPage() {
        this.cardIdMinCharacters = 15;
        this.cardIdMaxCharacters = 16;
        this.prevPage = "person-details";
        this.NORMAL = "NORMAL";
        this.CONFIRMATION = "CONFIRMATION";
        this.CONFIRMED = "CONFIRMED";
        this.$j = jQuery.noConflict();
        this.card = new Card();
        this.card.setType("mastercard");
        this.currentState = this.NORMAL;
    }
    CardDetailsPage.prototype.create = function () {
        this.cardTypeSelect = this.$j("#cardTypeSelect");
        this.cardHolderInput = this.$j("#cardholderNameInput");
        this.cardExpirationDateInput = this.$j("#expirationDateInput");
        this.cardNumberInput = this.$j("#cardNumberInput");
        this.nextButton = this.$j("#nextButton");
        this.prevButton = this.$j("#prevButton");
        this.errorContainer = this.$j("#errorText");
        this.confirmationContainer = this.$j("#confirmationViewContainer");
        this.form = this.$j("#cardDetailsForm");
        if (this.cardExpirationDateInput.val() != "") {
            this.card.setExpDate(this.cardExpirationDateInput.val());
        }
        this.card.setType("mastercard");
        this.createCardTypeSelectListener();
        this.createCardNumberInputListener();
        this.createDateSelector();
        this.createButtonsListener();
    };
    CardDetailsPage.prototype.onStateChanged = function () {
        if (this.currentState == this.NORMAL) {
            this.hideConfirmation();
            this.showForm();
        }
        else if (this.currentState == this.CONFIRMATION) {
            this.hideForm();
            this.showConfirmation();
        }
        else {
            // next page
            this.navigateToNextPage();
        }
    };
    CardDetailsPage.prototype.showConfirmation = function () {
        this.$j("#confirmationViewContainer").removeClass("hidden");
        this.confirmationView = new CardDetailsConfirmationView(this.card);
    };
    CardDetailsPage.prototype.hideConfirmation = function () {
        this.$j("#confirmationViewContainer").addClass("hidden");
        if (this.confirmationView) {
            this.confirmationView.destroy();
            this.confirmationView = null;
        }
    };
    CardDetailsPage.prototype.onNextButtonClick = function () {
        this.hideError();
        var isValid;
        if (this.currentState == this.NORMAL) {
            this.cardHolderName = this.cardHolderInput.val();
            this.cardExpirationDate = this.cardExpirationDateInput.val();
            this.cardNumber = this.cardNumberInput.val();
            this.card.setNumber(this.cardNumber);
            this.card.setHolderName(this.cardHolderName);
            isValid = this.validate();
            if (isValid) {
                this.currentState = this.CONFIRMATION;
                this.onStateChanged();
            }
        }
        else if (this.currentState == this.CONFIRMATION) {
            isValid = this.validate();
            if (isValid) {
                this.currentState = this.CONFIRMED;
                this.onStateChanged();
            }
        }
    };
    CardDetailsPage.prototype.onPrevButtonClick = function () {
        if (this.currentState == this.CONFIRMATION) {
            this.currentState = this.NORMAL;
            this.onStateChanged();
        }
        else if (this.currentState == this.NORMAL) {
            this.navigateToPrevPage();
        }
    };
    CardDetailsPage.prototype.hideError = function () {
        this.errorContainer.text("");
        this.errorContainer.addClass("hidden");
    };
    CardDetailsPage.prototype.showError = function (text) {
        this.errorContainer.text(text);
        this.errorContainer.removeClass("hidden");
    };
    CardDetailsPage.prototype.navigateToNextPage = function () {
        this.form.submit();
    };
    CardDetailsPage.prototype.navigateToPrevPage = function () {
        NavigatorUtil.navigateTo(this.prevPage);
    };
    CardDetailsPage.prototype.onExpirationDateSelected = function (dateText) {
        this.cardExpirationDate = this.cardExpirationDateInput.val();
        this.card.setExpDate(this.cardExpirationDate);
    };
    CardDetailsPage.prototype.createButtonsListener = function () {
        var _this = this;
        this.nextButton.click(function () { return _this.onNextButtonClick(); });
        this.prevButton.click(function () { return _this.onPrevButtonClick(); });
    };
    CardDetailsPage.prototype.validate = function () {
        var isValid = true;
        if (this.currentState == this.NORMAL) {
            return this.validateInfo();
        }
        else if (this.currentState == this.CONFIRMATION) {
            return this.validateConfirmation();
        }
    };
    CardDetailsPage.prototype.validateInfo = function () {
        var isValid = true;
        if (this.cardHolderName.length < 3) {
            this.showError("Card holder name invalid");
            isValid = false;
        }
        var cardNumberMaxChars = parseInt(this.cardNumberInput.attr("maxlength"));
        if (cardNumberMaxChars != this.cardNumber.length) {
            this.showError("Card number invalid");
            isValid = false;
        }
        if (cardNumberMaxChars != this.cardNumber.length) {
            this.showError("Card number invalid");
            isValid = false;
        }
        if (this.cardExpirationDate.length < 1) {
            this.showError("Card expiration date invalid");
            isValid = false;
        }
        return isValid;
    };
    CardDetailsPage.prototype.validateConfirmation = function () {
        console.log("validateConfirmation ");
        var isConfirmed = this.confirmationView.isConfirmed();
        if (isConfirmed == false) {
            this.showError("Error. You must confirm card details.");
        }
        return isConfirmed;
    };
    CardDetailsPage.prototype.clearCardIdInput = function () {
        this.cardNumberInput.val("");
    };
    CardDetailsPage.prototype.createCardNumberInputListener = function () {
        var _this = this;
        this.cardNumberInput.keypress(function (e) { return _this.onCardNumberChanged(e); });
    };
    CardDetailsPage.prototype.onCardNumberChanged = function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            this.onCardNumberError();
            return false;
        }
    };
    CardDetailsPage.prototype.createCardTypeSelectListener = function () {
        var _this = this;
        this.cardTypeSelect.change(function () { return _this.onCardTypeSelectChanged(); });
    };
    CardDetailsPage.prototype.onCardTypeSelectChanged = function () {
        this.cardType = this.cardTypeSelect.val();
        this.card.setType(this.cardType);
        this.$j("#cardTypeFormData").val(this.cardType);
        this.clearCardIdInput();
        switch (this.cardType) {
            case "mastercard":
            case "visa":
                this.cardNumberInput.attr("maxlength", this.cardIdMaxCharacters);
                break;
            case "americanExpress":
                this.cardNumberInput.attr("maxlength", this.cardIdMinCharacters);
                break;
        }
    };
    CardDetailsPage.prototype.createDateSelector = function () {
        var _this = this;
        var datepicker = this.cardExpirationDateInput.datepicker({
            minDate: 0,
            changeMonth: true,
            changeYear: true,
            yearRange: '-10:+10',
            dateFormat: 'MM yy',
            defaultDate: new Date(),
            showButtonPanel: true,
            onSelect: function (dateText) { return _this.onExpirationDateSelected(dateText); },
            onClose: function (dateText, inst) { return _this.onCloseDatepicker(dateText, inst); }
        });
        this.cardExpirationDateInput.click(function () { return _this.onDateClicked(); });
        this.cardExpirationDateInput.focus(function () { return _this.onDateClicked(); });
    };
    CardDetailsPage.prototype.onCloseDatepicker = function (dateText, inst) {
        var month = this.$j("#ui-datepicker-div .ui-datepicker-month :selected").val();
        var year = this.$j("#ui-datepicker-div .ui-datepicker-year :selected").val();
        this.cardExpirationDateInput.val(this.$j.datepicker.formatDate('MM yy', new Date(year, month, 1)));
        this.cardExpirationDate = this.cardExpirationDateInput.val();
        this.card.setExpDate(this.cardExpirationDate);
    };
    CardDetailsPage.prototype.onDateClicked = function () {
        this.$j("table.ui-datepicker-calendar").eq(2).prop('style', 'display: none;');
        this.$j("table.ui-datepicker-calendar").hide();
        this.$j("#ui-datepicker-div").position({
            my: "center top",
            at: "center bottom",
            of: this.cardExpirationDateInput
        });
    };
    CardDetailsPage.prototype.hideForm = function () {
        this.form.addClass("hidden");
    };
    CardDetailsPage.prototype.showForm = function () {
        this.form.removeClass("hidden");
    };
    CardDetailsPage.prototype.onCardNumberError = function () {
        this.$j("#errmsg").html("Digits Only").show().fadeOut("slow");
    };
    return CardDetailsPage;
}());

// NavigateToPrevPageDetector
var NavigateToPrevPageDetector = (function () {
    function NavigateToPrevPageDetector(personsIterator) {
        this.personsIterator = personsIterator;
    }
    NavigateToPrevPageDetector.prototype.detect = function (state) {
        while (this.personsIterator.hasNext()) {
            var person = this.personsIterator.next();
            if (person.getIsComplete()) {
                return false;
            }
        }
        if (state == "CONFIRMATION") {
            return false;
        }
        else {
            return true;
        }
    };
    return NavigateToPrevPageDetector;
}());

// UserInputFormPage
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
            var quoteId = generateQuoteRandomId();
            Cookie.setQuoteId(quoteId);
        }
    }
};

// BenefitSelectionPage
var BenefitSelectionPage = function(){

    var personsCollection;
    var parsedData;
    var useSCCC;
    var savedBenefit;
    var benefitsSelectionForm;

    var $ = jQuery.noConflict();
    var prevButton;
    var prevPage;

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

    function onPrevButtonClicked(){
        console.log("prev clicked");
        NavigatorUtil.navigateTo(prevPage);
    }

    return{
        create:function(){

            EventBus.addEventListener("BENEFIT_SELECTED", benefitSelectedHandler);

            var savedFormData = Cookie.getUserInputFormData();
            parsedData = StringUtils.parseURI(savedFormData);

            //console.log("parsedData",parsedData);

            if(!parsedData){
                parsedData = {benefit:null};
            }
            savedBenefit = parsedData.benefit;

            useSCCC = parsedData.useSccc == "Yes" ? true : false;
            //console.log("useSCCC="+useSCCC);

            createPersons();
            savePersons();
            savePeriod();

            benefitsSelectionForm = new BenefitSelectionFormTS(savedBenefit, "selectedBenefitInput", "benefitSelectionForm", "benefitsSelectionTable");

            prevPage = $("#baseUrl").text();

            prevButton = $("#prevButton");
            prevButton.click(function(){
                onPrevButtonClicked();
            });
        }
    }
};

// CompanyPlanSelectionPage
var CompanyPlanSelectionPage = (function () {
    function CompanyPlanSelectionPage() {
        this.prevPage = "companies-by-user-data";
        this.nextPage = "/application-creation";
        this.$j = jQuery.noConflict();
    }
    CompanyPlanSelectionPage.prototype.create = function () {
        var _this = this;
        var companyData = this.getCompany();
        var mapDecoder = new MapJsonDecoder(companyData.deductiblesCosts);
        this.companyCosts = mapDecoder.decode();
        this.createCostSelectionForm();
        this.prevButton = this.$j('#prevButton');
        this.prevButton.on("click", function () { return _this.prevButtonClickHandler(); });
        EventBus.addEventListener("COMPANY_PLAN_SELECTED", function (data) { return _this.companyPlanSelectedHandler(data); });
    };
    CompanyPlanSelectionPage.prototype.navigateToNextPage = function () {
        NavigatorUtil.navigateTo(this.nextPage);
    };
    CompanyPlanSelectionPage.prototype.navigateToPrevPage = function () {
        NavigatorUtil.navigateTo(this.prevPage);
    };
    CompanyPlanSelectionPage.prototype.prevButtonClickHandler = function () {
        this.navigateToPrevPage();
    };
    CompanyPlanSelectionPage.prototype.getCompany = function () {
        var companyDecodedData = Cookie.getSelectedCompanyData();
        var companyData = StringUtils.parseURI(companyDecodedData);
        return companyData;
    };
    CompanyPlanSelectionPage.prototype.saveSelectedPlan = function (deductible, cost) {
        Cookie.setCompanyPlan(JSON.stringify({ deductible: deductible, cost: cost }));
    };
    CompanyPlanSelectionPage.prototype.createCostSelectionForm = function () {
        var savedPlanData = Cookie.getCompanyPlan();
        var parsedData = StringUtils.parseURI(savedPlanData);
        var savedPlan = parsedData;
        var savedDeductible = -1;
        if (savedPlan) {
            savedDeductible = savedPlan.deductible;
        }
        var costSelectionForm = new CompanyPlanSelectionForm(savedDeductible, "selectedPlanInput", "planSelectionForm", "planSelectionTable");
    };
    CompanyPlanSelectionPage.prototype.companyPlanSelectedHandler = function (data) {
        var deductible = data.deductible;
        var cost = this.companyCosts.get(deductible);
        this.saveSelectedPlan(deductible, cost);
        this.navigateToNextPage();
    };
    return CompanyPlanSelectionPage;
}());

// PersonsAdditionalDataRequestView
var PersonsAdditionalDataRequestView = (function () {
    function PersonsAdditionalDataRequestView() {
        this.$j = jQuery.noConflict();
        this.createChildren();
        this.createListeners();
        if (!this.savedCountryOfOrigin) {
            this.saveCountryOfOrigin();
        }
        if (!this.savedVisitorType) {
            this.saveVisitorType();
        }
        if (!this.savedProvince) {
            this.saveProvince();
        }
        if (!this.savedArrivalDate) {
            this.savedArrivalDate = this.arrivalDateControl.val();
            this.saveArrivalDate(this.savedArrivalDate);
        }
    }
    PersonsAdditionalDataRequestView.prototype.validate = function () {
        var isValid = true;
        var errorText;
        var arrivalDate = this.arrivalDateControl.val();
        var sponsorFirstName = this.sponsorFirstNameControl.val();
        var sponsorLastName = this.sponsorLastNameControl.val();
        var address = this.addressControl.val();
        var city = this.cityControl.val();
        var postalCode = this.postalCodeControl.val();
        var email = this.emailControl.val();
        var emailIsValid = this.validateEmail(email);
        var phone = this.phoneControl.val();
        var phoneIsValid = this.validatePhone(phone);
        var postalCodeIsValid = PostalCodeValidator.validate(postalCode);
        if (!arrivalDate || arrivalDate.length < 3) {
            errorText = "Arrival date invalid";
            isValid = false;
        }
        if (!address || address.length < 3) {
            errorText = "Canadian address invalid";
            isValid = false;
        }
        if (!city || city.length < 3) {
            errorText = "City invalid";
            isValid = false;
        }
        if (!postalCodeIsValid) {
            errorText = "Postal code invalid";
            isValid = false;
        }
        if (!emailIsValid) {
            errorText = "Email invalid";
            isValid = false;
        }
        if (!phoneIsValid) {
            errorText = "Phone invalid";
            isValid = false;
        }
        return { isValid: isValid, errorText: errorText };
    };
    PersonsAdditionalDataRequestView.prototype.loadData = function () {
        this.savedCountryOfOrigin = Cookie.getCountryOfOrigin();
        this.savedVisitorType = Cookie.getVisitorType();
        this.savedArrivalDate = Cookie.getArrivalDate();
        this.savedSponsorFirstName = Cookie.getSponsorFirstName();
        this.savedSponsorLastName = Cookie.getSponsorLastName();
        this.savedBeneficiaryFirstName = Cookie.getBeneficiaryFirstName();
        this.savedBeneficiaryRelationship = Cookie.getBeneficiaryLastName();
        this.savedAddress = Cookie.getAddress();
        this.savedProvince = Cookie.getSponsorProvince();
        this.savedCity = Cookie.getSponsorCity();
        this.savedPostalCode = Cookie.getSponsorPostalCode();
        this.savedEmail = Cookie.getEmail();
        this.savedPhone = Cookie.getPhone();
    };
    PersonsAdditionalDataRequestView.prototype.createChildren = function () {
        this.countryOfOriginControl = this.$j("#countriesSelect");
        this.visitorTypeControl = this.$j("#visitorTypeSelect");
        this.arrivalDateControl = this.$j("#arrivalDateInput");
        this.sponsorFirstNameControl = this.$j("#sponsorFirstName");
        this.sponsorLastNameControl = this.$j("#sponsorLastName");
        this.beneficiaryFirstNameControl = this.$j("#beneficiaryFirstName");
        this.beneficiaryRelationship = this.$j("#beneficiaryRelationship");
        this.addressControl = this.$j("#streetInput");
        this.cityControl = this.$j("#cityInput");
        this.provinceControl = this.$j("#provinceSelect");
        this.postalCodeControl = this.$j("#postalCodeSelect");
        this.emailControl = this.$j("#emailInput");
        this.phoneControl = this.$j("#phoneInput");
        this.emailErrorMessageElement = this.$j("#emailErrorMessage");
        this.phoneErrorMessageElement = this.$j("#phoneErrorMessage");
        this.createArrivalDatePicker();
    };
    PersonsAdditionalDataRequestView.prototype.createArrivalDatePicker = function () {
        var _this = this;
        console.log("createArrivalDatePicker");
        console.log("default date: ", new Date());
        this.arrivalDateControl.datepicker({
            changeYear: true,
            yearRange: '-10:+10',
            defaultDate: new Date(),
            onSelect: function (dateText) { return _this.onArrivalDateSelected(dateText); }
        });
    };
    PersonsAdditionalDataRequestView.prototype.updateControls = function () {
        console.log("update controls this.savedArrivalDate=" + this.savedArrivalDate);
        if (this.savedCountryOfOrigin) {
            this.countryOfOriginControl.val(unescape(this.savedCountryOfOrigin));
        }
        if (this.savedVisitorType) {
            this.visitorTypeControl.val(unescape(this.savedVisitorType));
        }
        if (this.savedArrivalDate) {
            this.arrivalDateControl.val(this.savedArrivalDate);
        }
        if (this.savedSponsorFirstName) {
            this.sponsorFirstNameControl.val(unescape(this.savedSponsorFirstName));
        }
        if (this.savedSponsorLastName) {
            this.sponsorLastNameControl.val(unescape(this.savedSponsorLastName));
        }
        if (this.savedBeneficiaryFirstName) {
            this.beneficiaryFirstNameControl.val(unescape(this.savedBeneficiaryFirstName));
        }
        if (this.savedBeneficiaryRelationship) {
            this.beneficiaryRelationship.val(unescape(this.savedBeneficiaryRelationship));
        }
        if (this.savedAddress) {
            this.addressControl.val(unescape(this.savedAddress));
        }
        if (this.savedProvince) {
            this.provinceControl.val(unescape(this.savedProvince));
        }
        if (this.savedEmail) {
            this.emailControl.val(unescape(this.savedEmail));
        }
        if (this.savedPhone) {
            this.phoneControl.val(unescape(this.savedPhone));
        }
        if (this.savedPostalCode) {
            this.postalCodeControl.val(unescape(this.savedPostalCode));
        }
        if (this.savedCity) {
            this.cityControl.val(unescape(this.savedCity));
        }
    };
    PersonsAdditionalDataRequestView.prototype.onArrivalDateSelected = function (dateText) {
        this.saveArrivalDate(dateText);
    };
    PersonsAdditionalDataRequestView.prototype.createListeners = function () {
        var _this = this;
        this.countryOfOriginControl.change(function () { return _this.countryOfOriginControlChanged(); });
        this.visitorTypeControl.change(function () { return _this.visitorTypeControlChanged(); });
        this.sponsorFirstNameControl.keyup(function (e) { return _this.onSponsorFirstNameChanged(e); });
        this.sponsorLastNameControl.keyup(function (e) { return _this.onSponsorLastNameChanged(e); });
        this.beneficiaryFirstNameControl.keyup(function (e) { return _this.onBeneficiaryFirstNameChanged(e); });
        this.beneficiaryRelationship.keyup(function (e) { return _this.onBeneficiaryRelationshipChanged(e); });
        this.addressControl.keyup(function (e) { return _this.onAddressChanged(e); });
        this.provinceControl.change(function () { return _this.provinceControlChanged(); });
        this.cityControl.keyup(function (e) { return _this.cityChanged(e); });
        this.postalCodeControl.keyup(function (e) { return _this.postalCodeChanged(e); });
        this.emailControl.keyup(function (e) { return _this.onEmailChanged(e); });
        this.phoneControl.keyup(function (e) { return _this.onPhoneChanged(e); });
    };
    PersonsAdditionalDataRequestView.prototype.countryOfOriginControlChanged = function () {
        this.saveCountryOfOrigin();
    };
    PersonsAdditionalDataRequestView.prototype.visitorTypeControlChanged = function () {
        this.saveVisitorType();
    };
    PersonsAdditionalDataRequestView.prototype.provinceControlChanged = function () {
        this.saveProvince();
    };
    PersonsAdditionalDataRequestView.prototype.saveCountryOfOrigin = function () {
        Cookie.setCountryOfOrigin(this.countryOfOriginControl.val());
    };
    PersonsAdditionalDataRequestView.prototype.saveVisitorType = function () {
        Cookie.setVisitorType(this.visitorTypeControl.val());
    };
    PersonsAdditionalDataRequestView.prototype.saveProvince = function () {
        Cookie.setSponsorProvince(this.provinceControl.val());
    };
    PersonsAdditionalDataRequestView.prototype.saveArrivalDate = function (date) {
        Cookie.setArrivalDate(date);
    };
    PersonsAdditionalDataRequestView.prototype.onSponsorFirstNameChanged = function (e) {
        Cookie.setSponsorFirstName(this.sponsorFirstNameControl.val());
    };
    PersonsAdditionalDataRequestView.prototype.onSponsorLastNameChanged = function (e) {
        Cookie.setSponsorLastName(this.sponsorLastNameControl.val());
    };
    PersonsAdditionalDataRequestView.prototype.onBeneficiaryFirstNameChanged = function (e) {
        Cookie.setBeneficiaryFirstName(this.beneficiaryFirstNameControl.val());
    };
    PersonsAdditionalDataRequestView.prototype.onBeneficiaryRelationshipChanged = function (e) {
        Cookie.setBeneficiaryLastName(this.beneficiaryRelationship.val());
    };
    PersonsAdditionalDataRequestView.prototype.onAddressChanged = function (e) {
        Cookie.setAddress(this.addressControl.val());
    };
    PersonsAdditionalDataRequestView.prototype.onEmailChanged = function (e) {
        var email = this.emailControl.val();
        var emailIsValid = this.validateEmail(email);
        if (emailIsValid) {
            Cookie.setEmail(email);
        }
        else {
        }
    };
    PersonsAdditionalDataRequestView.prototype.onPhoneChanged = function (e) {
        var phone = this.phoneControl.val();
        var phoneIsValid = this.validatePhone(phone);
        if (phoneIsValid) {
            Cookie.setPhone(phone);
        }
    };
    PersonsAdditionalDataRequestView.prototype.cityChanged = function (e) {
        Cookie.setSponsorCity(this.cityControl.val());
    };
    PersonsAdditionalDataRequestView.prototype.postalCodeChanged = function (e) {
        Cookie.setSponsorPostalCode(this.postalCodeControl.val());
    };
    PersonsAdditionalDataRequestView.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    PersonsAdditionalDataRequestView.prototype.validatePhone = function (phone) {
        var regex = /^\d+$/;
        return regex.test(phone);
    };
    PersonsAdditionalDataRequestView.prototype.validatePostalCode = function (postal) {
        return PostalCodeValidator.validate(postal);
    };
    return PersonsAdditionalDataRequestView;
}());
// ApplicationCreationPage
var ApplicationCreationPage = (function (_super) {
    __extends(ApplicationCreationPage, _super);
    function ApplicationCreationPage() {
        _super.call(this);
        this.prevPage = "plan-selection";
        this.nextPage = "person-details";
    }
    ApplicationCreationPage.prototype.create = function () {
        var _this = this;
        this.views = new Map("personViews");
        this.ages = this.getAges();
        this.persons = this.getPersons();
        this.updatePersonsMedicalDeclarationRequirements();
        this.createChildren();
        EventBus.addEventListener("PERSONAL_INFO_VALUE_CHANGED", function () { return _this.personalInfoValueChangedHandler(); });
        EventBus.addEventListener("PERSONAL_INFO_FIRST_NAME_VALIDATE_ERROR", function (data) { return _this.personalInfoFirstNameValidateErrorHandler(data); });
        EventBus.addEventListener("PERSONAL_INFO_LAST_NAME_VALIDATE_ERROR", function (data) { return _this.personalInfoLastNameValidateErrorHandler(data); });
        EventBus.addEventListener("PERSONAL_INFO_BIRTHDAY_VALIDATE_ERROR", function (data) { return _this.personalInfoBirthdayValidateErrorHandler(data); });
    };
    ApplicationCreationPage.prototype.getCompany = function () {
        var companyDecodedData = Cookie.getSelectedCompanyData();
        var companyData = StringUtils.parseURI(companyDecodedData);
        return companyData;
    };
    // TODO путаница. Тут я получаю возрасты из элемента, хотя могу получить их из куков !!!!
    ApplicationCreationPage.prototype.getAges = function () {
        var agesData = this.$j("#agesCollectionContainer").text();
        var ages = new Array();
        var agesDecodedObject = JSON.parse(agesData);
        for (var i = 0; i < agesDecodedObject.length; i++) {
            var age = agesDecodedObject[i];
            ages.push(age);
        }
        // disable sorting
        //ages.sort(this.compareFunction);
        return ages;
    };
    ApplicationCreationPage.prototype.createChildren = function () {
        var _this = this;
        this.prevButton = this.$j('#prevButton');
        this.nextButton = this.$j('#nextButton');
        this.prevButton.on("click", function () { return _this.prevButtonClickHandler(); });
        this.nextButton.on("click", function () { return _this.nextButtonClickHandler(); });
        for (var i = 0; i < this.ages.length; i++) {
            var person = this.persons.getPersonByAge(this.ages[i]);
            var personData = { age: this.ages[i] };
            if (person) {
                personData.firstName = person.getFirstName();
                personData.lastName = person.getLastName();
                personData.gender = person.getGender();
                personData.relationship = person.getRelationship();
                personData.birthday = person.getBirthday();
            }
            var view = new PersonalInfoRequestView(personData);
            this.views.add(this.ages[i].toString(), view);
        }
        this.personsAdditionalDataRequestView = new PersonsAdditionalDataRequestView();
    };
    ApplicationCreationPage.prototype.prevButtonClickHandler = function () {
        this.navigateToPrevPage();
    };
    ApplicationCreationPage.prototype.navigateToNextPage = function () {
        NavigatorUtil.navigateTo(this.nextPage);
    };
    ApplicationCreationPage.prototype.navigateToPrevPage = function () {
        NavigatorUtil.navigateTo(this.prevPage);
    };
    ApplicationCreationPage.prototype.nextButtonClickHandler = function () {
        this.onNextButtonClick();
    };
    ApplicationCreationPage.prototype.onNextButtonClick = function () {
        this.hideError();
        console.log("this.personsAdditionalDataRequestView=" + this.personsAdditionalDataRequestView);
        var validateResult = this.personsAdditionalDataRequestView.validate();
        var dataIsValid = validateResult.isValid;
        if (!dataIsValid) {
            this.errorText = validateResult.errorText;
            this.onDataInvalid();
            return;
        }
        var viewsIterator = this.views.getIterator();
        while (viewsIterator.hasNext()) {
            var view = viewsIterator.next();
            dataIsValid = view.isValid();
            if (!dataIsValid) {
                this.onDataInvalid();
                return;
            }
        }
        this.saveData();
        this.navigateToNextPage();
    };
    ApplicationCreationPage.prototype.onDataInvalid = function () {
        this.showError();
    };
    ApplicationCreationPage.prototype.personalInfoValueChangedHandler = function () {
        this.hideError();
    };
    ApplicationCreationPage.prototype.hideError = function () {
        this.$j("#userPersonalDataErrorText").text("");
        this.$j("#userPersonalDataErrorText").addClass("hidden");
        var viewsIterator = this.views.getIterator();
        while (viewsIterator.hasNext()) {
            var view = viewsIterator.next();
            view.dropError();
        }
    };
    ApplicationCreationPage.prototype.showError = function () {
        this.$j("#userPersonalDataErrorText").text(this.errorText);
        this.$j("#userPersonalDataErrorText").removeClass("hidden");
    };
    ApplicationCreationPage.prototype.saveData = function () {
        var viewsIterator = this.views.getIterator();
        var counter = 0;
        while (viewsIterator.hasNext()) {
            var view = viewsIterator.next();
            var personData = view.getData();
            var age = personData.age;
            var currentPerson = this.persons.getPersonByAge(age);
            currentPerson.setFirstName(personData.firstName);
            currentPerson.setLastName(personData.lastName);
            currentPerson.setGender(personData.gender);
            currentPerson.setBirthday(personData.birthday);
            if (counter == 0) {
                currentPerson.setRelationship("Primary");
            }
            else {
                currentPerson.setRelationship(personData.relationship);
            }
            counter++;
        }
        Cookie.setPersons(this.persons.getData());
    };
    ApplicationCreationPage.prototype.personalInfoFirstNameValidateErrorHandler = function (age) {
        this.errorText = "Person with age " + age + " has invalid first name.";
    };
    ApplicationCreationPage.prototype.personalInfoLastNameValidateErrorHandler = function (age) {
        this.errorText = "Person with age " + age + " has invalid last name.";
    };
    ApplicationCreationPage.prototype.personalInfoBirthdayValidateErrorHandler = function (age) {
        this.errorText = "Person with age " + age + " has invalid birthday.";
    };
    ApplicationCreationPage.prototype.getRateTableGuideData = function () {
        return this.$j("#companyRateTableGuide").text();
    };
    ApplicationCreationPage.prototype.parseRateTableGuide = function (data) {
        var parser = new RateTableGuideParser();
        return parser.parse(data);
    };
    ApplicationCreationPage.prototype.compareFunction = function (a, b) {
        if (a > b) {
            return -1;
        }
        else {
            return 1;
        }
    };
    ApplicationCreationPage.prototype.updatePersonsMedicalDeclarationRequirements = function () {
        var rateTableGuideData = this.getRateTableGuideData();
        var rateTableGuide = this.parseRateTableGuide(rateTableGuideData);
        var medicalDeclarationRequirementUpdater = new MedicalDeclarationRequirementUpdater(this.persons, rateTableGuide);
        medicalDeclarationRequirementUpdater.update();
    };
    return ApplicationCreationPage;
}(BasePage));

// ApplicationFinishPage
var ApplicationFinishPage = (function (_super) {
    __extends(ApplicationFinishPage, _super);
    function ApplicationFinishPage() {
        _super.call(this);
        console.log("Im application finish page");
    }
    ApplicationFinishPage.prototype.create = function () {
        this.persons = this.getPersons();
        this.companyData = this.getCompany();
        this.createQuoteId();
        this.loadQuotePersonsData();
    };
    ApplicationFinishPage.prototype.createQuoteId = function () {
        var savedAppId = this.$j("#appIdContainer").val();
        console.log("outer app id: " + savedAppId);
        this.quoteId = new QuoteId(savedAppId);
    };
    ApplicationFinishPage.prototype.onApplicationSaved = function () {
        var resultEmailPage = new SendResultEmailPage();
        resultEmailPage.create();
    };
    ApplicationFinishPage.prototype.saveApplication = function () {
        var quoteSaver = new QuoteSaver();
        var period = Cookie.getPeriod();
        var encodedPlanData = Cookie.getCompanyPlan();
        var planData = StringUtils.parseURI(encodedPlanData);
        var encodedFormData = Cookie.getUserInputFormData();
        var formData = StringUtils.parseURI(encodedFormData);
        var startDate = formData.startDate.date;
        var finishDate = formData.finishDate.date;
        startDate = startDate.split("+")[0];
        finishDate = finishDate.split("+")[0];

        var quoteData = JSON.stringify({ company: this.companyData.companyName, benefit: this.companyData.benefit, period: period, deductible: planData.deductible, cost: planData.cost, startDate: startDate, finishDate: finishDate });
        var numPersons = this.persons.size();
        var countryOfOrigin = Cookie.getCountryOfOrigin();
        var visitorType = Cookie.getVisitorType();
        var arrivalDate = Cookie.getArrivalDate();
        var sponsorFirstName = Cookie.getSponsorFirstName();
        var sponsorLastName = Cookie.getSponsorLastName();
        var beneficiaryFirstName = Cookie.getBeneficiaryFirstName();
        var beneficiaryLastName = Cookie.getBeneficiaryLastName();
        var address = Cookie.getAddress();
        var city = Cookie.getSponsorCity();
        var province = Cookie.getSponsorProvince();
        var postalCode = Cookie.getSponsorPostalCode();
        var email = Cookie.getEmail();
        var phone = Cookie.getPhone();
        var applicationType = Cookie.getApplicationType();
        console.log("application type: " + applicationType);
        this.quoteDataToSave = {
            quoteId: this.quoteId.getId(),
            companyName: this.companyData.companyName,
            quoteData: quoteData,
            persons: this.personsData,
            period: period,
            numPersons: numPersons,
            startDate: startDate,
            finishDate: finishDate,
            countryOfOrigin: countryOfOrigin,
            visitorType: visitorType,
            arrivalDate: arrivalDate,
            sponsorFirstName: sponsorFirstName,
            sponsorLastName: sponsorLastName,
            beneficiaryFirstName: beneficiaryFirstName,
            beneficiaryLastName: beneficiaryLastName,
            address: address,
            city: city,
            province: province,
            postalCode: postalCode,
            email: email,
            phone: phone,
            type: applicationType,
            state: "IN_PROGRESS"
        };
        this.$j("#quoteData").val(JSON.stringify(this.quoteDataToSave));
        quoteSaver.save(this.quoteDataToSave);
    };
    ApplicationFinishPage.prototype.onPersonsDataValid = function () {
        //console.log("persons data is valid. Data is: ", this.personsData);
        //this.decorateQuoteIdWithCurrentDate();
        this.saveApplication();
        this.$j("#quoteDate").text(this.$j("#quoteData").val());
        this.onApplicationSaved();
        this.deletePersonsTempData();
    };
    ApplicationFinishPage.prototype.deletePersonsTempData = function () {
        DB.deletePersons(this.quoteId.getTempValue());
    };
    ApplicationFinishPage.prototype.getCompany = function () {
        var companyDecodedData = Cookie.getSelectedCompanyData();
        var companyData = StringUtils.parseURI(companyDecodedData);
        return companyData;
    };
    ApplicationFinishPage.prototype.loadQuotePersonsData = function () {
        var _this = this;
        EventBus.addEventListener("personsDataLoadComplete", function (data) { return _this.personsDataLoadComplete(data); });
        //DB.loadPersons(this.quoteId.getTempValue());
        console.log("loading persons by app temp id " + this.quoteId.getTempValue());
        DB.loadPersons(this.quoteId.getTempValue());
    };
    ApplicationFinishPage.prototype.personsDataLoadComplete = function (data) {
        var _this = this;
        EventBus.removeEventListener("personsDataLoadComplete", function (data) { return _this.personsDataLoadComplete(data); });
        this.onPersonDataLoadComplete(data);
    };
    ApplicationFinishPage.prototype.onPersonDataLoadComplete = function (data) {
        var dataIsValid = this.validatePersonsLoadedData(data);
        if (dataIsValid) {
            this.personsData = data;
            this.onPersonsDataValid();
        }
        else {
            console.error("persons loaded data not valid. data: " + data);
        }
    };
    ApplicationFinishPage.prototype.validatePersonsLoadedData = function (data) {
        var decodedData = unescape(data);
        try {
            var dataJson = JSON.parse(decodedData);
            return true;
        }
        catch (error) {
            return false;
        }
    };
    return ApplicationFinishPage;
}(BasePage));
// SendResultEmailPage
var SendResultEmailPage = (function () {
    function SendResultEmailPage() {
        this.receiver = "";
        this.$j = jQuery.noConflict();
        this.emailSender = new EmailSender();
    }
    SendResultEmailPage.prototype.create = function () {
        var _this = this;
        EventBus.addEventListener("APPLICATION_EMAIL_SENT_RESULT", function (result) { return _this.onApplicationEmailSentResult(result); });
        EventBus.addEventListener("APPLICATION_ADMIN_EMAIL_SENT_RESULT", function (result) { return _this.onApplicationEmailAdminSentResult(result); });
        EventBus.addEventListener("HTML_EXPORT_COMPLETE", function (result) { return _this.onHTMLExportComplete(result); });
        var quoteDataString = this.getQuoteData();
        this.parseQuoteData(quoteDataString);
        this.updateBody();
        this.iteratePersons();
        var personsShortInfoHtml = this.createPersonsShortInfoHTML();
        console.log(personsShortInfoHtml);
        this.$j("#personsShortInfoContainer").html(personsShortInfoHtml);
        this.emailBodyHtml = this.$j("#emailBody").html();
        this.emailBodyHtml = this.decorateEmailBody();
        this.exportHtml();
    };
    SendResultEmailPage.prototype.exportHtml = function () {
        var htmlExporter = new HTMLExporter();
        htmlExporter.export(this.data.quoteId, this.emailBodyHtml);
    };
    SendResultEmailPage.prototype.onHTMLExportComplete = function (result) {
        //TODO validate result
        console.log("onHTMLExportComplete. result: " + result);
        var parsedResult = JSON.parse(result);
        this.appId = parsedResult.appId;
        var applicationHtmlFileUrl = parsedResult.url;
        console.log("applicationHtmlFileUrl=" + applicationHtmlFileUrl);
        // var emailBody:string = "<b>Thanks</b> for your application. You can download it using <a href='"+applicationHtmlFileUrl+"'>this link</a> <a href='"+applicationHtmlFileUrl+"'>"+applicationHtmlFileUrl+"</a>. Best regards.";
        this.emailBody = '<b>Thanks</b> for your application. You can download it using this link <p><a href="' + applicationHtmlFileUrl + '" target="_blank">' + applicationHtmlFileUrl + '</a></p><p>Best regards</p>';
        this.sendApplicationAdminEmail();
    };
    SendResultEmailPage.prototype.onApplicationEmailSentResult = function (result) {
        var dialogContent = this.$j("<div>" + result + "</div>");
        dialogContent.dialog({ modal: true, buttons: [
            {
                text: "Ok", click: function (event) {
                dialogContent.dialog("close");
            }
            }
        ] });
    };
    SendResultEmailPage.prototype.sendApplicationAdminEmail = function () {
        console.log("sending application admin email...");
        this.emailSender.sendApplicationAdminEmail(this.appId);
    };
    SendResultEmailPage.prototype.sendApplicationResultEmail = function () {
        this.emailSender.sendApplicationResult(this.receiver, this.emailBody, this.appId);
    };
    SendResultEmailPage.prototype.onApplicationEmailAdminSentResult = function (result) {
        console.log("application admin email send result " + result);
        this.sendApplicationResultEmail();
    };
    SendResultEmailPage.prototype.decorateEmailBody = function () {
        var html = this.emailBodyHtml;
        return html;
    };
    SendResultEmailPage.prototype.getQuoteData = function () {
        return this.$j("#quoteDate").text();
    };
    SendResultEmailPage.prototype.parseQuoteData = function (data) {
        this.data = JSON.parse(data);
        //console.log("Quote data: ",this.data);
        this.quoteData = JSON.parse(this.data.quoteData);
        this.persons = this.getPersons();
        this.receiver = unescape(this.data.email);
    };
    SendResultEmailPage.prototype.getPersons = function () {
        var personsData = this.data.persons;
        var personsParser = new PersonCollectionParser(personsData);
        return personsParser.parse();
    };
    SendResultEmailPage.prototype.iteratePersons = function () {
        var iterator = this.persons.getIterator();
        while (iterator.hasNext()) {
            var person = iterator.next();
            new QuotePersonAdminView(person, this.$j("#personsContainer"));
        }
    };
    SendResultEmailPage.prototype.createPersonsShortInfoHTML = function () {
        var html = "<h2><div style='width: 100%; background-color: #d9edf7; text-align: center;'>Insureds</div></h2><table><tbody>";
        var iterator = this.persons.getIterator();
        while (iterator.hasNext()) {
            var person = iterator.next();
            var firstName = person.getFirstName();
            var lastName = person.getLastName();
            var age = person.getAge();
            var birthday = person.getBirthday();
            var gender = person.getGender();
            var personContainerPrefix = "<tr>";
            var personContainerHtml = "<td style='padding-left: 10px; padding-right: 10px;'>FirstName:</td>";
            personContainerHtml += "<td style='padding-left: 10px; padding-right: 10px;'><b>" + firstName + "</b></td>";
            personContainerHtml += "<td style='padding-left: 10px; padding-right: 10px;'>Last name:</td>";
            personContainerHtml += "<td style='padding-left: 10px; padding-right: 10px;'><b>" + lastName + "</b></td>";
            personContainerHtml += "<td style='padding-left: 10px; padding-right: 10px;'>Age:</td>";
            personContainerHtml += "<td style='padding-left: 10px; padding-right: 10px;'><b>" + age + "</b></td>";
            personContainerHtml += "<td style='padding-left: 10px; padding-right: 10px;'>Birthday:</td>";
            personContainerHtml += "<td style='padding-left: 10px; padding-right: 10px;'><b>" + birthday + "</b></td>";
            personContainerHtml += "<td style='padding-left: 10px; padding-right: 10px;'>Gender:</td>";
            personContainerHtml += "<td style='padding-left: 10px; padding-right: 10px;'><b>" + gender + "</b></td>";
            var personContainerPostfix = "</tr>";
            var personHTML = personContainerPrefix + personContainerHtml + personContainerPostfix;
            html += personHTML;
        }
        html += "</tbody></table>";
        return html;
    };
    SendResultEmailPage.prototype.updateBody = function () {
        this.$j("#cardType").text(this.data.address);
        this.$j("#application").text("Application:   " + this.data.quoteId);
        this.$j("#company").html("Company: <b>" + unescape(this.data.companyName) + "</b>");
        var benefit = StringUtils.formatMoneyInt(this.quoteData.benefit);
        this.$j("#benefit").html("<b>" + benefit + "</b>");
        var deductible = StringUtils.formatMoneyInt(this.quoteData.deductible);
        this.$j("#deductible").html("<b>" + deductible + "</b>");
        var cost = StringUtils.formatDivisionalMoney(this.quoteData.cost);
        this.$j("#cost").html("<b>" + cost + "</b>");
        this.$j("#startDate").html("<b>" + this.quoteData.startDate + "</b>");
        this.$j("#finishDate").html("<b>" + this.quoteData.finishDate + "</b>");
        this.$j("#period").html("<b>" + this.quoteData.period + " day(s)</b>");
        //this.updateCardInfo();
        this.updateVisitorsInfo();
    };
    SendResultEmailPage.prototype.updateCardInfo = function () {
        var cardNumberValue = unescape(StringUtils.decorateCardNumber(this.data.cardNumber));
        this.$j("#cardTypeContainer").html("<b>" + unescape(this.data.cardType) + "</b>");
        this.$j("#cardHolder").html("<b>" + unescape(this.data.cardHolderName) + "</b>");
        this.$j("#cardNumberContainer").html("<b>" + cardNumberValue + "</b>");
        this.$j("#cardExpDate").html("<b>***</b>");
    };
    SendResultEmailPage.prototype.updateVisitorsInfo = function () {
        this.$j("#countryOfOrigin").html("<b>" + unescape(this.data.countryOfOrigin) + "</b>");
        this.$j("#visitorType").html("<b>" + unescape(this.data.visitorType) + "</b>");
        this.$j("#arrivalDate").html("<b>" + unescape(this.data.arrivalDate) + "</b>");
        this.$j("#sponsorFirstName").html("<b>" + unescape(this.data.sponsorFirstName) + "</b>");
        this.$j("#sponsorLastName").html("<b>" + unescape(this.data.sponsorLastName) + "</b>");
        this.$j("#beneficiaryFirstName").html("<b>" + unescape(this.data.beneficiaryFirstName) + "</b>");
        this.$j("#beneficiaryLastName").html("<b>" + unescape(this.data.beneficiaryLastName) + "</b>");
        this.$j("#address").html("<b>" + unescape(this.data.address) + "</b>");
        this.$j("#city").html("<b>" + unescape(this.data.city) + "</b>");
        this.$j("#province").html("<b>" + unescape(this.data.province) + "</b>");
        this.$j("#postalCode").html("<b>" + unescape(this.data.postalCode) + "</b>");
        this.$j("#email").html("<b>" + unescape(this.data.email) + "</b>");
        this.$j("#phone").html("<b>" + unescape(this.data.phone) + "</b>");
    };
    return SendResultEmailPage;
}());

// FrontendInit.js
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
