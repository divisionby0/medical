/// <reference path="../../collections/Map.ts"/>
var BaseTable = (function () {
    function BaseTable(id, data, rowStartIndex, rowMaxLength) {
        this.htmlContent = '';
        this.rowMaxLength = 100;
        this.rowStartIndex = 0;
        if (rowMaxLength) {
            this.rowMaxLength = rowMaxLength;
        }
        if (rowStartIndex) {
            this.rowStartIndex = rowStartIndex;
        }
        if (data && data.size() > 0) {
            this.data = data;
            this.createPrefixAndPostfix(id);
            this.createContent();
        }
    }
    BaseTable.prototype.createPrefixAndPostfix = function (id) {
        this.prefix = '<b><font color="red">Info: N/A values should set to -1</font></b><table id="' + id + '">';
        this.postfix = '</table>';
    };
    BaseTable.prototype.createContent = function () {
        this.createLegendRow();
        this.createContentFromData();
    };
    BaseTable.prototype.createContentFromData = function () {
    };
    BaseTable.prototype.createRow = function (row) {
    };
    BaseTable.prototype.addLegendRow = function (row) {
        this.htmlContent = this.htmlContent + '<td><b><font color="blue">$' + row.getId() + '</font></b></td>';
    };
    BaseTable.prototype.createLegendRow = function () {
    };
    BaseTable.prototype.getHTML = function () {
        return this.prefix + this.htmlContent + this.postfix;
    };
    return BaseTable;
}());
//# sourceMappingURL=BaseTable.js.map