///<reference path="../../questions/parsers/ObjectType.ts"/>
///<reference path="./answer/BooleanAnswerRenderer.ts"/>
///<reference path="./question/TextInputQuestionRenderer.ts"/>
///<reference path="question/boolean/BooleanQuestionRenderer.ts"/>
///<reference path="question/SingleSelectionQuestionRenderer.ts"/>
///<reference path="question/MultipleSelectionQuestionRenderer.ts"/>
///<reference path="question/TextViewQuestionRenderer.ts"/>
///<reference path="question/DateSelectQuestionRenderer.ts"/>
var UserQuestionsRendererFactory = (function () {
    function UserQuestionsRendererFactory() {
    }
    UserQuestionsRendererFactory.create = function (type, data, container) {
        if (type == ObjectType.BOOLEAN_ANSWER) {
            return new BooleanQuestionRenderer(data, container);
        }
        else if (type == ObjectType.TEXT_INPUT_ANSWER) {
            return new TextInputQuestionRenderer(data, container);
        }
        else if (type == ObjectType.TEXT_VIEW_ANSWER) {
            return new TextViewQuestionRenderer(data, container);
        }
        else if (type == ObjectType.SINGLE_SELECTION_ANSWER) {
            return new SingleSelectionQuestionRenderer(data, container);
        }
        else if (type == ObjectType.MULTIPLE_SELECTION_ANSWER) {
            return new MultipleSelectionQuestionRenderer(data, container);
        }
        else if (type == ObjectType.DATE_SELECTION_ANSWER) {
            return new DateSelectQuestionRenderer(data, container);
        }
        return null;
    };
    return UserQuestionsRendererFactory;
}());
//# sourceMappingURL=UserQuestionsRendererFactory.js.map