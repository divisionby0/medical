var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../NodeDialogEventType.ts"/>
///<reference path="content/QuestionCreateDialogContent.ts"/>
///<reference path="Dialog.ts"/>
///<reference path="../../../../../events/EventBus.ts"/>
var CreateQuestionDialog = (function (_super) {
    __extends(CreateQuestionDialog, _super);
    function CreateQuestionDialog(parent) {
        _super.call(this, parent);
    }
    CreateQuestionDialog.prototype.createContent = function () {
        var _this = this;
        this.content = new QuestionCreateDialogContent(this.parent);
        EventBus.addEventListener(NodeDialogEventType.CREATE, function () { return _this.onConfirm(); });
    };
    CreateQuestionDialog.prototype.onConfirm = function () {
        var _this = this;
        EventBus.removeEventListener(NodeDialogEventType.CREATE, function () { return _this.onConfirm(); });
        this.close();
    };
    CreateQuestionDialog.prototype.createHeaderText = function () {
        return '<h4>Question creation</h4>';
    };
    CreateQuestionDialog.prototype.confirmBtnClickHandler = function () {
        this.content.onConfirm();
    };
    // TODO refactor to move into parent class
    CreateQuestionDialog.prototype.createFooter = function () {
        var footerHtml = '<div class="modal-footer">';
        footerHtml += '<span id="confirmButton" class="btn btn-success">Create</span>';
        footerHtml += '<span class="btn btn-primary" data-dismiss="modal">Cancel</span>';
        footerHtml += '</div>'; // content
        footerHtml += '</div>'; // dialog
        footerHtml += '</div>'; // footer
        footerHtml += '</div>'; // modalWindow
        return footerHtml;
    };
    return CreateQuestionDialog;
}(Dialog));
//# sourceMappingURL=CreateQuestionDialog.js.map