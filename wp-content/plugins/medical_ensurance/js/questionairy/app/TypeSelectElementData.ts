///<reference path="../questions/parsers/ObjectTypeStringFormatter.ts"/>
class TypeSelectElementData{

    private types:string[];
    private data:any[];
    
    constructor(){
        this.createTypes();
        this.createData();
    }
    
    public getData():any[]{
       return this.data;
    }

    private createTypes():void {
        this.types = new Array();
        this.types.push(ObjectType.BOOLEAN_ANSWER);
        this.types.push(ObjectType.TEXT_INPUT_ANSWER);
        this.types.push(ObjectType.TEXT_VIEW_ANSWER);
        this.types.push(ObjectType.DATE_SELECTION_ANSWER);
        this.types.push(ObjectType.SINGLE_SELECTION_ANSWER);
        this.types.push(ObjectType.MULTIPLE_SELECTION_ANSWER);
    }

    private createData():void {
        this.data =  new Array();
        for(var i:number = 0; i<this.types.length; i++){
            var typeId:string = this.types[i];
            var typeText:string = ObjectTypeStringFormatter.format(typeId);
            this.data.push({id:typeId, text:typeText});
        }
    }
}
