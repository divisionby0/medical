///<reference path="../../../collections/Map.ts"/>
var MapParser = (function () {
    function MapParser() {
    }
    MapParser.parse = function (data) {
        var map = new Map(data.id);
        var keys = data.keys;
        var items = data.items;
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var item = items[key];
            map.add(key.toString(), item);
        }
        return map;
    };
    return MapParser;
}());
//# sourceMappingURL=MapParser.js.map