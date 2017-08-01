///<reference path="IDataRenderer.ts"/>
///<reference path="../../../questions/answer/Answer.ts"/>
///<reference path="../../../../libs/jqueryTS/jquery.d.ts"/>
var NodeTreeRenderer = (function () {
    function NodeTreeRenderer(data, container) {
        this.children = new Array();
        this.enabled = true;
        // background color
        this.depth = 0;
        this.backgroundColorAlpha = 0.3;
        this.backgroundColorRGB = new Array(50, 205, 50);
        this.$j = jQuery.noConflict();
        if (data && container) {
            this.data = data;
            this.container = container;
            this.createChildren();
        }
    }
    NodeTreeRenderer.prototype.setDepth = function (depth) {
        this.depth = depth;
    };
    NodeTreeRenderer.prototype.setEnabled = function (enabled) {
        this.enabled = enabled;
        this.onEnabledChanged();
    };
    NodeTreeRenderer.prototype.setContainer = function (container) {
        this.container = container;
    };
    NodeTreeRenderer.prototype.setData = function (data) {
        this.data = data;
    };
    NodeTreeRenderer.prototype.getData = function () {
        return this.data;
    };
    NodeTreeRenderer.prototype.clear = function () {
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            child.clear();
        }
    };
    NodeTreeRenderer.prototype.onEnabledChanged = function () {
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            child.setEnabled(this.enabled);
        }
        if (!this.textLabel) {
            return;
        }
        else {
            if (this.enabled) {
                this.textLabel.prop('disabled', false);
            }
            else {
                this.textLabel.prop('disabled', true);
            }
        }
    };
    NodeTreeRenderer.prototype.createChildren = function () {
        this.createChildrenContainer();
        this.createControl(this.childrenContainer);
        this.createText();
        this.updateText();
        this.drawBackground();
    };
    NodeTreeRenderer.prototype.updateText = function () {
        var text = this.data.getText();
        if (text) {
            this.textLabel.html(text);
        }
    };
    NodeTreeRenderer.prototype.createText = function () {
        this.textLabel = this.$j('<div id="treeNodeText"></div>');
        this.childrenContainer.append(this.textLabel);
    };
    NodeTreeRenderer.prototype.createChildrenContainer = function () {
        this.childrenContainer = this.$j('<div id="childrenContainer" class="container subQuestionChildrenContainer"></div>');
        this.container.append(this.childrenContainer);
    };
    NodeTreeRenderer.prototype.getControl = function () {
        return null;
    };
    NodeTreeRenderer.prototype.createControl = function (container) {
        this.control = this.getControl();
        container.append(this.control);
    };
    NodeTreeRenderer.prototype.drawBackground = function () {
        var backgroundColor = "rgba(" + this.backgroundColorRGB[0] + "," + this.backgroundColorRGB[1] + "," + this.backgroundColorRGB[2] + "," + this.backgroundColorAlpha + ")";
        this.childrenContainer.css({ 'background-color': backgroundColor });
    };
    return NodeTreeRenderer;
}());
//# sourceMappingURL=NodeTreeRenderer.js.map