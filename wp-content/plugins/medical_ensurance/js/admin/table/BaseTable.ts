/// <reference path="../../collections/Map.ts"/>
class BaseTable{

    public data:Map<any>;

    public prefix:string;
    public postfix:string;
    public htmlContent:string = '';
    public rowMaxLength:number = 100;
    public rowStartIndex:number = 0;

    constructor(id:string, data:Map<any>, rowStartIndex:number, rowMaxLength:number){
        if(rowMaxLength){
            this.rowMaxLength = rowMaxLength;
        }
        if(rowStartIndex){
            this.rowStartIndex = rowStartIndex;
        }

        if(data && data.size()>0){
            this.data = data;
            this.createPrefixAndPostfix(id);
            this.createContent();
        }
    }

    private createPrefixAndPostfix(id):void{
        this.prefix = '<b><font color="red">Info: N/A values should set to -1</font></b><table id="'+id+'">';
        this.postfix = '</table>';
    }

    private createContent():void{
        this.createLegendRow();
        this.createContentFromData();
    }

    createContentFromData():void{

    }

    createRow(row):void{
    }

    public addLegendRow(row):void{
        this.htmlContent = this.htmlContent + '<td><b><font color="blue">$' + row.getId() + '</font></b></td>';
    }

    createLegendRow():void{
    }

    public getHTML():string{
        return this.prefix + this.htmlContent + this.postfix;
    }
}
