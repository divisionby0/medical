///<reference path="../../ICompositeNode.ts"/>
///<reference path="../../parsers/ObjectType.ts"/>
var EditNode = (function () {
    function EditNode(data) {
        if (data.node) {
            var selectedNodePayload = data.node.object;
            var nodePayloadType = selectedNodePayload.getType();
            selectedNodePayload.setText(data.text);
            selectedNodePayload.setTextShowAtResult(data.showTextAtResult);
            if (nodePayloadType == ObjectType.TEXT_INPUT_ANSWER || nodePayloadType == ObjectType.DATE_SELECTION_ANSWER) {
                this.updatePlaceholderText(selectedNodePayload, data.placeholderText);
            }
        }
    }
    EditNode.prototype.updatePlaceholderText = function (selectedNode, placeholderText) {
        selectedNode.setPlaceholder(placeholderText);
    };
    return EditNode;
}());
//# sourceMappingURL=EditNode.js.map