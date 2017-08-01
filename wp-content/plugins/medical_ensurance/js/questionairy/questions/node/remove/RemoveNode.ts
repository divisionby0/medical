///<reference path="../../parsers/ObjectType.ts"/>
///<reference path="../../collection/QuestionsCollection.ts"/>
class RemoveNode{
    constructor(node:any, collection:QuestionsCollection){
        var nodeType:string = node.object.type;
        var id:number = node.id;

        if(nodeType == ObjectType.QUESTION){
            collection.removeQuestion(id);
        }
        else if(nodeType == ObjectType.ANSWER_VARIATION){
            collection.removeAnswer(id);
        }
    }
}
