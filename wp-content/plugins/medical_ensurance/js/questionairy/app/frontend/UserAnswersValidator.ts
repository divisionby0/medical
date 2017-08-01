///<reference path="question/QuestionRenderer.ts"/>
///<reference path="question/IUserAnswer.ts"/>
class UserAnswersValidator{

    private collection:IUserAnswer[];
    
    constructor(collection:IUserAnswer[]){
        this.collection = collection;
    }
    
    validate():boolean{
        var isValid:boolean = true;
        for(var i:number = 0;i < this.collection.length; i++){
            var userAnswer:IUserAnswer = this.collection[i];
        }
    }
}
