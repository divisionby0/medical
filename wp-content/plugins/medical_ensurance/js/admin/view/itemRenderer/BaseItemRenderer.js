var BaseItemRenderer = (function () {
    function BaseItemRenderer(id, data) {
        this.id = id;
        this.data = data;
        if (this.data && this.id) {
            this.getHTML();
        }
        else {
        }
    }
    BaseItemRenderer.prototype.getHTML = function () {
        return 'empty';
    };
    BaseItemRenderer.prototype.clear = function () {
    };
    return BaseItemRenderer;
}());
//# sourceMappingURL=BaseItemRenderer.js.map