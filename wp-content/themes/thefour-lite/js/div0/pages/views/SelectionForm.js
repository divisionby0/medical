///<reference path="../../../libs/jqueryTS/jquery.d.ts"/>
var SelectionForm = (function () {
    function SelectionForm(selectedItem, inputElementId, formId, tableId) {
        this.selectedItem = 1;
        this.$j = jQuery.noConflict();
        this.inputElementId = inputElementId;
        this.inputElement = this.getInputElement();
        this.formId = formId;
        this.form = this.getFormElement();
        this.tableId = tableId;
        this.table = this.getTableElement();
        this.addListener();
        console.log("selectedItem=", selectedItem);
        if (selectedItem) {
            this.selectedItem = selectedItem;
            this.updateSelectedIndexByValue(this.selectedItem);
            this.selectedIndex += 1;
        }
        this.selectItem(this.selectedIndex);
        this.updateInput();
    }
    SelectionForm.prototype.submit = function () {
        this.$j("#" + this.formId).submit();
    };
    SelectionForm.prototype.getSelection = function () {
        return this.selectedItem;
    };
    SelectionForm.prototype.getInputElement = function () {
        return this.$j("#" + this.inputElementId);
    };
    SelectionForm.prototype.getFormElement = function () {
        return this.$j("#" + this.formId);
    };
    SelectionForm.prototype.getTableElement = function () {
        return this.$j("#" + this.tableId);
    };
    SelectionForm.prototype.updateInput = function () {
        this.inputElement.val(this.selectedItem);
    };
    SelectionForm.prototype.selectItem = function (index) {
        var row = this.$j("#" + this.tableId + " > tbody  > tr").eq(index);
        this.selectedItem = row.attr('id');
        row.addClass('itemSelected');
        this.selectedRow = row;
    };
    SelectionForm.prototype.updateSelectedIndexByValue = function (givenValue) {
        var _this = this;
        this.selectedIndex = -1;
        this.$j('#' + this.tableId + ' > tbody  > tr').not(':first').each(function (index, value) { return _this.findIndex(index, value, givenValue); });
    };
    SelectionForm.prototype.findIndex = function (index, value, givenIndex) {
        var element = this.$j(value);
        var elementId = element.attr("id");
        if (parseInt(elementId) == parseInt(givenIndex)) {
            this.selectedIndex = index;
        }
    };
    SelectionForm.prototype.tableRowIterator = function (index, value) {
        this.addListeners(value);
    };
    SelectionForm.prototype.addListeners = function (value) {
        var _this = this;
        this.$j(value).hover(function (event) { return _this.onRowHoverIn(event); }, function (event) { return _this.onRowHoverOut(event); });
        this.$j(value).click(function (event) { return _this.onClick(event); });
    };
    SelectionForm.prototype.onClick = function (event) {
        var element = this.$j(event.target).parent();
        var itemId = element.attr('id');
        this.selectedItem = itemId;
        this.updateInput();
        try {
            this.selectedRow.removeClass('itemSelected');
        }
        catch (error) {
        }
        this.selectedRow = element;
        this.submitForm();
        element.addClass('itemSelected');
    };
    SelectionForm.prototype.onRowHoverIn = function (event) {
        this.$j(event.target).parent().addClass('itemHovered');
    };
    SelectionForm.prototype.onRowHoverOut = function (event) {
        this.$j(event.target).parent().removeClass('itemHovered');
    };
    SelectionForm.prototype.addListener = function () {
        var _this = this;
        this.$j('#' + this.tableId + ' > tbody  > tr').not(':first').each(function (index, value) { return _this.tableRowIterator(index, value); });
    };
    SelectionForm.prototype.submitForm = function () {
    };
    return SelectionForm;
}());
//# sourceMappingURL=SelectionForm.js.map