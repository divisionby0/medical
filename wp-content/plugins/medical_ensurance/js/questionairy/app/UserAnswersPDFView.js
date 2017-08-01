var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="frontend/PDFAnswersRendererFactory.ts"/>
///<reference path="FrontendUserAnswers.ts"/>
///<reference path="frontend/RendererFactoryClass.ts"/>
var UserAnswersPDFView = (function (_super) {
    __extends(UserAnswersPDFView, _super);
    function UserAnswersPDFView(dataString, containerId) {
        _super.call(this, dataString, containerId);
    }
    UserAnswersPDFView.prototype.setAnswerRendererFactory = function () {
        console.log("UserAnswersPDFView  setAnswerRendererFactory()");
        RendererFactoryClass.setClass(PDFAnswersRendererFactory);
    };
    UserAnswersPDFView.prototype.createRenderer = function (question, container) {
        console.log("Answer renderer factory class: " + RendererFactoryClass.getClass());
        RendererFactoryClass.getClass().create(question.getType(), question, container);
    };
    return UserAnswersPDFView;
}(FrontendUserAnswers));
//# sourceMappingURL=UserAnswersPDFView.js.map