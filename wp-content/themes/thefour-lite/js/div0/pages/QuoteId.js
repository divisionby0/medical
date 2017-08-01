///<reference path="../../../../../plugins/medical_ensurance/js/utils/Cookie.ts"/>
var QuoteId = (function () {
    function QuoteId(value) {
        this.$j = jQuery.noConflict();
        //this.cookieValue = Cookie.getQuoteId();
        this.cookieValue = value;
        this.decorateQuoteIdWithCurrentDate();
    }
    QuoteId.prototype.decorateQuoteIdWithCurrentDate = function () {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var day = now.getDate();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        this.id = DateUtils.getCurrentDate() + "__" + hours + "-" + minutes + "-" + seconds;
    };
    QuoteId.prototype.getTempValue = function () {
        return this.cookieValue;
    };
    QuoteId.prototype.getId = function () {
        return this.id;
    };
    return QuoteId;
}());
//# sourceMappingURL=QuoteId.js.map