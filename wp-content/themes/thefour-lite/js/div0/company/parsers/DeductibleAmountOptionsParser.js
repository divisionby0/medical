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
