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
