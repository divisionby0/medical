/// <reference path="BaseTable.ts"/>
/// <reference path="../view/itemRenderer/TextInputItemRenderer.ts"/>
class Table extends BaseTable{

    constructor(id:string, data:Map<any>, rowStartIndex:number, rowMaxLength:number){
        super(id, data, rowStartIndex, rowMaxLength);
    }

    createContentFromData():void{
        var dataIterator = this.data.getIterator();
        while(dataIterator.hasNext()){
            var row:Map<any> = dataIterator.next();
            this.createRow(row);
        }
    }

    createRow(row):void{
        this.htmlContent = this.htmlContent + '<tr id="'+row.getId() + '">';

        super.addLegendRow(row);

        var collectionKeys = row.getKeys();
        for(var i:number = 0; i<collectionKeys.length; i++){
            var key = collectionKeys[i];
            var value = row.get(key);

            var itemRenderer = new TextInputItemRenderer('id', value, row.getId(), key);

            var rendererHtml:string = itemRenderer.getHTML();

            this.htmlContent = this.htmlContent + rendererHtml;
        }
        this.htmlContent = this.htmlContent + '</tr>';
    }

    createLegendRow():void{
        this.htmlContent = this.htmlContent + '<tr id="legendRow">';
        this.htmlContent = this.htmlContent + '<th>Aggregate Policy Limit</th>';

        for(var i = this.rowStartIndex; i < this.rowMaxLength; i++){
            this.htmlContent = this.htmlContent + '<th>' + i + ' y.o.</th>';
        }
        this.htmlContent = this.htmlContent + '</tr>';
    }
}
