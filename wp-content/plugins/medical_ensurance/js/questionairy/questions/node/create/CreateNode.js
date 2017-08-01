///<reference path="../../parsers/ObjectType.ts"/>
///<reference path="../../answer/variation/AnswerVariation.ts"/>
///<reference path="../../question/view/QuestionViewFactory.ts"/>
///<reference path="../../question/CreateQuestion.ts"/>
var CreateNode = (function () {
    function CreateNode() {
        this.questionCreator = new CreateQuestion();
    }
    CreateNode.prototype.execute = function (data, currentNode, questionViewType) {
        // TODO select root node if undefined selection
        if (data.type == ObjectType.QUESTION) {
            console.log("create answer variations");
            var answerVariation = new AnswerVariation(data.text);
            this.addAnswerVariation(currentNode.object, answerVariation);
            return answerVariation;
        }
        else {
            var question = this.createQuestion(data);
            question.setView(QuestionViewFactory.getView(questionViewType));
            var parent = currentNode.object;
            if (!parent) {
                alert("Error. Parent node not selected. Please select parent node before.");
                return;
            }
            var isText = false;
            var isQuestion = parent.type == ObjectType.QUESTION;
            if (isQuestion) {
                isText = parent.getAnswer().getType() == ObjectType.TEXT_INPUT_ANSWER || parent.getAnswer().getType() == ObjectType.TEXT_VIEW_ANSWER;
            }
            if (isQuestion && isText) {
                this.addQuestion(parent.getAnswer(), question);
            }
            else {
                this.addQuestion(parent, question);
            }
            return question;
        }
    };
    CreateNode.prototype.addQuestion = function (parent, question) {
        parent.addQuestion(question);
    };
    CreateNode.prototype.addAnswerVariation = function (parentQuestion, variation) {
        parentQuestion.addAnswerVariation(variation);
    };
    CreateNode.prototype.createQuestion = function (data) {
        return this.questionCreator.create(data);
    };
    return CreateNode;
}());
//# sourceMappingURL=CreateNode.js.map