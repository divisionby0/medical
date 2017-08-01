/// <reference path="BaseItemRenderer.ts"/>
/// <reference path="../../../libs/jqueryTS/jquery.d.ts"/>

class TextInputItemRenderer extends BaseItemRenderer{
    private rowId:string;
    private inputId:string;
    private columnKey:number;
    private textInput:any;

    constructor(id:string, data:any, rowId:string, columnKey:number){
        super(id, data);
        this.rowId = rowId;
        this.columnKey = columnKey;
        this.inputId = this.rowId+"_"+this.columnKey;
        this.createInput();
    }

    public setState(state:string):void{
        if(state == 'normal'){
            this.textInput.removeClass('negativeValue');
        }
        else if('negative'){
            this.textInput.addClass('negativeValue');
        }
    }

    private createInput():void{
        var convertedValue:number = this.data;

        if(this.data != -1 && this.data != '-1'){
            convertedValue = parseInt(this.data)/1000;
        }

        var isNegative = convertedValue < 0;

        this.textInput = jQuery('<input class="tableCeilItemRenderer" type="text" id="' + this.inputId + '" value="' + convertedValue + '" data-rowid="' + this.rowId + '" data-columnkey="' + this.columnKey + '">');

        if(isNegative){
            this.textInput.addClass('negativeValue');
        }
    }

    getHTML():string{
        if(this.textInput){
            return '<td>'+this.textInput.prop('outerHTML')+'</td>';
        }
        else{
            return;
        }
    }
}
