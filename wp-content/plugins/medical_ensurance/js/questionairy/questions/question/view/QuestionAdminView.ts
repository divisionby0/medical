///<reference path="IQuestionView.ts"/>
///<reference path="../../parsers/ObjectType.ts"/>
class QuestionAdminView implements IQuestionView{
    decorateText(text:string, type:string):string {
        var typeHtml:string = "";
        
        if(type == ObjectType.BOOLEAN_ANSWER){
            typeHtml = "  (<font color='green'>looks like:</font><input type='checkbox' disabled='disabled'>)";
        }
        else if(type == ObjectType.SINGLE_SELECTION_ANSWER){
            typeHtml = "  (<font color='green'>looks like:</font><select disabled='disabled'><option selected='selected'>option 1</option></select>)";
        }
        else if(type == ObjectType.MULTIPLE_SELECTION_ANSWER){
            typeHtml = "  (<font color='green'>looks like:</font><input type='checkbox' disabled='disabled'>1<input type='checkbox' disabled='disabled'>2<input type='checkbox' disabled='disabled'>3)";
        }
        else if(type == ObjectType.TEXT_INPUT_ANSWER){
            typeHtml = "  (<font color='green'>looks like:</font><input type='text' placeholder='enter text here ...' disabled='disabled'>)";
        }
        else if(type == ObjectType.DATE_SELECTION_ANSWER){
            typeHtml = "  (<font color='green'>looks like:</font><span class='glyphicon glyphicon-calendar' aria-hidden='true'></span>)";
        }
        return text+typeHtml;
    }
}
