///<reference path="../../../../../../plugins/medical_ensurance/js/collections/iterators/MapIterator.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/admin/quote/persons/QuotePerson.ts"/>
class NavigateToPrevPageDetector{
    
    private personsIterator:MapIterator;
    
    constructor(personsIterator:MapIterator){
        this.personsIterator = personsIterator;
    }
    
    public detect(state:string):boolean{
        while(this.personsIterator.hasNext()){
            var person:QuotePerson = this.personsIterator.next();
            console.log("Person "+person.getFirstName()+"  isComplete:"+person.getIsComplete());
            if(person.getIsComplete()){
                return false;
            }
        }

        if(state == "CONFIRMATION"){
            return false;
        }
        else{
            return true;
        }
    }
}
