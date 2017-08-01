///<reference path="IQuestionView.ts"/>
///<reference path="QuestionAdminView.ts"/>
class QuestionViewFactory{
    public static QUESTION_ADMIN_VIEW:string = "QUESTION_ADMIN_VIEW";
    
    static getView(type:string):IQuestionView{
        if(type == QuestionViewFactory.QUESTION_ADMIN_VIEW){
            return new QuestionAdminView();
        }
    }
}
