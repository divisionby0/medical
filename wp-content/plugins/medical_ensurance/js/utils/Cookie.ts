module Cookie{
 
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length,c.length);
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

    function detectCookieIsEnabled():boolean{
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;
        if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled)
        {
            document.cookie="testcookie";
            cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
        }
        return (cookieEnabled);
    }
    
    export function getUserInputFormData():string{
        var cookieData = getCookie("userFormData");
        return cookieData;
    }

    export function isEnabled():boolean{
        return detectCookieIsEnabled();
    }
    export function setSelectedCompanyData(companyData:string):void{
        setCookie("selectedCompany", companyData, {expires:360000});
    }
    export function getSelectedCompanyData():string{
        var cookieData = getCookie("selectedCompany");
        return cookieData;
    }

    export function setUserData(userData:any):void{
        setCookie("userPersonalData", userData, {expires:360000});
    }
    export function getUserData():string{
        return getCookie("userPersonalData");
    }
    
    export function setPersons(persons:string):void{
        setCookie("persons", persons, {expires:360000});
    }
    export function getPersons():string{
        return getCookie("persons");
    }
    
    export function setPeriod(period:string):void{
        setCookie("period", period, {expires:360000});
    }
    export function getPeriod():string{
        return getCookie("period");
    }

    export function setBenefit(benefit:any):void{
        setCookie("benefit", benefit, {expires:360000});
    }
    export function getBenefit():any{
        var cookieData = getCookie("benefit");
        return cookieData;
    }

    export function setCompanyPlan(plan:string):void{
        setCookie("plan", plan, {expires:360000});
    }
    export function getCompanyPlan():string{
        var cookieData = getCookie("plan");
        return cookieData;
    }
    
    export function setCurrentPersonIndex(index:number):void{
        setCookie("currentPersonIndex", index, {expires:360000});
    }
    export function getCurrentPersonIndex():string{
        var cookieData = getCookie("currentPersonIndex");
        return cookieData;
    }

    export function setCountryOfOrigin(country:number):void{
        setCookie("countryOfOrigin", country, {expires:360000});
    }
    export function getCountryOfOrigin():string{
        var cookieData = getCookie("countryOfOrigin");
        return cookieData;
    }

    export function setVisitorType(visitorType:number):void{
        setCookie("visitorType", visitorType, {expires:360000});
    }
    export function getVisitorType():string{
        var cookieData = getCookie("visitorType");
        return cookieData;
    }
    
    export function setArrivalDate(date:string):void{
        setCookie("arrivalDate", date, {expires:360000});
    }
    export function getArrivalDate():string{
        var cookieData = getCookie("arrivalDate");
        return cookieData;
    }
    
    // SPONSOR
    export function setSponsorFirstName(name:string):void{
        setCookie("sponsorFirstName", name, {expires:360000});
    }
    export function getSponsorFirstName():string{
        var cookieData = getCookie("sponsorFirstName");
        return cookieData;
    }
    export function setSponsorLastName(name:string):void{
        setCookie("sponsorLastName", name, {expires:360000});
    }
    export function getSponsorLastName():string{
        var cookieData = getCookie("sponsorLastName");
        return cookieData;
    }
    
    // beneficiary
    export function setBeneficiaryFirstName(name:string):void{
        setCookie("beneficiaryFirstName", name, {expires:360000});
    }
    export function getBeneficiaryFirstName():string{
        var cookieData = getCookie("beneficiaryFirstName");
        return cookieData;
    }
    export function setBeneficiaryLastName(name:string):void{
        setCookie("beneficiaryLastName", name, {expires:360000});
    }
    export function getBeneficiaryLastName():string{
        var cookieData = getCookie("beneficiaryLastName");
        return cookieData;
    }
    
    export function setAddress(address:string):void{
        setCookie("address", address, {expires:360000});
    }
    export function getAddress():string{
        var cookieData = getCookie("address");
        return cookieData;
    }
    
    export function setEmail(email:string):void{
        setCookie("email", email, {expires:360000});
    }
    export function getEmail():string{
        var cookieData = getCookie("email");
        return cookieData;
    }
    export function setPhone(phone:string):void{
        setCookie("phone", phone, {expires:360000});
    }
    export function getPhone():string{
        var cookieData = getCookie("phone");
        return cookieData;
    }
    
    export function setQuoteId(id:string):void{
        setCookie("quoteId", id, {expires:360000});
    }
    export function getQuoteId():string{
        var cookieData = getCookie("quoteId");
        return cookieData;
    }

    export function setApplicationType(type:string):void{
        setCookie("applicationType", type, {expires:360000});
    }
    export function getApplicationType():string{
        var cookieData = getCookie("applicationType");
        return cookieData;
    }
    

    export function setSponsorCity(city:string):void{
        setCookie("city", city, {expires:360000});
    }
    export function getSponsorCity():string{
        var cookieData = getCookie("city");
        return cookieData;
    }

    export function setSponsorProvince(province:string):void{
        setCookie("province", province, {expires:360000});
    }
    export function getSponsorProvince():string{
        var cookieData = getCookie("province");
        return cookieData;
    }

    export function setSponsorPostalCode(code:string):void{
        setCookie("postalCode", code, {expires:360000});
    }
    export function getSponsorPostalCode():string{
        var cookieData = getCookie("postalCode");
        return cookieData;
    }
}
