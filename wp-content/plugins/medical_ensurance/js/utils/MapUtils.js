var MapUtils = (function(){
    return{
        getMapJson:function(map){
            var mapJsonEncoder = map.getEncoder();
            return mapJsonEncoder.encode();
        },
        createMapFromJson:function(jsonString){
            var mapJsonDecoder = new MapJsonDecoder(jsonString);
            return mapJsonDecoder.decode();
        },
        setAllValuesToZero:function(map){
            var mapIterator = map.getIterator();
            while(mapIterator.hasNext()){
                var row = mapIterator.next();
                var rowKeys = row.getKeys();
                row.clear();

                for(var i=0; i<rowKeys.length; i++){
                    var key = rowKeys[i];
                    row.add(key,0);
                }
            }
        }
    }
})();
