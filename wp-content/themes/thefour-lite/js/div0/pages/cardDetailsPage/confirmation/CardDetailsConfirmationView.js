///<reference path="../Card.ts"/>
var CardDetailsConfirmationView = (function () {
    function CardDetailsConfirmationView(card) {
        this.$j = jQuery.noConflict();
        this.card = card;
        this.checkBox = this.$j("#confirmCheckBox");
        this.update();
        // uncheck check box
        this.uncheckCheckBox();
    }
    CardDetailsConfirmationView.prototype.update = function () {
        this.$j("#cardTypeConfirmation").text(this.card.getType());
        this.$j("#cardNumberConfirmation").text(this.card.getNumber());
        this.$j("#cardholderConfirmation").text(this.card.getHolderName());
        this.$j("#cardExpConfirmation").text(this.card.getExpDate());
    };
    CardDetailsConfirmationView.prototype.destroy = function () {
        this.$j("#cardTypeConfirmation").text("");
        this.$j("#cardNumberConfirmation").text("");
        this.$j("#cardholderConfirmation").text("");
        this.$j("#cardExpConfirmation").text("");
        this.uncheckCheckBox();
    };
    CardDetailsConfirmationView.prototype.isConfirmed = function () {
        return this.checkBox.is(':checked');
    };
    CardDetailsConfirmationView.prototype.uncheckCheckBox = function () {
        this.checkBox.prop("checked", false);
    };
    return CardDetailsConfirmationView;
}());
//# sourceMappingURL=CardDetailsConfirmationView.js.map