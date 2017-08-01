///<reference path="TextInputQuestionRenderer.ts"/>
class TextViewQuestionRenderer extends TextInputQuestionRenderer{
    constructor(data:Question, container:any){
        super(data, container);
    }

    hasUserValue():boolean{
        // TODO вот это - полное гавно !!! Нельзя чтобы рендерер определял не касающиеся его данные. Это нужно считать в модели данных !
        return this.isChildrenHasUserValue();
    }
    
    protected getControl():any{
        return this.$j('');
    }
}
