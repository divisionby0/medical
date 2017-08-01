///<reference path="QuotePerson.ts"/>
///<reference path="../../../collections/Map.ts"/>
///<reference path="../../../collections/iterators/MapIterator.ts"/>
///<reference path="../../../collections/json/MapJsonDecoder.ts"/>
class QuotePersonCollection{
    
    private collection:Map<QuotePerson>;
    
    constructor(){
        this.createCollection();
    }

    private createCollection():void {
        this.collection = new Map<QuotePerson>("persons");
    }
    
    public add(person:QuotePerson):void{
        var randomKey:string = "_"+Math.round(Math.random()*100000);
        this.collection.add(randomKey, person);
    }
    
    public getAges():string[]{
        var ages:string[] = new Array();
        var iterator:MapIterator = this.collection.getIterator();
        while(iterator.hasNext()){
            var person:QuotePerson = iterator.next();
            var personAge:number = person.getAge();
            ages.push(personAge.toString());
        }
        return ages;
    }
    public size():number{
        return this.collection.size();
    }
    
    public getIterator():MapIterator{
        return this.collection.getIterator();
    }
    
    public setData(data:string):void{
        this.collection = this.parseData(data);
    }

    public getData():string{
        return this.collection.getEncoder().encode();
    }

    public getPersonByAge(age:number):QuotePerson{
        var personsIterator:MapIterator = this.collection.getIterator();
        while(personsIterator.hasNext()){
            var person:QuotePerson = personsIterator.next();
            if(person.getAge() == age){
                return person;
            }
        }
    }
    
    private parseData(data:string):any{
        var jsonDecoder:MapJsonDecoder = new MapJsonDecoder(data);
        return jsonDecoder.decode();
    }
}
