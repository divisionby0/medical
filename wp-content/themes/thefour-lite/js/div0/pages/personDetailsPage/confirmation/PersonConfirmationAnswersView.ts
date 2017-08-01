///<reference path="../../../../../../../plugins/medical_ensurance/js/questionairy/app/FrontendUserAnswers.ts"/>
///<reference path="PersonConfirmationView.ts"/>
///<reference path="../../../../../../../plugins/medical_ensurance/js/admin/quote/persons/QuotePerson.ts"/>
class PersonConfirmationAnswersView extends PersonConfirmationView{

    private answers:string;
    private answersView:FrontendUserAnswers;
    
    constructor(person:QuotePerson){
        super(person);
    }

    protected createChildren():void {
        var answeredQuestions:QuestionsCollection = this.person.getQuestions();
        this.answers = answeredQuestions.getEncoder().encode();

        this.loadAnswers();
        super.createChildren();
    }
    
    private loadAnswers():void {
        this.answersView = new FrontendUserAnswers(this.answers, this.containerId);
    }
}
