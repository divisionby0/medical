///<reference path="QuotePerson.ts"/>
///<reference path="QuotePersonAdminView.ts"/>
///<reference path="../../../questionairy/app/UserAnswersPDFView.ts"/>
class QuotePersonPDFView extends QuotePersonAdminView{
    
    constructor(person:QuotePerson, container:any){
        super(person, container);
    }

    protected createQuestionsView():void {
        var questions:any = this.person.getQuestions();
        new UserAnswersPDFView(questions, this.questionsContainerId);
    }

    protected createQuestionsContainer():void {
        this.questionsContainerId = "questions_"+Math.round(Math.random()*100000);
        var questionsContainerHeader:any = this.$j("<div><h1 style='width: 100%; background-color: #dff0d8; text-align: center;'>Medical declaration questions</h1></div>");
        this.questionsContainer = this.$j("<div id='"+this.questionsContainerId+"'></div>");

        this.personContainer.append(questionsContainerHeader);
        this.personContainer.append(this.questionsContainer);
    }
}
