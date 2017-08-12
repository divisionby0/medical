///<reference path="../../../../../../plugins/medical_ensurance/js/utils/Cookie.ts"/>
///<reference path="../../utils/validators/PostalCodeValidator.ts"/>
var PersonsAdditionalDataRequestView = (function () {
    function PersonsAdditionalDataRequestView() {
        this.$j = jQuery.noConflict();
        this.createChildren();
        this.createListeners();
        //this.loadData();
        //this.updateControls();
        if (!this.savedCountryOfOrigin) {
            this.saveCountryOfOrigin();
        }
        if (!this.savedVisitorType) {
            this.saveVisitorType();
        }
        if (!this.savedProvince) {
            this.saveProvince();
        }
        if (!this.savedArrivalDate) {
            this.savedArrivalDate = this.arrivalDateControl.val();
            this.saveArrivalDate(this.savedArrivalDate);
        }
    }
    PersonsAdditionalDataRequestView.prototype.validate = function () {
        var isValid = true;
        var errorText;
        var arrivalDate = this.arrivalDateControl.val();
        var sponsorFirstName = this.sponsorFirstNameControl.val();
        var sponsorLastName = this.sponsorLastNameControl.val();
        var address = this.addressControl.val();
        var city = this.cityControl.val();
        var postalCode = this.postalCodeControl.val();
        var email = this.emailControl.val();
        var emailIsValid = this.validateEmail(email);
        var phone = this.phoneControl.val();
        var phoneIsValid = this.validatePhone(phone);
        var postalCodeIsValid = PostalCodeValidator.validate(postalCode);
        if (!arrivalDate || arrivalDate.length < 3) {
            errorText = "Arrival date invalid";
            isValid = false;
        }
        /*
        if(!sponsorFirstName || sponsorFirstName.length < 3){
            errorText = "Sponsor first name invalid";
            isValid = false;
        }
        if(!sponsorLastName || sponsorLastName.length < 3){
            errorText = "Sponsor last name invalid";
            isValid = false;
        }
        */
        if (!address || address.length < 3) {
            errorText = "Canadian address invalid";
            isValid = false;
        }
        if (!city || city.length < 3) {
            errorText = "City invalid";
            isValid = false;
        }
        if (!postalCodeIsValid) {
            errorText = "Postal code invalid";
            isValid = false;
        }
        if (!emailIsValid) {
            errorText = "Email invalid";
            isValid = false;
        }
        if (!phoneIsValid) {
            errorText = "Phone invalid";
            isValid = false;
        }
        return { isValid: isValid, errorText: errorText };
    };
    PersonsAdditionalDataRequestView.prototype.loadData = function () {
        this.savedCountryOfOrigin = Cookie.getCountryOfOrigin();
        this.savedVisitorType = Cookie.getVisitorType();
        this.savedArrivalDate = Cookie.getArrivalDate();
        this.savedSponsorFirstName = Cookie.getSponsorFirstName();
        this.savedSponsorLastName = Cookie.getSponsorLastName();
        this.savedBeneficiaryFirstName = Cookie.getBeneficiaryFirstName();
        this.savedBeneficiaryRelationship = Cookie.getBeneficiaryLastName();
        this.savedAddress = Cookie.getAddress();
        this.savedProvince = Cookie.getSponsorProvince();
        this.savedCity = Cookie.getSponsorCity();
        this.savedPostalCode = Cookie.getSponsorPostalCode();
        this.savedEmail = Cookie.getEmail();
        this.savedPhone = Cookie.getPhone();
    };
    PersonsAdditionalDataRequestView.prototype.createChildren = function () {
        this.countryOfOriginControl = this.$j("#countriesSelect");
        this.visitorTypeControl = this.$j("#visitorTypeSelect");
        this.arrivalDateControl = this.$j("#arrivalDateInput");
        this.sponsorFirstNameControl = this.$j("#sponsorFirstName");
        this.sponsorLastNameControl = this.$j("#sponsorLastName");
        this.beneficiaryFirstNameControl = this.$j("#beneficiaryFirstName");
        this.beneficiaryRelationship = this.$j("#beneficiaryRelationship");
        this.addressControl = this.$j("#streetInput");
        this.cityControl = this.$j("#cityInput");
        this.provinceControl = this.$j("#provinceSelect");
        this.postalCodeControl = this.$j("#postalCodeSelect");
        this.emailControl = this.$j("#emailInput");
        this.phoneControl = this.$j("#phoneInput");
        this.emailErrorMessageElement = this.$j("#emailErrorMessage");
        this.phoneErrorMessageElement = this.$j("#phoneErrorMessage");
        this.createArrivalDatePicker();
    };
    PersonsAdditionalDataRequestView.prototype.createArrivalDatePicker = function () {
        var _this = this;
        console.log("createArrivalDatePicker");
        console.log("default date: ", new Date());
        this.arrivalDateControl.datepicker({
            minDate: 0,
            changeYear: true,
            yearRange: '-0:+10',
            defaultDate: new Date(),
            onSelect: function (dateText) { return _this.onArrivalDateSelected(dateText); }
        });
    };
    PersonsAdditionalDataRequestView.prototype.updateControls = function () {
        console.log("update controls this.savedArrivalDate=" + this.savedArrivalDate);
        if (this.savedCountryOfOrigin) {
            this.countryOfOriginControl.val(unescape(this.savedCountryOfOrigin));
        }
        if (this.savedVisitorType) {
            this.visitorTypeControl.val(unescape(this.savedVisitorType));
        }
        if (this.savedArrivalDate) {
            this.arrivalDateControl.val(this.savedArrivalDate);
        }
        if (this.savedSponsorFirstName) {
            this.sponsorFirstNameControl.val(unescape(this.savedSponsorFirstName));
        }
        if (this.savedSponsorLastName) {
            this.sponsorLastNameControl.val(unescape(this.savedSponsorLastName));
        }
        if (this.savedBeneficiaryFirstName) {
            this.beneficiaryFirstNameControl.val(unescape(this.savedBeneficiaryFirstName));
        }
        if (this.savedBeneficiaryRelationship) {
            this.beneficiaryRelationship.val(unescape(this.savedBeneficiaryRelationship));
        }
        if (this.savedAddress) {
            this.addressControl.val(unescape(this.savedAddress));
        }
        if (this.savedProvince) {
            this.provinceControl.val(unescape(this.savedProvince));
        }
        if (this.savedEmail) {
            this.emailControl.val(unescape(this.savedEmail));
        }
        if (this.savedPhone) {
            this.phoneControl.val(unescape(this.savedPhone));
        }
        if (this.savedPostalCode) {
            this.postalCodeControl.val(unescape(this.savedPostalCode));
        }
        if (this.savedCity) {
            this.cityControl.val(unescape(this.savedCity));
        }
    };
    PersonsAdditionalDataRequestView.prototype.onArrivalDateSelected = function (dateText) {
        this.saveArrivalDate(dateText);
    };
    PersonsAdditionalDataRequestView.prototype.createListeners = function () {
        var _this = this;
        this.countryOfOriginControl.change(function () { return _this.countryOfOriginControlChanged(); });
        this.visitorTypeControl.change(function () { return _this.visitorTypeControlChanged(); });
        this.sponsorFirstNameControl.keyup(function (e) { return _this.onSponsorFirstNameChanged(e); });
        this.sponsorLastNameControl.keyup(function (e) { return _this.onSponsorLastNameChanged(e); });
        this.beneficiaryFirstNameControl.keyup(function (e) { return _this.onBeneficiaryFirstNameChanged(e); });
        this.beneficiaryRelationship.keyup(function (e) { return _this.onBeneficiaryRelationshipChanged(e); });
        this.addressControl.keyup(function (e) { return _this.onAddressChanged(e); });
        this.provinceControl.change(function () { return _this.provinceControlChanged(); });
        this.cityControl.keyup(function (e) { return _this.cityChanged(e); });
        this.postalCodeControl.keyup(function (e) { return _this.postalCodeChanged(e); });
        this.emailControl.keyup(function (e) { return _this.onEmailChanged(e); });
        this.phoneControl.keyup(function (e) { return _this.onPhoneChanged(e); });
    };
    PersonsAdditionalDataRequestView.prototype.countryOfOriginControlChanged = function () {
        this.saveCountryOfOrigin();
    };
    PersonsAdditionalDataRequestView.prototype.visitorTypeControlChanged = function () {
        this.saveVisitorType();
    };
    PersonsAdditionalDataRequestView.prototype.provinceControlChanged = function () {
        this.saveProvince();
    };
    PersonsAdditionalDataRequestView.prototype.saveCountryOfOrigin = function () {
        Cookie.setCountryOfOrigin(this.countryOfOriginControl.val());
    };
    PersonsAdditionalDataRequestView.prototype.saveVisitorType = function () {
        Cookie.setVisitorType(this.visitorTypeControl.val());
    };
    PersonsAdditionalDataRequestView.prototype.saveProvince = function () {
        Cookie.setSponsorProvince(this.provinceControl.val());
    };
    PersonsAdditionalDataRequestView.prototype.saveArrivalDate = function (date) {
        Cookie.setArrivalDate(date);
    };
    PersonsAdditionalDataRequestView.prototype.onSponsorFirstNameChanged = function (e) {
        Cookie.setSponsorFirstName(this.sponsorFirstNameControl.val());
    };
    PersonsAdditionalDataRequestView.prototype.onSponsorLastNameChanged = function (e) {
        Cookie.setSponsorLastName(this.sponsorLastNameControl.val());
    };
    PersonsAdditionalDataRequestView.prototype.onBeneficiaryFirstNameChanged = function (e) {
        Cookie.setBeneficiaryFirstName(this.beneficiaryFirstNameControl.val());
    };
    PersonsAdditionalDataRequestView.prototype.onBeneficiaryRelationshipChanged = function (e) {
        Cookie.setBeneficiaryLastName(this.beneficiaryRelationship.val());
    };
    PersonsAdditionalDataRequestView.prototype.onAddressChanged = function (e) {
        Cookie.setAddress(this.addressControl.val());
    };
    PersonsAdditionalDataRequestView.prototype.onEmailChanged = function (e) {
        var email = this.emailControl.val();
        var emailIsValid = this.validateEmail(email);
        if (emailIsValid) {
            Cookie.setEmail(email);
        }
        else {
        }
    };
    PersonsAdditionalDataRequestView.prototype.onPhoneChanged = function (e) {
        var phone = this.phoneControl.val();
        var phoneIsValid = this.validatePhone(phone);
        if (phoneIsValid) {
            Cookie.setPhone(phone);
        }
    };
    PersonsAdditionalDataRequestView.prototype.cityChanged = function (e) {
        Cookie.setSponsorCity(this.cityControl.val());
    };
    PersonsAdditionalDataRequestView.prototype.postalCodeChanged = function (e) {
        Cookie.setSponsorPostalCode(this.postalCodeControl.val());
    };
    PersonsAdditionalDataRequestView.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    PersonsAdditionalDataRequestView.prototype.validatePhone = function (phone) {
        var regex = /^\d+$/;
        return regex.test(phone);
    };
    PersonsAdditionalDataRequestView.prototype.validatePostalCode = function (postal) {
        return PostalCodeValidator.validate(postal);
    };
    return PersonsAdditionalDataRequestView;
}());
//# sourceMappingURL=PersonsAdditionalDataRequestView.js.map