var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="Dialog.ts"/>
///<reference path="content/RemoveNodeConfirmationDialogContent.ts"/>
///<reference path="../NodeDialogEventType.ts"/>
///<reference path="../../../../../events/EventBus.ts"/>
var RemoveNodeConfirmationDialog = (function (_super) {
    __extends(RemoveNodeConfirmationDialog, _super);
    function RemoveNodeConfirmationDialog(parent) {
        _super.call(this, parent);
    }
    RemoveNodeConfirmationDialog.prototype.createContent = function () {
        var _this = this;
        this.content = new RemoveNodeConfirmationDialogContent(this.parent);
        EventBus.addEventListener(NodeDialogEventType.REMOVE, function () { return _this.onConfirm(); });
    };
    RemoveNodeConfirmationDialog.prototype.onConfirm = function () {
        var _this = this;
        EventBus.removeEventListener(NodeDialogEventType.REMOVE, function () { return _this.onConfirm(); });
        this.close();
    };
    RemoveNodeConfirmationDialog.prototype.createHeaderText = function () {
        return '<h4 class="removeConfirmationDialogHeader">Remove confirmation</h4>';
    };
    RemoveNodeConfirmationDialog.prototype.confirmBtnClickHandler = function () {
        this.content.onConfirm();
    };
    // TODO refactor to move into parent class
    RemoveNodeConfirmationDialog.prototype.createFooter = function () {
        var footerHtml = '<div class="modal-footer">';
        footerHtml += '<span id="confirmButton" class="btn btn-success">Remove</span>';
        footerHtml += '<span class="btn btn-primary" data-dismiss="modal">Cancel</span>';
        footerHtml += '</div>'; // content
        footerHtml += '</div>'; // dialog
        footerHtml += '</div>'; // footer
        footerHtml += '</div>'; // modalWindow
        return footerHtml;
    };
    return RemoveNodeConfirmationDialog;
}(Dialog));
//# sourceMappingURL=RemoveNodeConfirmationDialog.js.map