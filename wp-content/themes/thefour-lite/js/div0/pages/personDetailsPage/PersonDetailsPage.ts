///<reference path="../../utils/formatters/MoneyFormatter.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/questionairy/app/FrontendUserQuestions.ts"/>
///<reference path="../views/SelectionForm.ts"/>
///<reference path="../../utils/NavigatorUtil.ts"/>
///<reference path="../BasePage.ts"/>
///<reference path="questions/PersonQuestionsView.ts"/>
///<reference path="confirmation/PersonConfirmationView.ts"/>
///<reference path="error/PersonDetailsErrorView.ts"/>
///<reference path="NavigateToPrevPageDetector.ts"/>
///<reference path="confirmation/PersonConfirmationAnswersView.ts"/>
///<reference path="../../utils/QuoteSaver.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/utils/Cookie.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/db/DB.ts"/>
declare var StringUtils;
declare var DateUtils;
declare var ajaxurl;
declare function escape(s:string):string;
class PersonDetailsPage extends BasePage{

    private companyData:any;
    private companyId:string;
    private currentPerson:QuotePerson;

    private prevPage:string = "application-creation";
    private nextPage:string = "/card-details";
    
    private QUESTIONS:string = "QUESTIONS";
    private CONFIRMATION:string = "CONFIRMATION";
    private COMPLETE:string = "COMPLETE";
    private PREV_PAGE_REQUESTED:string = "PREV_PAGE_REQUESTED";
    
    private currentState:string;

    private questionsView:PersonQuestionsView;
    private confirmationView:PersonConfirmationView;

    private answerInvalidErrorType:string = "answerInvalid";
    private confirmationInvalidErrorType:string = "confirmationInvalid";
    private errorView:PersonDetailsErrorView;
    
    constructor(){
        super();
    }
    
    public create():void{
        this.companyData = this.getCompany();
        this.parseCompany(this.companyData);

        this.persons = this.getPersons();

        this.currentPerson = this.getUncompletePerson();
        this.onCurrentPersonChanged();

        this.createNavigationListeners();
    }

    private onCurrentPersonChanged():void{
        var isUndefined:boolean = typeof this.currentPerson == 'undefined';

        if(!isUndefined){
            this.currentState = this.QUESTIONS;
            this.onStateChanged();
        }
        else{
            this.savePersonsData();
            this.navigateTo(this.nextPage);
        }
    }

    private savePersonsData():void{

        var quoteId:string = Cookie.getQuoteId();

        var personsData:string = this.persons.getData();
        var decodedPersonsData:string = escape(personsData);
        DB.savePersons(decodedPersonsData, quoteId);
    }
    
    private getUncompletePerson():any{
        var personIterator:MapIterator = this.persons.getIterator();
        while(personIterator.hasNext()){
            var person:QuotePerson = personIterator.next();
            if(!person.getIsComplete()){
                return person;
            }
        }
        return;
    }

    private onStateChanged():void{
        if(this.currentState == this.QUESTIONS){
            this.showQuestions();
        }
        else if(this.currentState == this.CONFIRMATION){
            this.showConfirmation();
        }
    }

    private showQuestions():void{
        this.questionsView = new PersonQuestionsView(this.currentPerson, this.companyId);
    }

    private hideQuestions():void{
        if(this.questionsView){
            this.questionsView.destroy();
        }
    }

    private showConfirmation():void{
        this.confirmationView = new PersonConfirmationAnswersView(this.currentPerson);
    }

    private hideConfirmation():void{
        if(this.confirmationView){
            this.confirmationView.destroy();
        }
    }

    private createNavigationListeners():void {
        this.$j("#nextButton").click(()=>this.onNextButtonClick());
        this.$j("#prevButton").click(()=>this.onPrevButtonClick());
    }

    private onNextButtonClick():void{
        this.hideError();

        if(this.currentState == this.QUESTIONS){
            var personMedicalAnswerIsValid:Boolean = this.questionsView.isValid();
            
            if(personMedicalAnswerIsValid){
                this.onQuestionsAnswerValid();
            }
            else{
                this.showError(this.answerInvalidErrorType);
            }

        }
        else if(this.currentState == this.CONFIRMATION){
            var dataIsValid:boolean = this.confirmationView.isValid();

            if(dataIsValid){
                this.onAnswersConfirmed();
            }
            else {
                this.showError(this.confirmationInvalidErrorType);
            }
        }
    }
    
    private onPrevButtonClick():void{
        var personIterator:MapIterator = this.persons.getIterator();
        var navigateToPrevPageDetector:NavigateToPrevPageDetector = new NavigateToPrevPageDetector(personIterator);
        var prevPageNavigateRequested:boolean = navigateToPrevPageDetector.detect(this.currentState);

        if(prevPageNavigateRequested){
           this.navigateTo(this.prevPage);
        }
        else{
            this.prevPerson();
        }
    }

    private prevPerson():void{
        this.dropCompleteForEachPerson();

        this.hideConfirmation();
        this.hideQuestions();
        this.hideError();

        this.currentPerson = this.getUncompletePerson();
        this.onCurrentPersonChanged();
    }

    private dropCompleteForEachPerson():void{
        var personIterator:MapIterator = this.persons.getIterator();

        while(personIterator.hasNext()){
            var person:QuotePerson = personIterator.next();
            person.setIsComplete(false);
        }
    }

    private onQuestionsAnswerValid():void{
        this.hideQuestions();
        this.currentState = this.CONFIRMATION;
        this.onStateChanged();
    }

    private onAnswersConfirmed():void {
        this.hideConfirmation();
        this.currentPerson.setIsComplete(true);
        this.currentPerson = this.getUncompletePerson();
        this.onCurrentPersonChanged();
    }

    private navigateTo(page:string):void{
        console.log("navigate to "+page);

        //this.$j("#confirmationHeaderContainer").text("Please wait...");
        //this.$j("#personDetailsContainer").hide();

        if(page == "/card-details"){
            this.$j("#confirmationHeaderContainer").text("Please wait...");
            this.$j("#personDetailsContainer").hide();
            this.$j("#nextButton").hide();
            this.$j("#prevButton").hide();
        }

        NavigatorUtil.navigateTo(page);
    }

    private getCompany():any{
        var companyDecodedData:string = Cookie.getSelectedCompanyData();
        var companyData:any = StringUtils.parseURI(companyDecodedData);
        return companyData;
    }

    private parseCompany(companyData:any):void{
        this.companyId = companyData.companyId;
    }

    private hideError():void{
        if(this.errorView){
            this.errorView.destroy();
        }
    }

    private showError(type:string):void{
        this.errorView = new PersonDetailsErrorView(this.$j("#userPersonalDataErrorText"));
        
        if(type == "answerInvalid"){
            this.errorView.showAnswerError();
        }
        else if(type == "confirmationInvalid"){
            this.errorView.showConfirmationError();
        }
    }
}
