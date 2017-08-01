///<reference path="QuotePersonCollection.ts"/>
///<reference path="../../../collections/json/MapJsonDecoder.ts"/>
declare function unescape(s:string):string;
class PersonCollectionParser{
    
    private data:string;
    private $j:any;
    
    constructor(data:string){
        this.$j = jQuery.noConflict();
        this.data = data;
    }
    
    public parse():QuotePersonCollection{
        var personsData:string = unescape(this.data);
        var mapJsonDecoder:MapJsonDecoder = new MapJsonDecoder(personsData);
        var decodedMap:Map<any> = mapJsonDecoder.decode();
        return this.parsePersons(decodedMap);
    }

    private parsePersons(source:Map<any>):QuotePersonCollection{
        var collection:QuotePersonCollection = new QuotePersonCollection();

        var iterator:MapIterator = source.getIterator();
        while(iterator.hasNext()){
            var personData:any = iterator.next();
            collection.add(this.parsePerson(personData));
        }
        return collection;
    }

    private parsePerson(personData:any):QuotePerson{
        var age:number = personData._age;
        var firstName:string = personData._firstName;
        var lastName:string = personData._lastName;
        var gender:string = personData._gender;
        var relationship:string = personData._relationship;
        var questions:any = personData._questions;
        var birthday:string = personData._birthday;
        var complete:boolean = personData._complete;
        var useSCCC:boolean = personData._useSCCC;
        var period:number = personData._period;
        var medicalDeclarationRequired:boolean = personData._medicalDeclarationRequired;

        var questionsData:string = this.parseQuestions(questions);

        var person:QuotePerson = new QuotePerson(age, firstName, lastName, gender, relationship, birthday, questionsData);
        person.setIsComplete(complete);
        person.setIsUseSCCC(useSCCC);
        person.setPeriod(period);
        person.setMedicalDeclarationRequired(medicalDeclarationRequired);

        return person;
    }

    private parseQuestions(questions:any):string{
        var questionsData:string = "";

        console.log("parse questions ",questions);

        var isEmpty:boolean = this.$j.isEmptyObject(questions);

        if(!isEmpty){
            questions.collection.items.id = "questions";
            questions.collection.items.type = "Map";
            questionsData  = JSON.stringify(questions.collection.items);
        }
        return questionsData;
    }
}

