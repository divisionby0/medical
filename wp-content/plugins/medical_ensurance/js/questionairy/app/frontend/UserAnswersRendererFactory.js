///<reference path="../../questions/parsers/ObjectType.ts"/>
///<reference path="answer/BooleanAnswerRenderer.ts"/>
///<reference path="answer/TextInputAnswerRenderer.ts"/>
///<reference path="answer/MultipleSelectionAnswerRenderer.ts"/>
///<reference path="answer/SingleSelectionAnswerRenderer.ts"/>
///<reference path="answer/TextViewAnswerRenderer.ts"/>
///<reference path="answer/DateAnswerRenderer.ts"/>
var UserAnswersRendererFactory = (function () {
    function UserAnswersRendererFactory() {
    }
    UserAnswersRendererFactory.create = function (type, data, container) {
        if (type == ObjectType.BOOLEAN_ANSWER) {
            return new BooleanAnswerRenderer(data, container);
        }
        else if (type == ObjectType.TEXT_INPUT_ANSWER) {
            return new TextInputAnswerRenderer(data, container);
        }
        else if (type == ObjectType.MULTIPLE_SELECTION_ANSWER) {
            return new MultipleSelectionAnswerRenderer(data, container);
        }
        else if (type == ObjectType.SINGLE_SELECTION_ANSWER) {
            return new SingleSelectionAnswerRenderer(data, container);
        }
        else if (type == ObjectType.TEXT_VIEW_ANSWER) {
            return new TextViewAnswerRenderer(data, container);
        }
        else if (type == ObjectType.DATE_SELECTION_ANSWER) {
            return new DateAnswerRenderer(data, container);
        }
    };
    return UserAnswersRendererFactory;
}());
//# sourceMappingURL=UserAnswersRendererFactory.js.map