///<reference path="NodeTreeRenderer.ts"/>
///<reference path="../../../questions/answer/booleanAnswer/BooleanAnswer.ts"/>
///<reference path="../../../questions/answer/singleSelectionAnswer/SingleSelectionAnswer.ts"/>
///<reference path="../../../questions/answer/multipleSelectionAnswer/MultipleSelectionAnswer.ts"/>
///<reference path="../../../questions/answer/textAnswer/TextInputAnswer.ts"/>
///<reference path="../../../questions/answer/dateSelectionAnswer/DateSelectionAnswer.ts"/>
class VariationRendererFactory{
    public static create(type:string):Answer{
        if(type == ObjectType.BOOLEAN_ANSWER){
            return new BooleanAnswer();
        }
        else if(type == ObjectType.SINGLE_SELECTION_ANSWER){
            return new SingleSelectionAnswer();
        }
        else if(type == ObjectType.MULTIPLE_SELECTION_ANSWER){
            return new MultipleSelectionAnswer();
        }
        else if(type == ObjectType.TEXT_INPUT_ANSWER){
            return new TextInputAnswer();
        }
        else if(type == ObjectType.DATE_SELECTION_ANSWER){
            return new DateSelectionAnswer();
        }
        return;
    }
}
