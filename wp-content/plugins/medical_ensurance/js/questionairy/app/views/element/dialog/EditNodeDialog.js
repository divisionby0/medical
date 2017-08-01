var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="Dialog.ts"/>
///<reference path="content/EditNodeDialogContent.ts"/>
var EditNodeDialog = (function (_super) {
    __extends(EditNodeDialog, _super);
    function EditNodeDialog(parent) {
        _super.call(this, parent);
    }
    EditNodeDialog.prototype.createContent = function () {
        var _this = this;
        this.content = new EditNodeDialogContent(this.parent);
        //this.content.init();
        EventBus.addEventListener(NodeDialogEventType.UPDATE, function () { return _this.onConfirm(); });
    };
    EditNodeDialog.prototype.onConfirm = function () {
        var _this = this;
        EventBus.removeEventListener(NodeDialogEventType.UPDATE, function () { return _this.onConfirm(); });
        this.close();
    };
    EditNodeDialog.prototype.confirmBtnClickHandler = function () {
        this.content.onConfirm();
    };
    EditNodeDialog.prototype.createHeaderText = function () {
        return '<h4>Node edit</h4>';
    };
    // TODO refactor to move into parent class
    EditNodeDialog.prototype.createFooter = function () {
        var footerHtml = '<div class="modal-footer">';
        footerHtml += '<span id="confirmButton" class="btn btn-success">Save</span>';
        footerHtml += '<span class="btn btn-primary" data-dismiss="modal">Cancel</span>';
        footerHtml += '</div>'; // content
        footerHtml += '</div>'; // dialog
        footerHtml += '</div>'; // footer
        footerHtml += '</div>'; // modalWindow
        return footerHtml;
    };
    return EditNodeDialog;
}(Dialog));
//# sourceMappingURL=EditNodeDialog.js.map