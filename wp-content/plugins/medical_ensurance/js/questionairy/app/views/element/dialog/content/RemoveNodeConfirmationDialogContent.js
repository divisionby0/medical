///<reference path="../../IHtmlElement.ts"/>
///<reference path="../../NodeDialogEventType.ts"/>
///<reference path="../../../../../../events/EventBus.ts"/>
var RemoveNodeConfirmationDialogContent = (function () {
    function RemoveNodeConfirmationDialogContent(parent) {
        this.html = "";
        this.parent = parent;
        this.createChildren();
    }
    RemoveNodeConfirmationDialogContent.prototype.getHtml = function () {
        return this.html;
    };
    RemoveNodeConfirmationDialogContent.prototype.init = function () {
    };
    RemoveNodeConfirmationDialogContent.prototype.destroy = function () {
    };
    RemoveNodeConfirmationDialogContent.prototype.onConfirm = function () {
        EventBus.dispatchEvent(NodeDialogEventType.REMOVE, this.parent);
    };
    RemoveNodeConfirmationDialogContent.prototype.createChildren = function () {
        this.html += this.createParentText();
    };
    RemoveNodeConfirmationDialogContent.prototype.createParentText = function () {
        var text = this.parent.object.getText();
        return '<h3>Really want to remove:</h3><h4><div class="label removeNodeLabel" id="parentNodeTextContainer">' + text + '</div></h4><h4>and all its content ?</h4>';
    };
    return RemoveNodeConfirmationDialogContent;
}());
//# sourceMappingURL=RemoveNodeConfirmationDialogContent.js.map