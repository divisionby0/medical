///<reference path="../../../../questions/question/Question.ts"/>
///<reference path="../QuestionRenderer.ts"/>
///<reference path="../../UserQuestionsRendererFactory.ts"/>
///<reference path="../../RendererFactoryClass.ts"/>
///<reference path="../../../../questions/ICompositeNode.ts"/>
///<reference path="../../../../../collections/iterators/MapIterator.ts"/>
///<reference path="../../../../../libs/jqueryTS/jquery.d.ts"/>
var CreateBooleanQuestionChildren = (function () {
    function CreateBooleanQuestionChildren(dataIterator, container, isNegativeChildren) {
        this.$j = jQuery.noConflict();
        this.children = new Array();
        var totalChildren = dataIterator.size();
        var childrenContainer;
        if (totalChildren == 0) {
            return;
        }
        else {
            if (isNegativeChildren) {
                childrenContainer = this.$j('<div id="negativeChildren" style="border-width: 1px; border-color: red; margin-top: 2px;margin-bottom: 2px;">');
            }
            else {
                childrenContainer = this.$j('<div id="negativeChildren" style=" border-width: 1px; border-color: green; margin-top: 2px; margin-bottom: 2px;">');
            }
        }
        while (dataIterator.hasNext()) {
            var subQuestion = dataIterator.next();
            var questionContainer = this.$j('<div style="width: 100%; float: left; display: block;"></div>');
            childrenContainer.append(questionContainer);
            var negativeChildQuestionRenderer = RendererFactoryClass.getClass().create(subQuestion.getType(), subQuestion, questionContainer);
            this.children.push(negativeChildQuestionRenderer);
        }
        container.append(childrenContainer);
    }
    CreateBooleanQuestionChildren.prototype.getCollection = function () {
        return this.children;
    };
    return CreateBooleanQuestionChildren;
}());
//# sourceMappingURL=CreateBooleanQuestionChildren.js.map