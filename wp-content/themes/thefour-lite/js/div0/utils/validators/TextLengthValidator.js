var TextLengthValidator = (function () {
    function TextLengthValidator(text) {
        this.text = text;
    }
    TextLengthValidator.prototype.validate = function (minCharacters) {
        return this.text.length > minCharacters - 1;
    };
    return TextLengthValidator;
}());
//# sourceMappingURL=TextLengthValidator.js.map