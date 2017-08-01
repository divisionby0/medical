///<reference path="../../../questions/question/Question.ts"/>
///<reference path="../view/NodeTreeRenderer.ts"/>
///<reference path="../answer/AnswerRenderer.ts"/>
///<reference path="../UserQuestionsRendererFactory.ts"/>
///<reference path="IUserAnswer.ts"/>
class QuestionRenderer extends NodeTreeRenderer implements IUserAnswer{
    protected answer:Answer;
    protected value:string;
    private errorContainer:any;

    constructor(data:Question, container:any){
        super(data, container);
    }

    protected createChildren():void{
        this.createAnswer();
        this.createValue();
        this.createErrorContainer();
        super.createChildren();
    }
    
    protected createAnswer():void{
        this.answer = this.data.getAnswer();
    }
    protected createValue():void{
        this.value = this.answer.getValue();
    }
    
    hasUserValue():boolean{
        return false;
    }

    // TODO вот это - полное гавно !!! Нельзя чтобы рендерер определял не касающиеся его данные. Это нужно считать в модели данных !
    protected isChildrenHasUserValue():boolean{
        var result:boolean = false;
        var collectionToTraverse:any[] = this.getCollectionToTraverse();
        for(var i:number = 0; i<collectionToTraverse.length; i++){

            var child:any = collectionToTraverse[i];
            var childHasUserValue:boolean = child.hasUserValue();
            if(childHasUserValue){
                result = true;
                break;
            }
        }

        return result;
    }

    protected getCollectionToTraverse():any[]{
        return this.children;
    }
    
    setEnabled(enabled:boolean):void{
        this.enabled = enabled;

        if(this.enabled){
            this.control.attr('disabled', false);
            this.control.show();
            this.textLabel.removeClass("disabledElement");
        }
        else{
            this.control.attr('disabled', true);
            this.control.hide();
            this.textLabel.addClass("disabledElement");
        }
        this.onEnabledChanged();
    }

    protected onEnabledChanged():void{
        if(this.enabled){
            this.textLabel.removeClass('disabledElement');
        }
        else{
            this.textLabel.addClass('disabledElement');
        }

        this.updateChildrenEnabled(this.enabled);
    }

    protected updateChildrenEnabled(enabled:boolean):void{
        for(var i:number=0; i<this.children.length;i++){
            var child:any = this.children[i];
            child.setEnabled(enabled);
        }
    }
    
    protected showError():void{
        this.errorContainer.show();
        this.errorContainer.addClass("errorBackground");
    }

    protected hideError():void{
        this.errorContainer.hide();
        this.errorContainer.removeClass("errorBackground");
    }
    
    private createErrorContainer():void {
        this.errorContainer = this.$j('<div style="color: yellow; display: none;">Has answered children questions. Please check parent or remove sub answers </div>');
        this.container.append(this.errorContainer);
    }
}
