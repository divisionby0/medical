///<reference path="../collection/QuestionsCollection.ts"/>
///<reference path="QuestionParser.ts"/>
///<reference path="../question/view/QuestionAdminView.ts"/>
///<reference path="../question/view/QuestionViewFactory.ts"/>
///<reference path="../../../collections/Map.ts"/>
class QuestionCollectionParser{
    public static parse(map:Map<any>, questionViewType:string):QuestionsCollection{
        var questionsCollection:QuestionsCollection = new QuestionsCollection('questions');

        //console.log("parsing ",map);

        try{
            var mapIterator:MapIterator = map.getIterator();
            while(mapIterator.hasNext()){
                var item:any = mapIterator.next();

                //console.log("item=",item);

                var type:string = item.type;

                //console.log("type="+type);

                if(type == "question"){
                    //console.log("is question");
                    var question:Question = QuestionParser.parse(item, questionViewType);
                    var questionIndex:number = item.index;

                    question.setView(QuestionViewFactory.getView(questionViewType));
                    questionsCollection.addQuestion(question);
                    question.setIndex(questionIndex);
                }
            }
        }
        catch(error){
            console.error("QuestionCollectionParser error:"+error);
        }

        return questionsCollection;
    }
}
