var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../view/IDataRenderer.ts"/>
///<reference path="../../../questions/answer/Answer.ts"/>
///<reference path="../view/NodeTreeRenderer.ts"/>
///<reference path="../../../questions/question/Question.ts"/>
///<reference path="../../../../libs/jqueryTS/jquery.d.ts"/>
var AnswerRenderer = (function (_super) {
    __extends(AnswerRenderer, _super);
    function AnswerRenderer(data, container) {
        _super.call(this, data, container);
    }
    AnswerRenderer.prototype.createChildren = function () {
        this.answer = this.data.getAnswer();
        this.value = this.answer.getValue();
        this.createChildrenContainer();
        this.createText();
        this.updateText();
    };
    AnswerRenderer.prototype.createText = function () {
        this.textLabel = this.$j('<div id="treeNodeText" style="display: block; float: left; width: 100%;">');
        this.childrenContainer.append(this.textLabel);
    };
    AnswerRenderer.prototype.updateText = function () {
        var resultHtml = this.data.getText();
        this.textLabel.html(resultHtml);
    };
    AnswerRenderer.prototype.createChildrenContainer = function () {
        this.childrenContainer = this.$j('<div id="childrenContainer" class="container"></div>');
        //this.childrenContainer = this.$j('<div id="childrenContainer" style="width: 1170px;max-width: 91.40625%;margin: 0 auto;z-index: -1000;">');
        this.container.append(this.childrenContainer);
    };
    return AnswerRenderer;
}(NodeTreeRenderer));
//# sourceMappingURL=AnswerRenderer.js.map