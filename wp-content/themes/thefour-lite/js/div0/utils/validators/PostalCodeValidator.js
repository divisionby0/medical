var PostalCodeValidator = (function () {
    function PostalCodeValidator() {
    }
    PostalCodeValidator.validate = function (postal) {
        var regex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
        if (regex.test(postal)) {
            return true;
        }
        else {
            return false;
        }
    };
    return PostalCodeValidator;
}());
//# sourceMappingURL=PostalCodeValidator.js.map