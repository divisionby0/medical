///<reference path="../../ICompositeNode.ts"/>
///<reference path="../../parsers/ObjectType.ts"/>
class EditNode{
    constructor(data:any){
        if(data.node){
            var selectedNodePayload:ICompositeNode = data.node.object;

            var nodePayloadType:string = selectedNodePayload.getType();
            selectedNodePayload.setText(data.text);

            selectedNodePayload.setTextShowAtResult(data.showTextAtResult);

            if(nodePayloadType == ObjectType.TEXT_INPUT_ANSWER || nodePayloadType == ObjectType.DATE_SELECTION_ANSWER){
                this.updatePlaceholderText(selectedNodePayload, data.placeholderText);
            }
        }
    }

    private updatePlaceholderText(selectedNode:any, placeholderText:any):void {
        selectedNode.setPlaceholder(placeholderText);
    }
}
