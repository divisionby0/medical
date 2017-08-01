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
