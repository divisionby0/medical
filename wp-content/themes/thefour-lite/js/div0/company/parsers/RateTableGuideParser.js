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
