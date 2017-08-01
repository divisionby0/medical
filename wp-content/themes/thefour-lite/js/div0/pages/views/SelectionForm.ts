///<reference path="../../../libs/jqueryTS/jquery.d.ts"/>
class SelectionForm{
    protected $j:any;
    
    protected inputElement:any;
    private inputElementId:string;
    protected form:any;
    protected formId:string;

    private table:any;
    private tableId:string;

    protected selectedItem:any = 1;
    protected selectedRow:any;

    private selectedIndex:number;
    
    constructor(selectedItem:any, inputElementId:string, formId:string, tableId:string){
        this.$j = jQuery.noConflict();
        
        this.inputElementId = inputElementId;
        this.inputElement = this.getInputElement();
        
        this.formId = formId;
        this.form = this.getFormElement();
        
        this.tableId = tableId;
        this.table = this.getTableElement();
        
        this.addListener();
        console.log("selectedItem=",selectedItem);

        if(selectedItem){
            this.selectedItem = selectedItem;
            this.updateSelectedIndexByValue(this.selectedItem);
            this.selectedIndex+=1;
        }
        this.selectItem(this.selectedIndex);
        this.updateInput();
    }
    
    public submit():void{
        this.$j("#"+this.formId).submit();
    }
    
    public getSelection():any{
        return this.selectedItem;
    }
    
    private getInputElement():any{
        return this.$j("#"+this.inputElementId);
    }
    private getFormElement():any{
        return this.$j("#"+this.formId);
    }
    private getTableElement():any {
        return this.$j("#"+this.tableId);
    }
    
    private updateInput():void{
        this.inputElement.val(this.selectedItem);
    }
    
    private selectItem(index):void{
        var row = this.$j("#"+this.tableId+" > tbody  > tr").eq(index);
        this.selectedItem = row.attr('id');
        row.addClass('itemSelected');
        this.selectedRow = row;
    }
    
    private updateSelectedIndexByValue(givenValue){
        this.selectedIndex = -1;

        this.$j('#'+this.tableId+' > tbody  > tr').not(':first').each((index, value)=>this.findIndex(index, value, givenValue));
    }

    private findIndex(index, value, givenIndex):void{
        var element:any = this.$j(value);
        var elementId:any = element.attr("id");

        if(parseInt(elementId) == parseInt(givenIndex)){
            this.selectedIndex = index;
        }
    }

    private tableRowIterator(index, value):void{
        this.addListeners(value);
    }

    private addListeners(value):void{
        this.$j(value).hover((event)=>this.onRowHoverIn(event), (event)=>this.onRowHoverOut(event));
        this.$j(value).click((event)=>this.onClick(event));
    }

    private onClick(event):void{
        var element:any = this.$j(event.target).parent();
        var itemId:string = element.attr('id');

        this.selectedItem = itemId;

        this.updateInput();

        try{
            this.selectedRow.removeClass('itemSelected');
        }
        catch(error){
        }
        this.selectedRow = element;
        this.submitForm();
        
        element.addClass('itemSelected');
    }

    private onRowHoverIn(event):void{
        this.$j(event.target).parent().addClass('itemHovered');
    }

    private onRowHoverOut(event):void{
        this.$j(event.target).parent().removeClass('itemHovered');
    }

    private addListener(){
        this.$j('#'+this.tableId+' > tbody  > tr').not(':first').each((index, value)=>this.tableRowIterator(index, value));
    }

    protected submitForm(){
    }
}
