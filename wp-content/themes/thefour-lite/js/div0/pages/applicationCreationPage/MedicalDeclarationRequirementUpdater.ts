///<reference path="../../../../../../plugins/medical_ensurance/js/admin/quote/persons/QuotePersonCollection.ts"/>
class MedicalDeclarationRequirementUpdater{
    
    private persons:QuotePersonCollection;
    private rateTableGuide:any;

    constructor(persons:QuotePersonCollection, rateTableGuide:any){
        this.persons = persons;
        this.rateTableGuide = rateTableGuide;
    }
    
    public update():void{
        var personIterator:MapIterator = this.persons.getIterator();
        while(personIterator.hasNext()){
            var person:QuotePerson = personIterator.next();
            var personAge:number = person.getAge();
            var useSCCC:boolean = person.getIsUseSCCC();

            var medicalDeclarationRequired:boolean = this.rateTableGuide.isMedicalDeclarationRequired(personAge, useSCCC);

            person.setMedicalDeclarationRequired(medicalDeclarationRequired);
            console.log("Person "+personAge+"  medicalDeclarationRequired="+medicalDeclarationRequired);
        }
    }
}
