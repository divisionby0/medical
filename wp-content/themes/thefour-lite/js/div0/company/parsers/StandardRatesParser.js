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
