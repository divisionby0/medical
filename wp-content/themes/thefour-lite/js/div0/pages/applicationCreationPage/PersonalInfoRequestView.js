///<reference path="../../../libs/jqueryTS/jquery.d.ts"/>
///<reference path="../../utils/validators/TextLengthValidator.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/events/EventBus.ts"/>
var PersonalInfoRequestView = (function () {
    // TODO привести сюда QuotePerson вместо объекта
    function PersonalInfoRequestView(personData) {
        this.$j = jQuery.noConflict();
        this.age = personData.age;
        this.firstName = personData.firstName;
        this.lastName = personData.lastName;
        this.gender = personData.gender;
        this.relationship = personData.relationship;
        this.birthday = personData.birthday;
        this.firstNameValid = false;
        this.lastNameValid = false;
        this.dateOfBirthValid = false;
        this.relationshipValid = false;
        this.dateOfBirth = "";
        this.createChildren();
    }
    PersonalInfoRequestView.prototype.validate = function () {
        this.firstName = this.firstNameInput.val();
        this.lastName = this.lastNameInput.val();
        this.gender = this.genderSelect.val();
        this.dateOfBirth = this.dateSelect.val();
        this.firstNameValid = this.isFirstNameValid();
        this.lastNameValid = this.isLastNameValid();
        this.dateOfBirthValid = this.isBirthdayValid();
        if (!this.firstNameValid) {
            EventBus.dispatchEvent("PERSONAL_INFO_FIRST_NAME_VALIDATE_ERROR", this.age);
            this.showFirstNameError();
        }
        else if (!this.lastNameValid) {
            EventBus.dispatchEvent("PERSONAL_INFO_LAST_NAME_VALIDATE_ERROR", this.age);
            this.showLastNameError();
        }
        else if (!this.dateOfBirthValid) {
            EventBus.dispatchEvent("PERSONAL_INFO_BIRTHDAY_VALIDATE_ERROR", this.age);
            this.showDateOfBirthError();
        }
    };
    PersonalInfoRequestView.prototype.isValid = function () {
        this.validate();
        if (this.firstNameValid && this.lastNameValid && this.dateOfBirthValid) {
            return true;
        }
        else {
            return false;
        }
    };
    PersonalInfoRequestView.prototype.dropError = function () {
        this.hideFirstNameError();
        this.hideLastNameError();
        this.hideDateOfBirthError();
    };
    PersonalInfoRequestView.prototype.getData = function () {
        var userData = { age: this.age, firstName: this.firstName, lastName: this.lastName, gender: this.gender, birthday: this.dateOfBirth, relationship: this.$j("#relationship_" + this.age).val() };
        return userData;
    };
    PersonalInfoRequestView.prototype.createChildren = function () {
        var _this = this;
        this.lastNameInput = this.$j('#lastname_' + this.age);
        this.firstNameInput = this.$j('#firstname_' + this.age);
        this.relationshipInput = this.$j("#relationship_" + this.age);
        this.firstNameErrorText = this.$j('#firstNameErrorText_' + this.age);
        this.lastNameErrorText = this.$j('#lastNameErrorText_' + this.age);
        this.dateOfBirthErrorText = this.$j('#dateOfBirthErrorText_' + this.age);
        this.genderSelect = this.$j('#genderSelect_' + this.age);
        this.dateSelect = this.$j('#dateOfBirthSelect_' + this.age);
        this.lastNameInput.keydown(function () { return _this.lastNameChangedHandler(); });
        this.firstNameInput.keydown(function () { return _this.firstNameChangedHandler(); });
        if (this.firstName) {
            this.firstNameInput.val(this.firstName);
        }
        if (this.lastName) {
            this.lastNameInput.val(this.lastName);
        }
        if (this.relationship) {
            this.relationshipInput.val(this.relationship);
        }
        if (this.birthday) {
            this.dateSelect.val(this.birthday);
        }
        this.createDateSelector();
    };
    PersonalInfoRequestView.prototype.createDateSelector = function () {
        var _this = this;
        this.dateSelect.datepicker({
            maxDate: 0,
            changeMonth: true,
            changeYear: true,
            yearRange: '-99:+0',
            defaultDate: new Date(),
            onSelect: function (dateText) { return _this.dateOfBirthSelected(dateText); }
        });
    };
    PersonalInfoRequestView.prototype.isBirthdayValid = function () {
        var validator = new TextLengthValidator(this.dateOfBirth);
        var isNotEmpty = validator.validate(1);
        var calculatedAge = DateUtils.getYearsFromDate(this.dateOfBirth);
        if (calculatedAge != this.age) {
            return false;
        }
        return isNotEmpty;
    };
    PersonalInfoRequestView.prototype.isFirstNameValid = function () {
        var validator = new TextLengthValidator(this.firstName);
        return validator.validate(1);
    };
    PersonalInfoRequestView.prototype.isLastNameValid = function () {
        var validator = new TextLengthValidator(this.lastName);
        return validator.validate(1);
    };
    PersonalInfoRequestView.prototype.showFirstNameError = function () {
        this.$j("#firstNameRow_" + this.age).css("color", "#a94442");
        this.$j("#firstNameError_" + this.age).removeClass("hidden");
        this.$j("#firstNameContainer_" + this.age).addClass("has-error has-feedback");
    };
    PersonalInfoRequestView.prototype.hideFirstNameError = function () {
        this.$j("#firstNameRow_" + this.age).css("color", "");
        this.$j("#firstNameError_" + this.age).addClass("hidden");
        this.$j("#firstNameContainer_" + this.age).removeClass("has-error has-feedback");
    };
    PersonalInfoRequestView.prototype.showLastNameError = function () {
        this.$j("#lastNameRow_" + this.age).css("color", "#a94442");
        this.$j("#lastNameError_" + this.age).removeClass("hidden");
        this.$j("#lastNameContainer_" + this.age).addClass("has-error has-feedback");
    };
    PersonalInfoRequestView.prototype.hideLastNameError = function () {
        this.$j("#lastNameRow_" + this.age).css("color", "");
        this.$j("#lastNameError_" + this.age).addClass("hidden");
        this.$j("#lastNameContainer_" + this.age).removeClass("has-error has-feedback");
    };
    PersonalInfoRequestView.prototype.showDateOfBirthError = function () {
        this.$j("#birthdayRow_" + this.age).css("color", "#a94442");
        this.$j("#birthdayError_" + this.age).removeClass("hidden");
        this.$j("#birthdayContainer_" + this.age).addClass("has-error has-feedback");
        this.$j("#dateOfBirthSelect_" + this.age).val("").attr("placeholder", "Empty or not " + this.age + " y.o.").addClass("dateInputError_webkit").addClass("dateInputError_moz").addClass("dateInputError_moz_2").addClass("dateInputError_ms");
    };
    PersonalInfoRequestView.prototype.hideDateOfBirthError = function () {
        this.$j("#birthdayRow_" + this.age).css("color", "");
        this.$j("#birthdayError_" + this.age).addClass("hidden");
        this.$j("#birthdayContainer_" + this.age).removeClass("has-error has-feedback");
        this.$j("#dateOfBirthSelect_" + this.age).attr("placeholder", "Click to pick date of birth").removeClass("dateInputError_webkit").removeClass("dateInputError_moz").removeClass("dateInputError_moz_2").removeClass("dateInputError_ms");
    };
    PersonalInfoRequestView.prototype.lastNameChangedHandler = function () {
        this.hideLastNameError();
        this.dispatchValueChanged();
    };
    PersonalInfoRequestView.prototype.firstNameChangedHandler = function () {
        this.hideFirstNameError();
        this.dispatchValueChanged();
    };
    PersonalInfoRequestView.prototype.dateOfBirthSelected = function (dateText) {
        this.hideDateOfBirthError();
        this.dispatchValueChanged();
    };
    PersonalInfoRequestView.prototype.dispatchValueChanged = function () {
        EventBus.dispatchEvent("PERSONAL_INFO_VALUE_CHANGED", null);
    };
    return PersonalInfoRequestView;
}());
//# sourceMappingURL=PersonalInfoRequestView.js.map