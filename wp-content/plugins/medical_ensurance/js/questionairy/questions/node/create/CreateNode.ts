///<reference path="../../parsers/ObjectType.ts"/>
///<reference path="../../answer/variation/AnswerVariation.ts"/>
///<reference path="../../question/view/QuestionViewFactory.ts"/>
///<reference path="../../question/CreateQuestion.ts"/>
class CreateNode{

    private questionCreator:CreateQuestion;
    
    constructor(){
        this.questionCreator = new CreateQuestion();
    }
    
    execute(data:any, currentNode:any, questionViewType:string):ICompositeNode{
        // TODO select root node if undefined selection
        if(data.type == ObjectType.QUESTION){
            console.log("create answer variations");
            var answerVariation:AnswerVariation = new AnswerVariation(data.text);
            
            this.addAnswerVariation(currentNode.object, answerVariation);
            
            return answerVariation;
        }
        else{
            var question:Question = this.createQuestion(data);
            question.setView(QuestionViewFactory.getView(questionViewType));

            var parent:any = currentNode.object;

            if(!parent){
                alert("Error. Parent node not selected. Please select parent node before.");
                return;
            }

            var isText:boolean = false;
            var isQuestion:boolean = parent.type == ObjectType.QUESTION;
            if(isQuestion){
                isText = parent.getAnswer().getType() == ObjectType.TEXT_INPUT_ANSWER || parent.getAnswer().getType() == ObjectType.TEXT_VIEW_ANSWER;
            }

            if(isQuestion && isText){
                this.addQuestion(parent.getAnswer(), question);
            }
            else{
                this.addQuestion(parent, question);
            }
            
            return question;
        }
    }

    private addQuestion(parent:any, question:Question):void{
        parent.addQuestion(question);
    }

    private addAnswerVariation(parentQuestion:Question, variation:AnswerVariation):void{
        parentQuestion.addAnswerVariation(variation);
    }

    private createQuestion(data:any):Question{
        return this.questionCreator.create(data);
    }
}
