///<reference path="ObjectType.ts"/>
class ObjectTypeStringFormatter{
    static format(sourse:string):string{
        switch(sourse){
            case ObjectType.BOOLEAN_ANSWER:
                return "Boolean answer";
            case ObjectType.TEXT_INPUT_ANSWER:
                return "Text input answer";
            case ObjectType.TEXT_VIEW_ANSWER:
                return "Just text";
            case ObjectType.SINGLE_SELECTION_ANSWER:
                return "Single selection answer";
            case ObjectType.MULTIPLE_SELECTION_ANSWER:
                return "Multiple selection answer";
            case ObjectType.DATE_SELECTION_ANSWER:
                return "Date selection answer";
        }
        return;
    }
}
