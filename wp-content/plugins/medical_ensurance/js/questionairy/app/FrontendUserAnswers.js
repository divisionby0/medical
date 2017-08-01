var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="FrontendUserQuestions.ts"/>
///<reference path="frontend/RendererType.ts"/>
///<reference path="../questions/parsers/QuestionCollectionParser.ts"/>
///<reference path="frontend/UserAnswersRendererFactory.ts"/>
///<reference path="BaseApplication.ts"/>
var FrontendUserAnswers = (function (_super) {
    __extends(FrontendUserAnswers, _super);
    function FrontendUserAnswers(dataString, containerId) {
        _super.call(this, dataString, containerId);
    }
    FrontendUserAnswers.prototype.init = function () {
        this.container = this.$j("#" + this.containerId);
        this.onDataLoaded(this.dataString);
    };
    FrontendUserAnswers.prototype.onDataLoaded = function (data) {
        _super.prototype.onDataLoaded.call(this, data);
        this.setAnswerRendererFactory();
        this.questions = QuestionCollectionParser.parse(this.map, '');
        var formatCollection = new FormatCollection(this.questions);
        var items = formatCollection.format();
        new SortChildren(items);
        for (var i = 0; i < items.length; i++) {
            var question = items[i];
            this.createRenderer(question, this.container);
        }
    };
    FrontendUserAnswers.prototype.setAnswerRendererFactory = function () {
        RendererFactoryClass.setClass(UserAnswersRendererFactory);
    };
    FrontendUserAnswers.prototype.createRenderer = function (question, container) {
        RendererFactoryClass.getClass().create(question.getType(), question, container);
    };
    return FrontendUserAnswers;
}(BaseApplication));
//# sourceMappingURL=FrontendUserAnswers.js.map