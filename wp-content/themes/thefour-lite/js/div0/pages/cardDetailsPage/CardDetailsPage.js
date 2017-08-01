///<reference path="../../utils/NavigatorUtil.ts"/>
///<reference path="confirmation/CardDetailsConfirmationView.ts"/>
var CardDetailsPage = (function () {
    function CardDetailsPage() {
        this.cardIdMinCharacters = 15;
        this.cardIdMaxCharacters = 16;
        this.prevPage = "person-details";
        this.NORMAL = "NORMAL";
        this.CONFIRMATION = "CONFIRMATION";
        this.CONFIRMED = "CONFIRMED";
        this.$j = jQuery.noConflict();
        this.card = new Card();
        this.card.setType("mastercard");
        this.currentState = this.NORMAL;
    }
    CardDetailsPage.prototype.create = function () {
        this.cardTypeSelect = this.$j("#cardTypeSelect");
        this.cardHolderInput = this.$j("#cardholderNameInput");
        this.cardExpirationDateInput = this.$j("#expirationDateInput");
        this.cardNumberInput = this.$j("#cardNumberInput");
        this.nextButton = this.$j("#nextButton");
        this.prevButton = this.$j("#prevButton");
        this.errorContainer = this.$j("#errorText");
        this.confirmationContainer = this.$j("#confirmationViewContainer");
        this.form = this.$j("#cardDetailsForm");
        if (this.cardExpirationDateInput.val() != "") {
            this.card.setExpDate(this.cardExpirationDateInput.val());
        }
        this.card.setType("mastercard");
        this.createCardTypeSelectListener();
        this.createCardNumberInputListener();
        this.createDateSelector();
        this.createButtonsListener();
    };
    CardDetailsPage.prototype.onStateChanged = function () {
        if (this.currentState == this.NORMAL) {
            this.hideConfirmation();
            this.showForm();
        }
        else if (this.currentState == this.CONFIRMATION) {
            this.hideForm();
            this.showConfirmation();
        }
        else {
            // next page
            this.navigateToNextPage();
        }
    };
    CardDetailsPage.prototype.showConfirmation = function () {
        this.$j("#confirmationViewContainer").removeClass("hidden");
        this.confirmationView = new CardDetailsConfirmationView(this.card);
    };
    CardDetailsPage.prototype.hideConfirmation = function () {
        this.$j("#confirmationViewContainer").addClass("hidden");
        if (this.confirmationView) {
            this.confirmationView.destroy();
            this.confirmationView = null;
        }
    };
    CardDetailsPage.prototype.onNextButtonClick = function () {
        this.hideError();
        var isValid;
        if (this.currentState == this.NORMAL) {
            this.cardHolderName = this.cardHolderInput.val();
            this.cardExpirationDate = this.cardExpirationDateInput.val();
            this.cardNumber = this.cardNumberInput.val();
            this.card.setNumber(this.cardNumber);
            this.card.setHolderName(this.cardHolderName);
            isValid = this.validate();
            if (isValid) {
                this.currentState = this.CONFIRMATION;
                this.onStateChanged();
            }
        }
        else if (this.currentState == this.CONFIRMATION) {
            isValid = this.validate();
            if (isValid) {
                this.currentState = this.CONFIRMED;
                this.onStateChanged();
            }
        }
    };
    CardDetailsPage.prototype.onPrevButtonClick = function () {
        if (this.currentState == this.CONFIRMATION) {
            this.currentState = this.NORMAL;
            this.onStateChanged();
        }
        else if (this.currentState == this.NORMAL) {
            this.navigateToPrevPage();
        }
    };
    CardDetailsPage.prototype.hideError = function () {
        this.errorContainer.text("");
        this.errorContainer.addClass("hidden");
    };
    CardDetailsPage.prototype.showError = function (text) {
        this.errorContainer.text(text);
        this.errorContainer.removeClass("hidden");
    };
    CardDetailsPage.prototype.navigateToNextPage = function () {
        this.form.submit();
    };
    CardDetailsPage.prototype.navigateToPrevPage = function () {
        NavigatorUtil.navigateTo(this.prevPage);
    };
    CardDetailsPage.prototype.onExpirationDateSelected = function (dateText) {
        this.cardExpirationDate = this.cardExpirationDateInput.val();
        this.card.setExpDate(this.cardExpirationDate);
    };
    CardDetailsPage.prototype.createButtonsListener = function () {
        var _this = this;
        this.nextButton.click(function () { return _this.onNextButtonClick(); });
        this.prevButton.click(function () { return _this.onPrevButtonClick(); });
    };
    CardDetailsPage.prototype.validate = function () {
        var isValid = true;
        if (this.currentState == this.NORMAL) {
            return this.validateInfo();
        }
        else if (this.currentState == this.CONFIRMATION) {
            return this.validateConfirmation();
        }
    };
    CardDetailsPage.prototype.validateInfo = function () {
        var isValid = true;
        if (this.cardHolderName.length < 3) {
            this.showError("Card holder name invalid");
            isValid = false;
        }
        var cardNumberMaxChars = parseInt(this.cardNumberInput.attr("maxlength"));
        if (cardNumberMaxChars != this.cardNumber.length) {
            this.showError("Card number invalid");
            isValid = false;
        }
        if (cardNumberMaxChars != this.cardNumber.length) {
            this.showError("Card number invalid");
            isValid = false;
        }
        if (this.cardExpirationDate.length < 1) {
            this.showError("Card expiration date invalid");
            isValid = false;
        }
        return isValid;
    };
    CardDetailsPage.prototype.validateConfirmation = function () {
        console.log("validateConfirmation ");
        var isConfirmed = this.confirmationView.isConfirmed();
        if (isConfirmed == false) {
            this.showError("Error. You must confirm card details.");
        }
        return isConfirmed;
    };
    CardDetailsPage.prototype.clearCardIdInput = function () {
        this.cardNumberInput.val("");
    };
    CardDetailsPage.prototype.createCardNumberInputListener = function () {
        var _this = this;
        this.cardNumberInput.keypress(function (e) { return _this.onCardNumberChanged(e); });
    };
    CardDetailsPage.prototype.onCardNumberChanged = function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            this.onCardNumberError();
            return false;
        }
    };
    CardDetailsPage.prototype.createCardTypeSelectListener = function () {
        var _this = this;
        this.cardTypeSelect.change(function () { return _this.onCardTypeSelectChanged(); });
    };
    CardDetailsPage.prototype.onCardTypeSelectChanged = function () {
        this.cardType = this.cardTypeSelect.val();
        this.card.setType(this.cardType);
        this.$j("#cardTypeFormData").val(this.cardType);
        this.clearCardIdInput();
        switch (this.cardType) {
            case "mastercard":
            case "visa":
                this.cardNumberInput.attr("maxlength", this.cardIdMaxCharacters);
                break;
            case "americanExpress":
                this.cardNumberInput.attr("maxlength", this.cardIdMinCharacters);
                break;
        }
    };
    CardDetailsPage.prototype.createDateSelector = function () {
        /*
        this.cardExpirationDateInput.datepicker({
            minDate:0,
            changeYear: true,
            yearRange:'-10:+10',
            defaultDate: new Date(),
            onSelect: (dateText)=>this.onExpirationDateSelected(dateText)
        });
        */
        var _this = this;
        var datepicker = this.cardExpirationDateInput.datepicker({
            minDate: 0,
            changeMonth: true,
            changeYear: true,
            yearRange: '-10:+10',
            dateFormat: 'MM yy',
            defaultDate: new Date(),
            showButtonPanel: true,
            onSelect: function (dateText) { return _this.onExpirationDateSelected(dateText); },
            onClose: function (dateText, inst) { return _this.onCloseDatepicker(dateText, inst); }
        });
        this.cardExpirationDateInput.click(function () { return _this.onDateClicked(); });
        this.cardExpirationDateInput.focus(function () { return _this.onDateClicked(); });
    };
    CardDetailsPage.prototype.onCloseDatepicker = function (dateText, inst) {
        var month = this.$j("#ui-datepicker-div .ui-datepicker-month :selected").val();
        var year = this.$j("#ui-datepicker-div .ui-datepicker-year :selected").val();
        this.cardExpirationDateInput.val(this.$j.datepicker.formatDate('MM yy', new Date(year, month, 1)));
        this.cardExpirationDate = this.cardExpirationDateInput.val();
        this.card.setExpDate(this.cardExpirationDate);
    };
    CardDetailsPage.prototype.onDateClicked = function () {
        this.$j("table.ui-datepicker-calendar").eq(2).prop('style', 'display: none;');
        this.$j("table.ui-datepicker-calendar").hide();
        this.$j("#ui-datepicker-div").position({
            my: "center top",
            at: "center bottom",
            of: this.cardExpirationDateInput
        });
    };
    CardDetailsPage.prototype.hideForm = function () {
        this.form.addClass("hidden");
    };
    CardDetailsPage.prototype.showForm = function () {
        this.form.removeClass("hidden");
    };
    CardDetailsPage.prototype.onCardNumberError = function () {
        this.$j("#errmsg").html("Digits Only").show().fadeOut("slow");
    };
    return CardDetailsPage;
}());
//# sourceMappingURL=CardDetailsPage.js.map