var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="BaseTable.ts"/>
/// <reference path="../view/itemRenderer/TextInputItemRenderer.ts"/>
var Table = (function (_super) {
    __extends(Table, _super);
    function Table(id, data, rowStartIndex, rowMaxLength) {
        _super.call(this, id, data, rowStartIndex, rowMaxLength);
    }
    Table.prototype.createContentFromData = function () {
        var dataIterator = this.data.getIterator();
        while (dataIterator.hasNext()) {
            var row = dataIterator.next();
            this.createRow(row);
        }
    };
    Table.prototype.createRow = function (row) {
        this.htmlContent = this.htmlContent + '<tr id="' + row.getId() + '">';
        _super.prototype.addLegendRow.call(this, row);
        var collectionKeys = row.getKeys();
        for (var i = 0; i < collectionKeys.length; i++) {
            var key = collectionKeys[i];
            var value = row.get(key);
            var itemRenderer = new TextInputItemRenderer('id', value, row.getId(), key);
            var rendererHtml = itemRenderer.getHTML();
            this.htmlContent = this.htmlContent + rendererHtml;
        }
        this.htmlContent = this.htmlContent + '</tr>';
    };
    Table.prototype.createLegendRow = function () {
        this.htmlContent = this.htmlContent + '<tr id="legendRow">';
        this.htmlContent = this.htmlContent + '<th>Aggregate Policy Limit</th>';
        for (var i = this.rowStartIndex; i < this.rowMaxLength; i++) {
            this.htmlContent = this.htmlContent + '<th>' + i + ' y.o.</th>';
        }
        this.htmlContent = this.htmlContent + '</tr>';
    };
    return Table;
}(BaseTable));
//# sourceMappingURL=Table.js.map