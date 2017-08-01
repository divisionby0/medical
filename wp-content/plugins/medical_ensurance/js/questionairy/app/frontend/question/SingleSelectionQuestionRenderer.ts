///<reference path="QuestionRenderer.ts"/>
///<reference path="../../../questions/question/Question.ts"/>
class SingleSelectionQuestionRenderer extends QuestionRenderer{

    private options:any[];

    constructor(data:Question, container:any){
        super(data, container);
    }

    clear():void{
        super.clear();
        this.control.val(this.options[0]);
        this.controlChangedHandler();
    }


    protected createChildren():void{

        this.answer = this.data.getAnswer();
        this.value = this.answer.getValue();

        var formatCollection:FormatCollection = new FormatCollection(this.answer);
        var items:any[] = formatCollection.format();
        new SortChildren(items);

        this.options = new Array();
        for(var i:number = 0; i<items.length; i++){
            var answerVariation:AnswerVariation = items[i];
            this.options.push(answerVariation.getText());
        }

        this.createChildrenContainer();

        this.createText();
        this.updateText();
        this.createControl(this.childrenContainer);

        this.control.change(()=>this.controlChangedHandler());
    }

    protected getControl():any{
        var control:any = this.$j('<select>');
        for(var i:number=0; i<this.options.length;i++){
            if(this.options[i] == this.value){
                var option:any = this.$j('<option selected="selected">'+this.options[i]+'</option>');
            }
            else{
                var option:any = this.$j('<option>'+this.options[i]+'</option>');
            }


            control.append(option);
        }
        return control;
    }

    private controlChangedHandler():void {
        this.data.getAnswer().setValue(this.control.val());
    }

    /*
    setEnabled(enabled:boolean):void{
         this.enabled = enabled;

         if(this.enabled){
             this.control.attr('disabled', false);
             this.textLabel.removeClass("disabledElement");
         }
         else{
             this.control.attr('disabled', true);
             this.textLabel.addClass("disabledElement");
         }
         this.onEnabledChanged();
    }
    */

    protected onEnabledChanged():void{
         if(this.enabled){
            this.textLabel.removeClass('disabledElement');
         }
         else{
            this.textLabel.addClass('disabledElement');
         }

         for(var i:number=0; i<this.children.length;i++){
             var child:any = this.children[i];
             child.setEnabled(this.enabled);
         }
    }
}
