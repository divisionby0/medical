///<reference path="../question/Question.ts"/>
///<reference path="../parsers/ObjectType.ts"/>
///<reference path="../answer/variation/AnswerVariation.ts"/>
///<reference path="../collection/QuestionsCollection.ts"/>
class ObjectUtil{
    public static getObjectType(object:any):string{
        if(object instanceof Question){
            return ObjectType.QUESTION;
        }
        else if(object instanceof AnswerVariation){
            return ObjectType.ANSWER_VARIATION;
        }
        else if(object instanceof QuestionsCollection){
            return ObjectType.QUESTION_COLLECTION;
        }
    }
}
