///<reference path="../IHtmlElement.ts"/>
///<reference path="SelectEventType.ts"/>
///<reference path="../../../../../libs/jqueryTS/jquery.d.ts"/>
///<reference path="../../../../../events/EventBus.ts"/>
var Select = (function () {
    function Select(label, items) {
        this.html = '';
        this.label = '';
        this.btnId = "btn_" + Math.round(Math.random() * 10000);
        this.$j = jQuery.noConflict();
        this.elementId = 'select_' + Math.round(Math.random() * 10000);
        this.label = label;
        this.items = items;
        this.createElement();
    }
    Select.prototype.getHtml = function () {
        return this.html;
    };
    Select.prototype.init = function () {
        this.createListener();
    };
    Select.prototype.destroy = function () {
        this.removeListener();
    };
    Select.prototype.createElement = function () {
        var dropdownPrefix = '<div class="dropdown" id="typeSelect">';
        var buttonPrefix = '<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" id="' + this.btnId + '">' + this.label;
        var span = '<span class="caret"></span>';
        var buttonPostfix = '</button>';
        var dropdownPostfix = '</div>';
        var typesContainerPrefix = '<ul class="dropdown-menu" id="' + this.elementId + '">';
        var typesContainerPostfix = '</ul>';
        this.html += dropdownPrefix;
        this.html += buttonPrefix;
        this.html += span;
        this.html += buttonPostfix;
        this.html += typesContainerPrefix;
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            var itemId = item.id;
            var itemText = item.text;
            var elementHtml = '<li id="' + itemId + '"><a class="mouseClickableElement">' + itemText + '</a></li>';
            this.html += elementHtml;
        }
        this.html += typesContainerPostfix;
        this.html += dropdownPostfix;
        this.element = this.$j(this.html);
    };
    Select.prototype.onSelect = function (item) {
        this.selectedItem = item;
        this.$j("#" + this.btnId).text(this.selectedItem.text);
        EventBus.dispatchEvent(SelectEventType.SELECTED_ITEM_CHANGED, this.selectedItem);
    };
    Select.prototype.createListener = function () {
        var context = this;
        var jQueryImpl = this.$j;
        jQueryImpl("#" + this.elementId + " li").on("click", function () {
            var selectedItem = { id: jQueryImpl(this).attr('id'), text: jQueryImpl(this).text() };
            context.onSelect(selectedItem);
        });
    };
    Select.prototype.removeListener = function () {
        this.$j(".dropdown-menu li").off("click");
    };
    return Select;
}());
//# sourceMappingURL=Select.js.map