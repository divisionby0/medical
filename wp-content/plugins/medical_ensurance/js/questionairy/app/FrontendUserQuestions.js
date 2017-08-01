var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../questions/collection/QuestionsCollection.ts"/>
///<reference path="BaseApplication.ts"/>
///<reference path="frontend/question/QuestionRenderer.ts"/>
///<reference path="frontend/answer/AnswerRenderer.ts"/>
///<reference path="frontend/UserQuestionsRendererFactory.ts"/>
///<reference path="../questions/answer/variation/AnswerVariation.ts"/>
///<reference path="../questions/collection/CollectionEventType.ts"/>
///<reference path="saver/SaveFile.ts"/>
///<reference path="frontend/RendererType.ts"/>
///<reference path="frontend/RendererFactoryClass.ts"/>
///<reference path="../questions/sort/SortChildren.ts"/>
///<reference path="frontend/collection/FormatCollection.ts"/>
///<reference path="frontend/question/IUserAnswer.ts"/>
var FrontendUserQuestions = (function (_super) {
    __extends(FrontendUserQuestions, _super);
    function FrontendUserQuestions(dataString, containerId) {
        _super.call(this, dataString, containerId);
    }
    FrontendUserQuestions.prototype.getData = function () {
        return this.questions;
    };
    FrontendUserQuestions.prototype.init = function () {
        this.renderers = new Array();
        this.container = this.$j("#" + this.containerId);
        this.onDataLoaded(this.dataString);
    };
    FrontendUserQuestions.prototype.onDataLoaded = function (data) {
        var _this = this;
        _super.prototype.onDataLoaded.call(this, data);
        RendererFactoryClass.setClass(UserQuestionsRendererFactory);
        this.questions = QuestionCollectionParser.parse(this.map, '');
        var formatCollection = new FormatCollection(this.questions);
        var items = formatCollection.format();
        new SortChildren(items);
        for (var i = 0; i < items.length; i++) {
            var question = items[i];
            var renderer = this.createRenderer(question, this.container);
            this.renderers.push(renderer);
            var rendererHasUserValue = renderer.hasUserValue();
        }
        //console.log("Frontend questions: ",this.questions.getEncoder().encode());
        EventBus.addEventListener("ANSWER_VALUE_CHANGED", function (data) { return _this.onAnswerValueChanged(data); });
    };
    FrontendUserQuestions.prototype.onAnswerValueChanged = function (data) {
        //console.log("onAnswerValueChanged",data);
        //console.log("ANSWERS:", this.questions.getEncoder().encode());
    };
    FrontendUserQuestions.prototype.createRenderer = function (question, container) {
        return RendererFactoryClass.getClass().create(question.getType(), question, container);
    };
    return FrontendUserQuestions;
}(BaseApplication));
//# sourceMappingURL=FrontendUserQuestions.js.map