var Cookie;
(function (Cookie) {
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    function setCookie(name, value, options) {
        options = options || {};
        var expires = options.expires;
        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }
        value = encodeURIComponent(value);
        var updatedCookie = name + "=" + value;
        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }
        updatedCookie += ";path=/";
        document.cookie = updatedCookie;
    }
    function detectCookieIsEnabled() {
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;
        if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
            document.cookie = "testcookie";
            cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
        }
        return (cookieEnabled);
    }
    function getUserInputFormData() {
        var cookieData = getCookie("userFormData");
        return cookieData;
    }
    Cookie.getUserInputFormData = getUserInputFormData;
    function isEnabled() {
        return detectCookieIsEnabled();
    }
    Cookie.isEnabled = isEnabled;
    function setSelectedCompanyData(companyData) {
        setCookie("selectedCompany", companyData, { expires: 360000 });
    }
    Cookie.setSelectedCompanyData = setSelectedCompanyData;
    function getSelectedCompanyData() {
        var cookieData = getCookie("selectedCompany");
        return cookieData;
    }
    Cookie.getSelectedCompanyData = getSelectedCompanyData;
    function setUserData(userData) {
        setCookie("userPersonalData", userData, { expires: 360000 });
    }
    Cookie.setUserData = setUserData;
    function getUserData() {
        return getCookie("userPersonalData");
    }
    Cookie.getUserData = getUserData;
    function setPersons(persons) {
        setCookie("persons", persons, { expires: 360000 });
    }
    Cookie.setPersons = setPersons;
    function getPersons() {
        return getCookie("persons");
    }
    Cookie.getPersons = getPersons;
    function setPeriod(period) {
        setCookie("period", period, { expires: 360000 });
    }
    Cookie.setPeriod = setPeriod;
    function getPeriod() {
        return getCookie("period");
    }
    Cookie.getPeriod = getPeriod;
    function setBenefit(benefit) {
        setCookie("benefit", benefit, { expires: 360000 });
    }
    Cookie.setBenefit = setBenefit;
    function getBenefit() {
        var cookieData = getCookie("benefit");
        return cookieData;
    }
    Cookie.getBenefit = getBenefit;
    function setCompanyPlan(plan) {
        setCookie("plan", plan, { expires: 360000 });
    }
    Cookie.setCompanyPlan = setCompanyPlan;
    function getCompanyPlan() {
        var cookieData = getCookie("plan");
        return cookieData;
    }
    Cookie.getCompanyPlan = getCompanyPlan;
    function setCurrentPersonIndex(index) {
        setCookie("currentPersonIndex", index, { expires: 360000 });
    }
    Cookie.setCurrentPersonIndex = setCurrentPersonIndex;
    function getCurrentPersonIndex() {
        var cookieData = getCookie("currentPersonIndex");
        return cookieData;
    }
    Cookie.getCurrentPersonIndex = getCurrentPersonIndex;
    function setCountryOfOrigin(country) {
        setCookie("countryOfOrigin", country, { expires: 360000 });
    }
    Cookie.setCountryOfOrigin = setCountryOfOrigin;
    function getCountryOfOrigin() {
        var cookieData = getCookie("countryOfOrigin");
        return cookieData;
    }
    Cookie.getCountryOfOrigin = getCountryOfOrigin;
    function setVisitorType(visitorType) {
        setCookie("visitorType", visitorType, { expires: 360000 });
    }
    Cookie.setVisitorType = setVisitorType;
    function getVisitorType() {
        var cookieData = getCookie("visitorType");
        return cookieData;
    }
    Cookie.getVisitorType = getVisitorType;
    function setArrivalDate(date) {
        setCookie("arrivalDate", date, { expires: 360000 });
    }
    Cookie.setArrivalDate = setArrivalDate;
    function getArrivalDate() {
        var cookieData = getCookie("arrivalDate");
        return cookieData;
    }
    Cookie.getArrivalDate = getArrivalDate;
    // SPONSOR
    function setSponsorFirstName(name) {
        setCookie("sponsorFirstName", name, { expires: 360000 });
    }
    Cookie.setSponsorFirstName = setSponsorFirstName;
    function getSponsorFirstName() {
        var cookieData = getCookie("sponsorFirstName");
        return cookieData;
    }
    Cookie.getSponsorFirstName = getSponsorFirstName;
    function setSponsorLastName(name) {
        setCookie("sponsorLastName", name, { expires: 360000 });
    }
    Cookie.setSponsorLastName = setSponsorLastName;
    function getSponsorLastName() {
        var cookieData = getCookie("sponsorLastName");
        return cookieData;
    }
    Cookie.getSponsorLastName = getSponsorLastName;
    // beneficiary
    function setBeneficiaryFirstName(name) {
        setCookie("beneficiaryFirstName", name, { expires: 360000 });
    }
    Cookie.setBeneficiaryFirstName = setBeneficiaryFirstName;
    function getBeneficiaryFirstName() {
        var cookieData = getCookie("beneficiaryFirstName");
        return cookieData;
    }
    Cookie.getBeneficiaryFirstName = getBeneficiaryFirstName;
    function setBeneficiaryLastName(name) {
        setCookie("beneficiaryLastName", name, { expires: 360000 });
    }
    Cookie.setBeneficiaryLastName = setBeneficiaryLastName;
    function getBeneficiaryLastName() {
        var cookieData = getCookie("beneficiaryLastName");
        return cookieData;
    }
    Cookie.getBeneficiaryLastName = getBeneficiaryLastName;
    function setAddress(address) {
        setCookie("address", address, { expires: 360000 });
    }
    Cookie.setAddress = setAddress;
    function getAddress() {
        var cookieData = getCookie("address");
        return cookieData;
    }
    Cookie.getAddress = getAddress;
    function setEmail(email) {
        setCookie("email", email, { expires: 360000 });
    }
    Cookie.setEmail = setEmail;
    function getEmail() {
        var cookieData = getCookie("email");
        return cookieData;
    }
    Cookie.getEmail = getEmail;
    function setPhone(phone) {
        setCookie("phone", phone, { expires: 360000 });
    }
    Cookie.setPhone = setPhone;
    function getPhone() {
        var cookieData = getCookie("phone");
        return cookieData;
    }
    Cookie.getPhone = getPhone;
    function setQuoteId(id) {
        setCookie("quoteId", id, { expires: 360000 });
    }
    Cookie.setQuoteId = setQuoteId;
    function getQuoteId() {
        var cookieData = getCookie("quoteId");
        return cookieData;
    }
    Cookie.getQuoteId = getQuoteId;
    function setApplicationType(type) {
        setCookie("applicationType", type, { expires: 360000 });
    }
    Cookie.setApplicationType = setApplicationType;
    function getApplicationType() {
        var cookieData = getCookie("applicationType");
        return cookieData;
    }
    Cookie.getApplicationType = getApplicationType;
    function setSponsorCity(city) {
        setCookie("city", city, { expires: 360000 });
    }
    Cookie.setSponsorCity = setSponsorCity;
    function getSponsorCity() {
        var cookieData = getCookie("city");
        return cookieData;
    }
    Cookie.getSponsorCity = getSponsorCity;
    function setSponsorProvince(province) {
        setCookie("province", province, { expires: 360000 });
    }
    Cookie.setSponsorProvince = setSponsorProvince;
    function getSponsorProvince() {
        var cookieData = getCookie("province");
        return cookieData;
    }
    Cookie.getSponsorProvince = getSponsorProvince;
    function setSponsorPostalCode(code) {
        setCookie("postalCode", code, { expires: 360000 });
    }
    Cookie.setSponsorPostalCode = setSponsorPostalCode;
    function getSponsorPostalCode() {
        var cookieData = getCookie("postalCode");
        return cookieData;
    }
    Cookie.getSponsorPostalCode = getSponsorPostalCode;
})(Cookie || (Cookie = {}));
//# sourceMappingURL=Cookie.js.map