///<reference path="../../../../../../libs/jqueryTS/jquery.d.ts"/>
var PlaceholderInputElement = (function () {
    function PlaceholderInputElement(container) {
        this.$j = jQuery.noConflict();
        this.container = container;
        this.placeholderElement = this.$j('<label>placeholder text  <input type="text" placeholder="placeholder text here" id="placeholderInput"></label>');
        this.container.append(this.placeholderElement);
    }
    PlaceholderInputElement.prototype.getText = function () {
        return this.$j('#placeholderInput').val();
    };
    PlaceholderInputElement.prototype.setText = function (text) {
        this.$j('#placeholderInput').val(text);
    };
    PlaceholderInputElement.prototype.destroy = function () {
        this.container.empty();
    };
    return PlaceholderInputElement;
}());
//# sourceMappingURL=PlaceholderInputElement.js.map