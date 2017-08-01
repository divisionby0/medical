///<reference path="../../IHtmlElement.ts"/>
///<reference path="../../NodeDialogEventType.ts"/>
///<reference path="../../../../../questions/parsers/ObjectType.ts"/>
///<reference path="../../../../../../libs/jqueryTS/jquery.d.ts"/>
var TextEditableDialogContent = (function () {
    function TextEditableDialogContent(parent) {
        this.isTextValid = false;
        this.html = '';
        this.children = new Array();
        this.$j = jQuery.noConflict();
        this.parent = parent;
        this.createChildren();
        this.removeTextErrorText();
    }
    TextEditableDialogContent.prototype.getHtml = function () {
        return this.html;
    };
    TextEditableDialogContent.prototype.init = function () {
        this.createTextInputListener();
    };
    TextEditableDialogContent.prototype.destroy = function () {
        this.$j("#dataTextInput").val('');
    };
    TextEditableDialogContent.prototype.createChildren = function () {
        this.html += this.createParentText();
        this.html += '<p>' + this.getTextInputLegendText() + '</p>';
        this.html += this.createTextInput();
        this.html += this.createTextInputErrorText();
        this.html += '</div>';
    };
    TextEditableDialogContent.prototype.onConfirm = function () {
        this.text = this.$j("#dataTextInput").val();
        this.onConfirmed();
    };
    TextEditableDialogContent.prototype.onConfirmed = function () {
        this.isTextValid = this.validateText();
    };
    TextEditableDialogContent.prototype.validateText = function () {
        if (this.text.length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    TextEditableDialogContent.prototype.getTextInputLegendText = function () {
        return "";
    };
    TextEditableDialogContent.prototype.createTextInput = function () {
        return '<input type="text" class="form-control" id="dataTextInput">';
    };
    TextEditableDialogContent.prototype.createTextInputErrorText = function () {
        return '<span class="label label-danger hidden" id="textInputErrorText">Incorrect. Must be at least 1 character.</span>';
    };
    TextEditableDialogContent.prototype.createParentText = function () {
        console.log("createParentText()", this.parent);
        return '<h4>Parent: <span class="label parentNodeContent" id="parentNodeTextContainer">' + this.parent + '</span></h4>';
    };
    TextEditableDialogContent.prototype.createTextInputListener = function () {
        var _this = this;
        this.$j("#dataTextInput").keydown(function () { return _this.onTextInputChangeHandler(); });
    };
    TextEditableDialogContent.prototype.removeTextInputListener = function () {
        this.$j("#dataTextInput").unbind('keydown');
    };
    TextEditableDialogContent.prototype.addTextErrorText = function () {
        this.$j("#textInputErrorText").removeClass("hidden");
    };
    TextEditableDialogContent.prototype.removeTextErrorText = function () {
        this.$j("#textInputErrorText").addClass("hidden");
    };
    TextEditableDialogContent.prototype.onTextInputChangeHandler = function () {
        this.removeTextErrorText();
    };
    return TextEditableDialogContent;
}());
//# sourceMappingURL=TextEditableDialogContent.js.map