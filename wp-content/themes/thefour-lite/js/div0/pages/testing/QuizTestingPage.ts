///<reference path="../BasePage.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/questionairy/app/FrontendUserQuestions.ts"/>
class QuizTestingPage extends BasePage{
    
    constructor(){
        super();
    }

    public create():void{
        var questionsData:string = this.$j("#sampleQuestions").text();
        console.log("Quiz testing page create...");
        console.log("questions: "+questionsData);
        //new FrontendUserQuestions()
        new FrontendUserQuestions(questionsData, "questionsRootContainer");
    }
}
