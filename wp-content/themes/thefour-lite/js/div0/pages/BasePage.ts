///<reference path="../../../../../plugins/medical_ensurance/js/collections/Map.ts"/>
///<reference path="../../../../../plugins/medical_ensurance/js/collections/json/MapJsonDecoder.ts"/>
///<reference path="../../libs/jqueryTS/jquery.d.ts"/>
///<reference path="../../../../../plugins/medical_ensurance/js/admin/quote/persons/QuotePersonCollection.ts"/>
///<reference path="../../../../../plugins/medical_ensurance/js/utils/Cookie.ts"/>
declare var StringUtils;
class BasePage{

    protected persons:QuotePersonCollection;
    protected $j:any;
    
    constructor(){
        this.$j = jQuery.noConflict();
    }

    protected getPersons():QuotePersonCollection {
        var personsData:string = Cookie.getPersons();
        var parsedPersonsData:any = StringUtils.parseURI(personsData);
        var mapJsonDecoder:MapJsonDecoder = new MapJsonDecoder(JSON.stringify(parsedPersonsData));
        var decodedMap:Map<any> = mapJsonDecoder.decode();
        return this.parsePersons(decodedMap);
    }

    private parsePersons(source:Map<any>):QuotePersonCollection{
        var collection:QuotePersonCollection = new QuotePersonCollection();

        var iterator:MapIterator = source.getIterator();
        while(iterator.hasNext()){
            var personData:any = iterator.next();

            var age:number = personData._age;
            var firstName:string = personData._firstName;
            var lastName:string = personData._lastName;
            var gender:string = personData._gender;
            var relationship:string = personData._relationship;
            var questions:string = personData._questions;
            var birthday:string = personData._birthday;
            var complete:boolean = personData._complete;
            var useSCCC:boolean = personData._useSCCC;
            var period:number = personData._period;
            var medicalDeclarationRequired:boolean = personData._medicalDeclarationRequired;

            var person:QuotePerson = new QuotePerson(age, firstName, lastName, gender, relationship, birthday, questions);
            person.setIsComplete(complete);
            person.setIsUseSCCC(useSCCC);
            person.setPeriod(period);
            person.setMedicalDeclarationRequired(medicalDeclarationRequired);
            
            collection.add(person);
        }

        return collection;
    }
}
