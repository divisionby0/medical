var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="Dialog.ts"/>
///<reference path="content/AnswerCreationDialogContent.ts"/>
///<reference path="../NodeDialogEventType.ts"/>
///<reference path="../../../../../events/EventBus.ts"/>
var CreateAnswerDialog = (function (_super) {
    __extends(CreateAnswerDialog, _super);
    function CreateAnswerDialog(parent) {
        _super.call(this, parent);
    }
    CreateAnswerDialog.prototype.createContent = function () {
        var _this = this;
        this.content = new AnswerCreationDialogContent(this.parent);
        this.content.init();
        EventBus.addEventListener(NodeDialogEventType.CREATE, function () { return _this.onConfirm(); });
    };
    CreateAnswerDialog.prototype.onConfirm = function () {
        var _this = this;
        EventBus.removeEventListener(NodeDialogEventType.CREATE, function () { return _this.onConfirm(); });
        this.close();
    };
    CreateAnswerDialog.prototype.createHeaderText = function () {
        return '<h4>Answer creation</h4>';
    };
    CreateAnswerDialog.prototype.confirmBtnClickHandler = function () {
        this.content.onConfirm();
    };
    // TODO refactor to move into parent class
    CreateAnswerDialog.prototype.createFooter = function () {
        var footerHtml = '<div class="modal-footer">';
        footerHtml += '<span id="confirmButton" class="btn btn-success">Create</span>';
        footerHtml += '<span class="btn btn-primary" data-dismiss="modal">Cancel</span>';
        footerHtml += '</div>'; // content
        footerHtml += '</div>'; // dialog
        footerHtml += '</div>'; // footer
        footerHtml += '</div>'; // modalWindow
        return footerHtml;
    };
    return CreateAnswerDialog;
}(Dialog));
//# sourceMappingURL=CreateAnswerDialog.js.map