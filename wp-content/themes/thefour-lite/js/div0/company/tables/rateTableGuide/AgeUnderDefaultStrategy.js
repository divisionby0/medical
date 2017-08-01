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
