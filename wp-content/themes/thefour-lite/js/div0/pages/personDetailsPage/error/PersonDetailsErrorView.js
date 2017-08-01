var PersonDetailsErrorView = (function () {
    function PersonDetailsErrorView(container) {
        this.container = container;
    }
    PersonDetailsErrorView.prototype.showAnswerError = function () {
        this.container.text("Error. You must answer YES at least the first question !");
        this.container.removeClass("hidden");
    };
    PersonDetailsErrorView.prototype.showConfirmationError = function () {
        this.container.text("Error. You must confirm all data !");
        this.container.removeClass("hidden");
    };
    PersonDetailsErrorView.prototype.destroy = function () {
        this.container.addClass("hidden");
        this.container.text("");
    };
    return PersonDetailsErrorView;
}());
//# sourceMappingURL=PersonDetailsErrorView.js.map