///<reference path="TextEditableDialogContent.ts"/>
///<reference path="../../NodeDialogEventType.ts"/>
///<reference path="../../../../../questions/parsers/ObjectType.ts"/>
///<reference path="../../../../../../events/EventBus.ts"/>
class AnswerCreationDialogContent extends TextEditableDialogContent{
    
    constructor(parent:any){
        super(parent);
    }

    protected getTextInputLegendText():string{
        return "Answer text:";
    }

    protected onConfirmed():void{
        super.onConfirmed();
        
        if(this.isTextValid){
            EventBus.dispatchEvent(NodeDialogEventType.CREATE, {text:this.text, type:ObjectType.QUESTION});
        }
        else{
            this.addTextErrorText();
        }
    }
}
