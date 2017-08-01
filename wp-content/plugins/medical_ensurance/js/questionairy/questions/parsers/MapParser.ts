///<reference path="../../../collections/Map.ts"/>
class MapParser{
    public static parse(data):Map<any>{
        var map:Map<any> = new Map<any>(data.id);
        var keys:number[] = data.keys;
        var items:any = data.items;

        for(var i:number = 0; i< keys.length; i++){
            var key:number = keys[i];
            var item:any = items[key];
            map.add(key.toString(), item);
        }

        return map;
    }
}
