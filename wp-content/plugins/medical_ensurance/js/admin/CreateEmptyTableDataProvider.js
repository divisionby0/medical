// TODO слушать события добавления бенефита и добавлять в Map новые row
var CreateEmptyTableDataProvider = (function(){

    var tableRowMaxLength = 100;

    function createMapStructure(mapId){
        var map = new Map(mapId);
        return map;
    }

    function fillMapWithData(map, startIndex, rowMaxLength){
        var mapIterator = map.getIterator();
        while(mapIterator.hasNext()){
            var row = mapIterator.next();
            fillMapWithZeroValues(row, startIndex, rowMaxLength);
        }
        console.log(map);
    }

    function fillMapWithZeroValues(map, startIndex, rowMaxLength){
        for(var i=startIndex; i<rowMaxLength; i++){
            map.add(i, 0);
        }
    }

    return{
        create:function(type){
            if(type == SCCC_TABLE){
                var map = createMapStructure(SCCC_MAP_ID);
                return map;
            }
            else if(type == STANDARD_RATES_TABLE){
                var map = createMapStructure(STANDARD_RATES_MAP_ID);
                return map;
            }
            else{
                console.error('Could not create empty table data provider from type '+type);
            }
        }
    }
})();
