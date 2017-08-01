var Card = (function () {
    function Card(cardNumber, holderName, expDate, type) {
        if (cardNumber === void 0) { cardNumber = ""; }
        if (holderName === void 0) { holderName = ""; }
        if (expDate === void 0) { expDate = ""; }
        if (type === void 0) { type = ""; }
        this.cardNumber = cardNumber;
        this.holderName = holderName;
        this.expDate = expDate;
        this.type = type;
    }
    Card.prototype.getNumber = function () {
        return this.cardNumber;
    };
    Card.prototype.setNumber = function (number) {
        this.cardNumber = number;
    };
    Card.prototype.getHolderName = function () {
        return this.holderName;
    };
    Card.prototype.setHolderName = function (name) {
        this.holderName = name;
    };
    Card.prototype.getExpDate = function () {
        return this.expDate;
    };
    Card.prototype.setExpDate = function (date) {
        this.expDate = date;
    };
    Card.prototype.getType = function () {
        return this.type;
    };
    Card.prototype.setType = function (type) {
        this.type = type;
    };
    return Card;
}());
//# sourceMappingURL=Card.js.map