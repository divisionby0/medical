///<reference path="../../collections/Map.ts"/>
///<reference path="../../collections/json/MapJsonDecoder.ts"/>
///<reference path="../quote/persons/QuotePerson.ts"/>
///<reference path="../quote/persons/QuotePersonCollection.ts"/>
///<reference path="../../questionairy/questions/collection/QuestionsCollection.ts"/>
///<reference path="../../questionairy/app/FrontendUserAnswers.ts"/>
///<reference path="persons/QuotePersonAdminView.ts"/>
///<reference path="persons/PersonCollectionParser.ts"/>
declare function unescape(s:string): string;
declare var StringUtils;
class QuoteEditAdminView{
    // dependency: medical_ensurance plugin
    private $j:any;

    private container:any;
    private quotedata:any;
    private answers:string;

    private persons:QuotePersonCollection;

    constructor(){
        this.$j = jQuery.noConflict();

        var quoteData:string = this.$j("#quoteData").text();

        try{
            this.quotedata = JSON.parse(quoteData);
            console.log("quote data: ",this.quotedata);
        }
        catch(error){
            console.error("quoteData is not json");
            return;
        }

        this.updateChildren();
        this.createStateDropDownListener();

        this.persons = this.getPersons();
        this.iteratePersons();
    }

    private getPersons():QuotePersonCollection {
        var personsData:string = this.$j("#personsData").html();
        var personsParser:PersonCollectionParser = new PersonCollectionParser(personsData);
          
        return personsParser.parse();
    }

    private iteratePersons():void{
        var iterator:MapIterator = this.persons.getIterator();
        while(iterator.hasNext()){
            var person:QuotePerson = iterator.next();
            new QuotePersonAdminView(person, this.$j("#personsContainer"));
        }
    }
    
    private updateChildren():void {
        this.$j("#benefitContainer").text(StringUtils.formatMoneyInt(this.quotedata.benefit));
        this.$j("#deductibleContainer").text(StringUtils.formatMoneyInt(this.quotedata.deductible));

        this.$j("#costContainer").text(StringUtils.formatDivisionalMoney(this.quotedata.cost));

        this.$j("#periodContainer").text(this.quotedata.period+" day(s)");
        this.$j("#startDateContainer").text(this.quotedata.startDate);
        this.$j("#finishDateContainer").text(this.quotedata.finishDate);
    }

    private createStateDropDownListener():void {
        this.$j("#stateDropDown").change(()=>this.onStateDropDownChanged());
    }

    private onStateDropDownChanged():void {
        console.log("onStateDropDownChanged to "+this.$j("#stateDropDown").val());
        this.$j("#applicationStateEditor").val(this.$j("#stateDropDown").val());
    }
}
