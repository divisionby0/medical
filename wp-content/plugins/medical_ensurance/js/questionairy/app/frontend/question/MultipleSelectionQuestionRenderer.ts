///<reference path="QuestionRenderer.ts"/>
class MultipleSelectionQuestionRenderer extends QuestionRenderer{
    
    constructor(data:Question, container:any){
        super(data, container);
    }

    setEnabled(enabled:boolean):void{
        this.enabled = enabled;

        //console.log("Multiple ",this.data.getText(),"setEnabled to",this.enabled);
        
        if(this.enabled){
            this.textLabel.removeClass("disabledElement");
        }
        else{
            this.textLabel.addClass("disabledElement");
        }
        this.onEnabledChanged();
    }

    hasUserValue():boolean{
        // TODO вот это - полное гавно !!! Нельзя чтобы рендерер определял не касающиеся его данные. Это нужно считать в модели данных !
        return this.isChildrenHasUserValue();
    }

    protected createChildren():void{
        super.createChildren();

        var formatCollection:FormatCollection = new FormatCollection(this.data.getAnswer());
        var items:Question[] = formatCollection.format();
        new SortChildren(items);

        for(var i:number = 0; i<items.length; i++){
            var optionSubQuestion:Question = items[i];
            var optionContainer:any = this.$j('<div>');
            this.container.append(optionContainer);
            var renderer:BooleanQuestionRenderer = new BooleanQuestionRenderer(optionSubQuestion, optionContainer);
            this.children.push(renderer);
        }
    }
    
    protected getControl():any{
        var control:any = this.$j('<div>');
        return control;
    }
}
