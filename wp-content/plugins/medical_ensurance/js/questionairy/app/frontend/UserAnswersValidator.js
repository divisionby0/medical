///<reference path="question/QuestionRenderer.ts"/>
///<reference path="question/IUserAnswer.ts"/>
var UserAnswersValidator = (function () {
    function UserAnswersValidator(collection) {
        this.collection = collection;
    }
    UserAnswersValidator.prototype.validate = function () {
        var isValid = true;
        for (var i = 0; i < this.collection.length; i++) {
            var userAnswer = this.collection[i];
        }
    };
    return UserAnswersValidator;
}());
//# sourceMappingURL=UserAnswersValidator.js.map