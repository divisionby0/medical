///<reference path="../answer/AnswerRenderer.ts"/>
///<reference path="./QuestionRenderer.ts"/>
///<reference path="../RendererFactoryClass.ts"/>
///<reference path="../../../questions/sort/SortChildren.ts"/>
///<reference path="../collection/FormatCollection.ts"/>
class TextInputQuestionRenderer extends QuestionRenderer{

    protected textInput:any;
    protected placeholderText:string;

    constructor(data:Question, container:any){
        super(data, container);
    }

    hasUserValue():boolean{
        // TODO вот это - полное гавно !!! Нельзя чтобы рендерер определял не касающиеся его данные. Это нужно считать в модели данных !
        if(this.value!=""){
            return true;
        }
        else{
            return this.isChildrenHasUserValue();
        }
    }
    clear():void{
        if(this.textInput){
            this.textInput.val("");
            this.onTextInputChanged();
        }
        super.clear();
    }

    setEnabled(enabled:boolean):void{
        this.enabled = enabled;
        this.onEnabledChanged();
    }

    protected onEnabledChanged():void{
        //console.log("Text ",this.data.getText(),"onEnabledChanged ",this.enabled);
        if(this.enabled){
            this.control.attr('disabled', false);
            this.textLabel.removeClass("disabledElement");
        }
        else{
            this.control.attr('disabled', true);
            this.textLabel.addClass("disabledElement");
        }
        this.updateChildrenEnabled(this.enabled);
    }

    protected createChildren():void{
        this.placeholderText = this.getPlaceholderText();
        this.createAnswer();
        this.createValue();

        this.createChildrenContainer();
        this.createText();
        this.updateText();
        this.createControl(this.childrenContainer);

        this.orderChildren();
        
        this.createTextInputListener();
        this.onEnabledChanged();
    }

    protected orderChildren():void{
        var formatCollection:FormatCollection = new FormatCollection(this.data.getAnswer());
        var items:Question[] = formatCollection.format();
        new SortChildren(items);

        for(var i:number = 0; i<items.length; i++){
            var question:ICompositeNode = items[i];
            var questionRenderer:any = RendererFactoryClass.getClass().create(question.getType(), question, this.container);
            this.children.push(questionRenderer);
        }
    }
    
    protected getControl():any{
        this.textInput = this.$j('<input type="text" value="'+this.value+'" id="textInput" placeholder="'+this.placeholderText+'">');
        return this.textInput;
    }

    protected createTextInputListener():void {
        if(this.textInput){
            this.textInput.on('input',()=>this.onTextInputChanged());
        }
    }

    protected onTextInputChanged():void {
        this.answer.setValue(this.textInput.val());
    }

    private getPlaceholderText():string {
        return this.data.getPlaceholderText();
    }
}
