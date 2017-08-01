///<reference path="Dialog.ts"/>
///<reference path="content/WYSIWYGDialogContent.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WYSIWYGTestDialog = (function (_super) {
    __extends(WYSIWYGTestDialog, _super);
    function WYSIWYGTestDialog() {
        _super.apply(this, arguments);
    }
    WYSIWYGTestDialog.prototype.createContent = function () {
        this.content = new WYSIWYGDialogContent(this.parent);
        this.content.init();
    };
    WYSIWYGTestDialog.prototype.onConfirm = function () {
        this.close();
    };
    WYSIWYGTestDialog.prototype.confirmBtnClickHandler = function () {
        this.content.onConfirm();
    };
    // TODO refactor to move into parent class
    WYSIWYGTestDialog.prototype.createFooter = function () {
        var footerHtml = '<div class="modal-footer">';
        footerHtml += '<span id="confirmButton" class="btn btn-success">Save</span>';
        footerHtml += '<span class="btn btn-primary" data-dismiss="modal">Cancel</span>';
        footerHtml += '</div>'; // content
        footerHtml += '</div>'; // dialog
        footerHtml += '</div>'; // footer
        footerHtml += '</div>'; // modalWindow
        return footerHtml;
    };
    return WYSIWYGTestDialog;
}(Dialog));
//# sourceMappingURL=WYSIWYGTestDialog.js.map