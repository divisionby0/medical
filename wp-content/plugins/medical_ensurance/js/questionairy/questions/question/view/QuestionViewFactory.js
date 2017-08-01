///<reference path="IQuestionView.ts"/>
///<reference path="QuestionAdminView.ts"/>
var QuestionViewFactory = (function () {
    function QuestionViewFactory() {
    }
    QuestionViewFactory.getView = function (type) {
        if (type == QuestionViewFactory.QUESTION_ADMIN_VIEW) {
            return new QuestionAdminView();
        }
    };
    QuestionViewFactory.QUESTION_ADMIN_VIEW = "QUESTION_ADMIN_VIEW";
    return QuestionViewFactory;
}());
//# sourceMappingURL=QuestionViewFactory.js.map