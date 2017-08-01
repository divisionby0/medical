///<reference path="../IHtmlElement.ts"/>
///<reference path="../../../../../libs/bootstrap/typescriptDef/index.d.ts"/>
///<reference path="../../../../../libs/jqueryTS/jquery.d.ts"/>
var Dialog = (function () {
    function Dialog(parent) {
        this.header = "Dialog header";
        this.$j = jQuery.noConflict();
        this.parent = parent;
        this.createContent();
        this.createHtml();
        this.createBtnListener();
        this.createCloseListener();
    }
    Dialog.prototype.onConfirm = function () {
    };
    Dialog.prototype.createBtnListener = function () {
        var _this = this;
        this.$j("#confirmButton").click(function () { return _this.confirmBtnClickHandler(); });
    };
    Dialog.prototype.removeBtnListener = function () {
        this.$j("#confirmButton").unbind('click');
    };
    Dialog.prototype.confirmBtnClickHandler = function () {
    };
    Dialog.prototype.createCloseListener = function () {
        var _this = this;
        this.$j('#dynamicModal').on('hidden.bs.modal', function () { return _this.close(); });
    };
    Dialog.prototype.removeCloseListener = function () {
        var _this = this;
        this.$j('#dynamicModal').off('hidden.bs.modal', function () { return _this.close(); });
    };
    Dialog.prototype.close = function () {
        this.removeBtnListener();
        this.removeCloseListener();
        if (this.content) {
            this.content.destroy();
        }
        this.$j('.modal.in').modal('hide');
        this.$j('body').removeClass('modal-open');
        this.$j('.modal-backdrop').remove();
        this.$j('#dynamicModal').remove();
    };
    Dialog.prototype.createContent = function () {
    };
    Dialog.prototype.createHtml = function () {
        this.html = '<div id="dynamicModal" class="modal" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
        var contentHtml = "";
        if (this.content) {
            contentHtml = this.content.getHtml();
        }
        this.html += '<div class="modal-dialog">';
        this.html += '<div class="modal-content">';
        this.html += '<div class="modal-header">';
        this.html += '<a class="close" data-dismiss="modal">×</a>';
        this.html += this.createHeaderText();
        this.html += '</div>';
        this.html += '<div class="modal-body">';
        this.html += contentHtml;
        this.html += this.createFooter();
        this.$j('body').append(this.html);
        this.$j("#dynamicModal").modal();
        this.$j("#dynamicModal").modal('show');
        if (this.content) {
            this.content.init();
        }
    };
    Dialog.prototype.createHeaderText = function () {
        return '<h4>' + this.header + '</h4>';
    };
    Dialog.prototype.createFooter = function () {
        var footerHtml = '<div class="modal-footer">';
        footerHtml += '<span class="btn btn-primary" data-dismiss="modal">Cancel</span>';
        footerHtml += '</div>'; // content
        footerHtml += '</div>'; // dialog
        footerHtml += '</div>'; // footer
        footerHtml += '</div>'; // modalWindow
        return footerHtml;
    };
    return Dialog;
}());
//# sourceMappingURL=Dialog.js.map