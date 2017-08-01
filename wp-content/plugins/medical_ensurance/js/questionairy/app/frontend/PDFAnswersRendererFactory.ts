///<reference path="../../questions/parsers/ObjectType.ts"/>
///<reference path="answer/pdf/TextInputAnswerRendererPDF.ts"/>
///<reference path="answer/pdf/BooleanAnswerRendererPDF.ts"/>
///<reference path="answer/pdf/TextViewAnswerRendererPDF.ts"/>
class PDFAnswersRendererFactory{
    public static create(type:string, data:any, container:any):any{
        if(type == ObjectType.BOOLEAN_ANSWER){
            return new BooleanAnswerRendererPDF(data, container);
        }
        else if(type == ObjectType.TEXT_INPUT_ANSWER){
            return new TextInputAnswerRendererPDF(data, container);
        }
        else if(type == ObjectType.MULTIPLE_SELECTION_ANSWER){
            return null;
        }
        else if(type == ObjectType.SINGLE_SELECTION_ANSWER){
            return null;
        }
        else if(type == ObjectType.TEXT_VIEW_ANSWER){
            return new TextViewAnswerRendererPDF(data, container);
        }
        else if(type == ObjectType.DATE_SELECTION_ANSWER){
            return null;
        }
    }
}
