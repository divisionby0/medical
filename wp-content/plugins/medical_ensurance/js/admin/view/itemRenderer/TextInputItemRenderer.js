/// <reference path="BaseItemRenderer.ts"/>
/// <reference path="../../../libs/jqueryTS/jquery.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextInputItemRenderer = (function (_super) {
    __extends(TextInputItemRenderer, _super);
    function TextInputItemRenderer(id, data, rowId, columnKey) {
        _super.call(this, id, data);
        this.rowId = rowId;
        this.columnKey = columnKey;
        this.inputId = this.rowId + "_" + this.columnKey;
        this.createInput();
    }
    TextInputItemRenderer.prototype.setState = function (state) {
        if (state == 'normal') {
            this.textInput.removeClass('negativeValue');
        }
        else if ('negative') {
            this.textInput.addClass('negativeValue');
        }
    };
    TextInputItemRenderer.prototype.createInput = function () {
        var convertedValue = this.data;
        if (this.data != -1 && this.data != '-1') {
            convertedValue = parseInt(this.data) / 1000;
        }
        var isNegative = convertedValue < 0;
        this.textInput = jQuery('<input class="tableCeilItemRenderer" type="text" id="' + this.inputId + '" value="' + convertedValue + '" data-rowid="' + this.rowId + '" data-columnkey="' + this.columnKey + '">');
        if (isNegative) {
            this.textInput.addClass('negativeValue');
        }
    };
    TextInputItemRenderer.prototype.getHTML = function () {
        if (this.textInput) {
            return '<td>' + this.textInput.prop('outerHTML') + '</td>';
        }
        else {
            return;
        }
    };
    return TextInputItemRenderer;
}(BaseItemRenderer));
//# sourceMappingURL=TextInputItemRenderer.js.map