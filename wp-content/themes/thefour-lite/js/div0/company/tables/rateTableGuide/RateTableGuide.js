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