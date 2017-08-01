///<reference path="../../../../../../../plugins/medical_ensurance/js/questionairy/app/FrontendUserQuestions.ts"/>
///<reference path="../validator/PersonMedicalDeclarationAnswerValidator.ts"/>
///<reference path="../../../../../../../plugins/medical_ensurance/js/admin/quote/persons/QuotePerson.ts"/>
///<reference path="../../../../../../../plugins/medical_ensurance/js/questionairy/questions/utils/QuestionCollectionCutter.ts"/>
///<reference path="../../../../../../../plugins/medical_ensurance/js/events/EventBus.ts"/>
declare var ajaxurl;
class PersonQuestionsView{

    private $j:any;
    private person:QuotePerson;
    private companyId:string;
    private userQuestionsView:FrontendUserQuestions;
    
    private hasAnsweredSavedQuestions:boolean = false;

    constructor(person:QuotePerson, companyId:string){
        this.$j = jQuery.noConflict();
        this.person = person;
        this.companyId = companyId;
        this.createChildren();
    }

    public destroy():void{
        this.$j("#questionsRootContainer").empty();
    }
    
    public isValid():boolean{
        var validator:PersonMedicalDeclarationAnswerValidator = new PersonMedicalDeclarationAnswerValidator(this.userQuestionsView.getData());
        return validator.validate();
    }
    
    public getAnswers():QuestionsCollection{
        return this.person.getQuestions().getEncoder().encode();
    }
    
    private createChildren():void {
        this.$j("#personHeaderContainer").show();
        this.$j("#confirmationHeaderContainer").hide();
        
        this.$j("#personHeaderContainer").text(this.person.getFirstName()+"   "+this.person.getLastName());

        this.$j("#firstNameContainer").text(this.person.getFirstName());
        this.$j("#lastNameContainer").text(this.person.getLastName());
        this.$j("#genderContainer").text(this.person.getGender());
        this.$j("#dateOfBirthContainer").text(this.person.getBirthday());
        this.$j("#ageContainer").text(this.person.getAge());

        this.getQuestions();
    }

    private getQuestions():void {
        var questionsLoaded:boolean = this.questionsIsLoaded();

        if(!questionsLoaded){
            this.loadQuestions();
        }
        else{
            this.createSavedQuestionsFrontend();
        }
    }

    private onQuestionsLoadComplete(response:string):void {
        this.$j("#questionsPreloaderTextContainer").addClass("hidden");
        var personQuestions:QuestionsCollection;

        var dataDecoder:MapJsonDecoder = new MapJsonDecoder(response);
        var map:any = dataDecoder.decode();

        var parsedQuestions:QuestionsCollection = QuestionCollectionParser.parse(map, '');

        console.log("this.person.getMedicalDeclarationRequired()="+this.person.getMedicalDeclarationRequired());

        if(!this.person.getMedicalDeclarationRequired()){
            var collectionCutter:QuestionCollectionCutter = new QuestionCollectionCutter(parsedQuestions);
            var cuttedQuestions:QuestionsCollection = collectionCutter.getQuestionsBeforeFirstBoolean();
            personQuestions = cuttedQuestions;
        }
        else{
            personQuestions = parsedQuestions;
        }
        
        var encodedQuestionsData:string = personQuestions.getEncoder().encode();

        this.userQuestionsView = new FrontendUserQuestions(encodedQuestionsData, "questionsRootContainer");
        this.person.setQuestions(this.userQuestionsView.getData());
    }

    private questionsIsLoaded():boolean{
        return !this.$j.isEmptyObject(this.person.getQuestions());
    }

    private loadQuestions():void{
        this.$j("#questionsPreloaderTextContainer").removeClass("hidden");
        var data = {'action':'loadQuestions', 'companyId':this.companyId};
        this.$j.post(ajaxurl, data, (response)=>this.onQuestionsLoadComplete(response));
    }

    private createSavedQuestionsFrontend():void{
        var savedQuestionsData:string = this.person.getQuestions().getEncoder().encode();
        this.userQuestionsView = new FrontendUserQuestions(savedQuestionsData, "questionsRootContainer");
        this.person.setQuestions(this.userQuestionsView.getData());
    }
}
