// EXTENDS 
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

console.log("IM constants");
// CONSTANTS
var BENEFIT_AMOUNT = 'benefitAmount';
var DEDUCTIBLE = 'deductible';
var RATE = 'rate';
var DEDUCTIBLE_AMOUNT_OPTION = 'deductibleAmountOption';

var SCCC_MAP_ID = 'scccMap';
var STANDARD_RATES_MAP_ID = 'standardRatesMap';

var AGE_FROM = 'ageFrom';
var AGE_TILL = 'ageTill';
var STABLE_CHRONIC_CONDITION_OPTION = 'scco';
var MEDICAL_DECLARATION_REQUIRED = 'mdr';
var PREMIUM_TABLE = 'premiumTable';

var SURCHARGE_OR_DISCOUNT = 'surchargeOrDiscount';
var AGGREGATE_POLICY_LIMIT = 'aggregatePolicyLimit';

// rates
var RATES_TABLE_ID = 'ratesTable';
var RATE_TABLE_EDITOR_ID = 'rateTableEditor';
var RATE_AGE_FROM_SELECT_ID = "rateAgeFromSelect";
var RATE_AGE_TILL_SELECT_ID = "rateAgeTillSelect";

var SCCO_SELECT_ID = "sccoSelect";
var MEDICAL_DECLARATION_REQUIRED_SELECT_ID = "medicalDeclarationRequiredSelect";
var PREMIUM_TABLE_SELECT_ID = "premiumTableSelect";
var RATE_NORMAL_DEDUCTIBLE_AMOUNT_SELECT_ID = "rateNormalDeductibleAmountSelect";

// new rate dialog
var NEW_RATE_DIALOG_CONTENT = 'newRateDataDialogContent';
var NEW_RATE_DIALOG_OK_BUTTON = 'newRateDialogOkButton';
var NEW_RATE_DIALOG_CANCEL_BUTTON = 'newRateDialogCancelButton';

var NEW_DEDUCTIBLE_AMOUNT_OPTION_DIALOG_CONTENT = 'newDeductibleAmountOptionDialogContent';

var PRIMARY = "Primary";
var SCCC_TABLE = "SCCC_TABLE";
var STANDARD_RATES_TABLE = "STANDARD_RATES_TABLE";
var COLLECTION_ITEM_ADDED = 'COLLECTION_ITEM_ADDED';
var BENEFITS_COLLECTION_EMPTY = 'BENEFITS_COLLECTION_EMPTY';
var COLLECTION_CHANGED = 'COLLECTION_CHANGED';
var BENEFITS_COLLECTION_NOT_EMPTY = 'BENEFITS_COLLECTION_NOT_EMPTY';
var COLLECTION_ITEM_REMOVED = 'COLLECTION_ITEM_REMOVED';
var ON_RATE_ADDED = 'ON_RATE_ADDED';
var ON_RATE_REMOVED = 'ON_RATE_REMOVED';
var NEW_TABLE_ROW_ADDED = 'NEW_TABLE_ROW_ADDED';
var REMOVE_RATE_REQUEST = 'REMOVE_RATE_REQUEST';
var REMOVE_DEDUCTIBLE_AMOUNT_OPTION_REQUEST = 'REMOVE_DEDUCTIBLE_AMOUNT_OPTION_REQUEST';
var NEW_DEDUCTIBLE_AMOUNT_OPTION_REQUEST = 'NEW_DEDUCTIBLE_AMOUNT_OPTION_REQUEST';
var NEW_DEDUCTIBLE_AMOUNT_OPTION_CREATION = 'NEW_DEDUCTIBLE_AMOUNT_OPTION_CREATION';
var ON_DEDUCTIBLE_AMOUNT_OPTIONS_DATA = 'ON_DEDUCTIBLE_AMOUNT_OPTIONS_DATA';


console.log("Im ages");
// AGES
var MIN_AGE = 0;
var MAX_AGE = 99;
var AgeRangeValidator = function(){
    return{
        validate:function(ageFrom, ageTill){
            var fromGreaterThenTill = parseInt(ageFrom) > parseInt(ageTill);
            var fromEqualsTill = parseInt(ageFrom) == parseInt(ageTill);

            if(fromGreaterThenTill || fromEqualsTill){
                return false;
            }
            else{
                return true;
            }
        }
    }
};
var AgeRangeFormatter = function(){

    return{
        format:function(_ageFrom, _ageTill){

            var ageFrom = parseInt(_ageFrom);
            var ageTill = parseInt(_ageTill);
            var min = parseInt(MIN_AGE);
            var max = parseInt(MAX_AGE);

            if(ageFrom === min && ageTill > min){
                return 'Under '+ageTill;
            }
            else if(ageFrom > min && ageTill === max){
                return ageFrom + ' and over';
            }
            else{

                return ageFrom+" to "+ageTill;
            }
        },
        getRangeFromString:function(ageRangeString){
            
        }
    }
};

var RENDERER_VALUE_CHANGED = 'RENDERER_VALUE_CHANGED';
var CLEAR_TABLE_BUTTON_CLICK = 'CLEAR_TABLE_BUTTON_CLICK';

console.log("IM utils");
// UTILS
var DateUtils = (function(){
    function calculateAge(start) { // birthday is a date
        var ageDifMs = Date.now() - start.getTime();
        console.log("start.getTime()="+start.getTime());
        console.log("ageDifMs="+ageDifMs);
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    function formatValue(value){
        var formated = value.toString();

        if(formated.length == 1){
            formated = '0'+formated;
        }
        return formated;
    }
    
    return{
        getTomorrowDate:function(currentDateString){
            var tomorrowDate;

            if(currentDateString){
                tomorrowDate = moment(currentDateString, "YYYY-MM-DD").add(1, 'days');
            }
            else{
                var now = moment();
                tomorrowDate = now.add(1, 'days');
            }

            var day = tomorrowDate.format('DD');
            var month = tomorrowDate.format('MM');
            var year = tomorrowDate.format('YYYY');

            day = formatValue(day);
            month = formatValue(month);

            return year+"-"+month+"-"+day;
        },
        getCurrentDate:function(){
            var d = new Date();
            var curr_date = d.getDate();
            var curr_month = d.getMonth() + 1;
            var curr_year = d.getFullYear();

            curr_date = formatValue(curr_date);
            curr_month = formatValue(curr_month);

            return curr_year+"-"+curr_month+"-"+curr_date;
        },
        parseDate:function(dateString){
            var dateArray = dateString.split('+');
            var anotherData = moment(dateString, "YYYY-MM-DD");

            var day = anotherData.format('DD');
            var month = anotherData.format('MM');
            var year = anotherData.format('YYYY');

            day = formatValue(day);
            month = formatValue(month);

            //return curr_year+"-"+curr_month+"-"+curr_date;
            return year+"-"+month+"-"+day;
        },
        getYearsFromDate:function(dateString){
            var years = moment().diff(dateString, 'years');
            return years;
        },
        parseToArray:function(dateString){
            var dateArray = dateString.split('-');
            var year = dateArray[0];
            var month = dateArray[1];
            var day = dateArray[2];

            day = formatValue(day);
            month = formatValue(month);

            return [year, month,day];
        }
    }
})();
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
var MapUtils = (function(){
    return{
        getMapJson:function(map){
            var mapJsonEncoder = map.getEncoder();
            return mapJsonEncoder.encode();
        },
        createMapFromJson:function(jsonString){
            var mapJsonDecoder = new MapJsonDecoder(jsonString);
            return mapJsonDecoder.decode();
        },
        setAllValuesToZero:function(map){
            var mapIterator = map.getIterator();
            while(mapIterator.hasNext()){
                var row = mapIterator.next();
                var rowKeys = row.getKeys();
                row.clear();

                for(var i=0; i<rowKeys.length; i++){
                    var key = rowKeys[i];
                    row.add(key,0);
                }
            }
        }
    }
})();
var StringUtils = (function(){
    function splitMoney(source){
        var n = source.toString(), p = n.indexOf('.');
        return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function($0, i){
            return p<0 || i<p ? ($0+' ') : $0;
        });
    }

    function roundPlus(x, n) { //x - число, n - количество знаков
        if(isNaN(x) || isNaN(n)) return false;
        var m = Math.pow(10,n);
        return Math.round(x*m)/m;
    }


    return{
        formatDivisionalMoney:function(source){
            var valueNumber = source;
            var data = source.toString().split(".");
            var division = data[1];
            var int = data[0];
            var divisionNumber = valueNumber.toFixed(2);

            //var result = "$ "+ int+"."+ division.substring(0,2);
            //var result = "$ "+ int+"."+ division.substring(0,2)+"  toFixeddd:"+divisionNumber;
            var result = "$ "+ divisionNumber;

            return result;
        },
        formatMoney:function(source){
            var result = source.toString();

            var firstBits = result.substring(0,3);
            var nextBits = result.substring(3,6);

            return "$ "+firstBits+" "+nextBits;
        },
        formatMoneyInt:function(source){
            return "$ "+splitMoney(source);
        },
        parseURI:function(dataString){
            var dataObject = null;

            try{
                //console.log("decoding '"+dataString+"'");
                dataString = decodeURIComponent(dataString);
                //console.log("decoded "+dataString);
            }
            catch(error){
                console.error("decodeURIComponent error: "+error);
            }
            
            try{
                dataObject = JSON.parse(dataString);
            }
            catch(error){
                console.error('parse error '+error);
                return null;
            }
            return dataObject;
        },
        decodeHTML:function(html){
            var txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
        },
        stripHTML:function(source){
            var $ = jQuery.noConflict();
            return $(source).text()
        },
        decorateCardNumber:function(source){
            var characters = source.split("");
            var totalCharacters = characters.length;

            var result = "";
            for(var i=0; i<totalCharacters;i++){
                if(i < totalCharacters - 4){
                    result+="*";
                }
                else{
                    result+=characters[i];
                }

            }
            return result;
        }
    }
})();
var TextInputUtils = (function(){
    return{
        isOnlyNumbersWithDot:function(elementEvent){
            var charCode;
            if (elementEvent.keyCode > 0) {
                charCode = elementEvent.which || elementEvent.keyCode;
            }
            else if (typeof (elementEvent.charCode) != "undefined") {
                charCode = elementEvent.which || elementEvent.keyCode;
            }
            if (charCode == 46 || charCode == 45)
                return true;
            if (charCode > 31 && (charCode < 48 || charCode > 57))
                return false;
            return true;
        }
    }
})();
var NavigatorUtil = (function () {
    function NavigatorUtil() {
    }
    NavigatorUtil.navigateTo = function (url) {
        document.location.href = url;
    };
    return NavigatorUtil;
}());
var QuoteSaver = (function () {
    function QuoteSaver() {
        this.$j = jQuery.noConflict();
    }
    //public save(companyName:string, data:string, persons:string, period:string, numPersons:number, startDate:string, finishDate:string):void{
    QuoteSaver.prototype.save = function (quoteData) {
        var _this = this;
        var dataToSave = { 'action': 'saveApplication',
            'companyName': quoteData.companyName,
            'quoteData': quoteData.quoteData,
            'persons': quoteData.persons,
            'period': quoteData.period,
            'numPersons': quoteData.numPersons,
            'startDate': quoteData.startDate,
            'finishDate': quoteData.finishDate,
            //'cardType':quoteData.cardType,
            //'cardHolderName':quoteData.cardHolderName,
            //'cardExpDate':quoteData.cardExpDate,
            //'cardNumber':quoteData.cardNumber,
            'countryOfOrigin': quoteData.countryOfOrigin,
            'visitorType': quoteData.visitorType,
            'arrivalDate': quoteData.arrivalDate,
            'sponsorFirstName': quoteData.sponsorFirstName,
            'sponsorLastName': quoteData.sponsorLastName,
            'beneficiaryFirstName': quoteData.beneficiaryFirstName,
            'beneficiaryLastName': quoteData.beneficiaryLastName,
            'address': quoteData.address,
            'email': quoteData.email,
            'phone': quoteData.phone,
            'city': quoteData.city,
            'province': quoteData.province,
            'postalCode': quoteData.postalCode,
            'quoteId': quoteData.quoteId,
            'applicationType': quoteData.type
        };
        console.log("saving quote ",dataToSave);
        this.$j.post(ajaxurl, dataToSave, function (response) { return _this.onQuoteSaveComplete(response); });
    };
    QuoteSaver.prototype.onQuoteSaveComplete = function (response) {
        //alert("ApplicationSaver response "+response);
    };
    return QuoteSaver;
}());
var MoneyFormatter = (function () {
    function MoneyFormatter() {
    }
    MoneyFormatter.format = function (n, c, d, t) {
        //var n = this,
        var c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "." : d, t = t == undefined ? "," : t, s = n < 0 ? "-" : "", i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), j = (j = i.length) > 3 ? j % 3 : 0;
        //return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t);
    };
    return MoneyFormatter;
}());
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
var TextLengthValidator = (function () {
    function TextLengthValidator(text) {
        this.text = text;
    }
    TextLengthValidator.prototype.validate = function (minCharacters) {
        return this.text.length > minCharacters - 1;
    };
    return TextLengthValidator;
}());


console.log("im collections");
// COLLECTIONS
var ListIterator = (function () {
    function ListIterator(_collection) {
        this.counter = -1;
        this.collection = _collection;
    }
    ListIterator.prototype.hasNext = function () {
        var nextIndex = this.counter + 1;
        if (nextIndex < this.collection.size()) {
            return true;
        }
        else {
            return false;
        }
    };
    ListIterator.prototype.next = function () {
        this.counter += 1;
        return this.collection.get(this.counter);
    };
    return ListIterator;
}());
var MapIterator = (function () {
    function MapIterator(_collection) {
        this.counter = -1;
        this.collection = _collection;
        this.keys = this.collection.getKeys();
    }
    MapIterator.prototype.hasNext = function () {
        var nextIndex = this.counter + 1;
        if (nextIndex < this.keys.length) {
            return true;
        }
        else {
            return false;
        }
    };
    MapIterator.prototype.next = function () {
        this.counter += 1;
        var key = this.keys[this.counter];
        return this.collection.get(key);
    };
    MapIterator.prototype.size = function () {
        return this.keys.length;
    };
    return MapIterator;
}());
var List = (function () {
    function List(id) {
        if (id) {
            this.id = id;
        }
        this.items = [];
    }
    List.prototype.size = function () {
        return this.items.length;
    };
    List.prototype.add = function (value) {
        this.items.push(value);
    };
    List.prototype.get = function (index) {
        return this.items[index];
    };
    List.prototype.remove = function (index) {
        this.items.splice(index, 1);
    };
    List.prototype.clear = function () {
        this.items = [];
    };
    List.prototype.getIterator = function () {
        return new ListIterator(this);
    };
    List.prototype.setId = function (id) {
        this.id = id;
    };
    List.prototype.getId = function () {
        return this.id;
    };
    return List;
}());
var Map = (function () {
    function Map(id) {
        this.keys = new Array();
        if (id) {
            this.id = id;
        }
        this.items = {};
    }
    Map.prototype.removeKey = function (key) {
        var index = this.keys.indexOf(key);
        this.keys.splice(index, 1);
    };
    Map.prototype.add = function (key, value) {
        var keyExists = this.has(key);
        if (!keyExists) {
            this.items[key] = value;
            this.keys.push(key);
        }
        else {
            throw new Error(key + ' already exists');
        }
    };
    Map.prototype.remove = function (key) {
        delete this.items[key];
        // remove key
        this.removeKey(key);
    };
    Map.prototype.update = function (key, newValue) {
        var value = this.get(key);
        if (value != undefined && value != null) {
            this.items[key] = newValue;
        }
        else {
            console.error('Map error. No such element by key ' + key);
        }
    };
    Map.prototype.clear = function () {
        this.keys = new Array();
        this.items = {};
    };
    Map.prototype.has = function (key) {
        return key in this.items;
    };
    Map.prototype.get = function (key) {
        return this.items[key];
    };
    Map.prototype.getKeys = function () {
        return this.keys;
    };
    Map.prototype.size = function () {
        return this.keys.length;
    };
    Map.prototype.getIterator = function () {
        return new MapIterator(this);
    };
    Map.prototype.setId = function (id) {
        this.id = id;
    };
    Map.prototype.getId = function () {
        return this.id;
    };
    Map.prototype.getEncoder = function () {
        return new MapJsonEncoder(this);
    };
    return Map;
}());

var MapJsonDecoder = (function () {
    function MapJsonDecoder(dataString) {
        this.rootMap = new Map('rootMap');
        this.dataString = dataString;
    }
    MapJsonDecoder.prototype.decode = function () {
        this.parseStringToMap(this.dataString, this.rootMap);
        return this.rootMap;
    };
    MapJsonDecoder.prototype.parseStringToMap = function (dataString, parentMap) {
        var dataJson = '';
        try {
            dataJson = JSON.parse(dataString);
        }
        catch (error) {
            console.log('MapJsonDecoder error: Not valid json.');
        }
        this.parseObjectToMap(dataJson, parentMap);
    };
    MapJsonDecoder.prototype.parseObjectToMap = function (dataObject, parentMap) {
        var id = dataObject["id"];
        var type = dataObject["type"];
        if (type == "Map") {
            for (var key in dataObject) {
                var value = dataObject[key];
                var valueId = value["id"];
                var valueType = value["type"];
                if (key != "id" && key != "type" && valueType == "Map") {
                    var subMap = new Map(valueId);
                    parentMap.add(key, this.parseObjectToMap(value, subMap));
                }
                else {
                    if (key === "id") {
                        parentMap.setId(value);
                    }
                    else if (key != "type") {
                        parentMap.add(key, value);
                    }
                }
            }
        }
        return parentMap;
    };
    return MapJsonDecoder;
}());

var MapJsonEncoder = (function () {
    function MapJsonEncoder(collection) {
        this.collection = collection;
    }
    MapJsonEncoder.prototype.encode = function () {
        var parsedObject = this.parseToObject(this.collection);
        var parsedJson = JSON.stringify(parsedObject);
        return parsedJson;
    };
    MapJsonEncoder.prototype.parseToObject = function (collection) {
        var parsedObject = {};
        parsedObject['id'] = collection.getId();
        parsedObject['type'] = "Map";
        var keys = collection.getKeys();
        for (var index in keys) {
            var currentKey = keys[index];
            var currentValue = collection.get(currentKey);
            var isMap = currentValue instanceof Map;
            if (isMap) {
                parsedObject[currentKey] = this.parseToObject(currentValue);
            }
            else {
                parsedObject[currentKey] = currentValue;
            }
        }
        return parsedObject;
    };
    return MapJsonEncoder;
}());

console.log("IM EventBus");
// EvantBus
var EventBus;
(function (EventBus) {
    var listeners = new Map('listeners');
    // add event listener
    function addEventListener(type, callback) {
        var typeExists = listeners.has(type);
        if (!typeExists) {
            createType(type);
        }
        var typeListeners = getTypeListeners(type);
        addTypeListener(callback, typeListeners);
    }
    EventBus.addEventListener = addEventListener;
    // remove event listener
    function removeEventListener(type, callback) {
        var typeExists = listeners.has(type);
        if (!typeExists) {
            return;
        }
        var typeListeners = getTypeListeners(type);
        removeTypeListeners(callback, typeListeners);
    }
    EventBus.removeEventListener = removeEventListener;
    function dispatchEvent(type, eventData) {
        var typeExists = listeners.has(type);
        if (!typeExists) {
            return;
        }
        var typeListeners = getTypeListeners(type);
        executeListenersCallback(typeListeners, eventData);
    }
    EventBus.dispatchEvent = dispatchEvent;
    function executeListenersCallback(typeListeners, eventData) {
        var iterator = typeListeners.getIterator();
        while (iterator.hasNext()) {
            var listenerCallback = iterator.next();
            listenerCallback.call(this, eventData);
        }
    }
    function getTypeListeners(type) {
        return listeners.get(type);
    }
    function createType(type) {
        var typeListeners = createTypeListeners(type);
        listeners.add(type, typeListeners);
    }
    function addTypeListener(callback, typeListeners) {
        typeListeners.add(callback);
    }
    function createTypeListeners(type) {
        return new List(type);
    }
    function removeTypeListeners(callback, typeListeners) {
        var iterator = typeListeners.getIterator();
        var currentTypeListeners = new Array();
        var index = -1;
        while (iterator.hasNext()) {
            index++;
            var typeListener = iterator.next();
            if (callback.toString() == typeListener.toString()) {
                currentTypeListeners.push(index);
            }
        }
        removeCurrentTypeListeners(currentTypeListeners, typeListeners);
        updateListeners(typeListeners);
    }
    function removeCurrentTypeListeners(currentTypeListeners, typeListeners) {
        if (currentTypeListeners.length > 0) {
            for (var i = 0; i < currentTypeListeners.length; i++) {
                var listenerToRemoveIndex = currentTypeListeners[i];
                typeListeners.remove(listenerToRemoveIndex);
            }
        }
    }
    function updateListeners(typeListeners) {
        if (typeListeners.size() == 0) {
            removeType(typeListeners);
        }
    }
    function removeType(typeListeners) {
        var type = typeListeners.getId();
        listeners.remove(type);
    }
})(EventBus || (EventBus = {}));

console.log("Im db");
// DB
var DB = (function () {
    function DB() {
    }
    DB.savePersons = function (data, quoteId) {
        var j = jQuery.noConflict();
        var dataToSave = { 'action': 'saveTempQuotePersons',
            'quoteId': quoteId,
            'data': data
        };
        j.post(ajaxurl, dataToSave, function (response) {
            //console.log("save persons response: "+response);
        });
    };
    DB.loadPersons = function (quoteId) {
        var j = jQuery.noConflict();
        var requestData = { 'action': 'loadTempQuotePersons',
            'quoteId': quoteId
        };
        j.post(ajaxurl, requestData, function (response) {
            EventBus.dispatchEvent("personsDataLoadComplete", response);
        });
    };
    DB.deletePersons = function (quoteId) {
        var j = jQuery.noConflict();
        var requestData = { 'action': 'removeTempQuotePersons',
            'quoteId': quoteId
        };
        j.post(ajaxurl, requestData, function (response) {
            console.log("persons temp record removed data: " + response);
        });
    };
    return DB;
}());
console.log("IM BenefitsCollectionChangedListener");
// BenefitsCollectionChangedListener
var BenefitsCollectionChangedListener = function(){
    
    var collectionEmptyHandler;
    var collectionNotEmptyHandler;
    
    function createListener(event, _handler){
        EventBus.addEventListener(COLLECTION_ITEM_ADDED, onCollectionItemChanged);
        EventBus.addEventListener(COLLECTION_ITEM_REMOVED, onCollectionItemChanged);
        EventBus.addEventListener(COLLECTION_CHANGED,onCollectionItemChanged);
    }
    
    function removeListener(){
        EventBus.removeEventListener(COLLECTION_ITEM_ADDED, onCollectionItemChanged);
        EventBus.removeEventListener(COLLECTION_ITEM_REMOVED, onCollectionItemChanged);
        EventBus.removeEventListener(COLLECTION_CHANGED,onCollectionItemChanged);
    }

    function dispatchCollectionEmptyEvent(){
        collectionEmptyHandler.call(this);
    }
    function dispatchCollectionNotEmptyEvent(){
        collectionNotEmptyHandler.call(this);
    }

    function onCollectionItemChanged(eventData){
        var itemType = eventData.type;
        if(itemType == BENEFIT_AMOUNT){
            var collectionSize = eventData.total;
            if(collectionSize == 0){
                dispatchCollectionEmptyEvent();
            }
            else{
                dispatchCollectionNotEmptyEvent();
            }
        }
    }
    
    return{
        init:function(_collectionEmptyHandler, _collectionNotEmptyHandler){
            collectionEmptyHandler = _collectionEmptyHandler;
            collectionNotEmptyHandler = _collectionNotEmptyHandler;
            createListener();
            
        },
        destroy:function(){
            removeListener();
        }
    }
}
console.log("IM CreateEmptyTableDataProvider");
// CreateEmptyTableDataProvider
var CreateEmptyTableDataProvider = (function(){

    var tableRowMaxLength = 100;

    function createMapStructure(mapId){
        var map = new Map(mapId);
        return map;
    }

    function fillMapWithData(map, startIndex, rowMaxLength){
        var mapIterator = map.getIterator();
        while(mapIterator.hasNext()){
            var row = mapIterator.next();
            fillMapWithZeroValues(row, startIndex, rowMaxLength);
        }
        console.log(map);
    }

    function fillMapWithZeroValues(map, startIndex, rowMaxLength){
        for(var i=startIndex; i<rowMaxLength; i++){
            map.add(i, 0);
        }
    }

    return{
        create:function(type){
            if(type == SCCC_TABLE){
                var map = createMapStructure(SCCC_MAP_ID);
                return map;
            }
            else if(type == STANDARD_RATES_TABLE){
                var map = createMapStructure(STANDARD_RATES_MAP_ID);
                return map;
            }
            else{
                console.error('Could not create empty table data provider from type '+type);
            }
        }
    }
})();

console.log("IM BaseTable");
// BaseTable
var BaseTable = (function () {
    function BaseTable(id, data, rowStartIndex, rowMaxLength) {
        this.htmlContent = '';
        this.rowMaxLength = 100;
        this.rowStartIndex = 0;
        if (rowMaxLength) {
            this.rowMaxLength = rowMaxLength;
        }
        if (rowStartIndex) {
            this.rowStartIndex = rowStartIndex;
        }
        if (data && data.size() > 0) {
            this.data = data;
            this.createPrefixAndPostfix(id);
            this.createContent();
        }
    }
    BaseTable.prototype.createPrefixAndPostfix = function (id) {
        this.prefix = '<b><font color="red">Info: N/A values should set to -1</font></b><table id="' + id + '">';
        this.postfix = '</table>';
    };
    BaseTable.prototype.createContent = function () {
        this.createLegendRow();
        this.createContentFromData();
    };
    BaseTable.prototype.createContentFromData = function () {
    };
    BaseTable.prototype.createRow = function (row) {
    };
    BaseTable.prototype.addLegendRow = function (row) {
        this.htmlContent = this.htmlContent + '<td><b><font color="blue">$' + row.getId() + '</font></b></td>';
    };
    BaseTable.prototype.createLegendRow = function () {
    };
    BaseTable.prototype.getHTML = function () {
        return this.prefix + this.htmlContent + this.postfix;
    };
    return BaseTable;
}());

console.log("IM Table");
// Table
var Table = (function (_super) {
    __extends(Table, _super);
    function Table(id, data, rowStartIndex, rowMaxLength) {
        _super.call(this, id, data, rowStartIndex, rowMaxLength);
    }
    Table.prototype.createContentFromData = function () {
        var dataIterator = this.data.getIterator();
        while (dataIterator.hasNext()) {
            var row = dataIterator.next();
            this.createRow(row);
        }
    };
    Table.prototype.createRow = function (row) {
        this.htmlContent = this.htmlContent + '<tr id="' + row.getId() + '">';
        _super.prototype.addLegendRow.call(this, row);
        var collectionKeys = row.getKeys();
        for (var i = 0; i < collectionKeys.length; i++) {
            var key = collectionKeys[i];
            var value = row.get(key);
            var itemRenderer = new TextInputItemRenderer('id', value, row.getId(), key);
            var rendererHtml = itemRenderer.getHTML();
            this.htmlContent = this.htmlContent + rendererHtml;
        }
        this.htmlContent = this.htmlContent + '</tr>';
    };
    Table.prototype.createLegendRow = function () {
        this.htmlContent = this.htmlContent + '<tr id="legendRow">';
        this.htmlContent = this.htmlContent + '<th>Aggregate Policy Limit</th>';
        for (var i = this.rowStartIndex; i < this.rowMaxLength; i++) {
            this.htmlContent = this.htmlContent + '<th>' + i + ' y.o.</th>';
        }
        this.htmlContent = this.htmlContent + '</tr>';
    };
    return Table;
}(BaseTable));

console.log("IM TableFactory");
// TableFactory
var TableFactory = (function(){
    return{
        createTable:function(type, tableId, tableData){
            if(type === SCCC_TABLE){
                var table = new Table(tableId, tableData);
                return table.getHTML();
            }
            else if(type === STANDARD_RATES_TABLE){
                var table = new Table(tableId, tableData); // starts from 60 years old
                return table.getHTML();
            }
            else{
                throw new Error('Undefined type "'+type+'"');
            }
        }
    }
})();

console.log("IM ClearTableButton");
// ClearTableButton
var ClearTableButton = function(){
    var view;
    var context;

    function createListener(){
        view.click(function(){
            EventBus.dispatchEvent(CLEAR_TABLE_BUTTON_CLICK, {context:context});
        });
    }

    return{
        init:function(_view, _context){
            context = _context
            if(_view){
                view = _view;
                createListener();
            }
            else{
                console.error('View not set');
            }
        }
    }
};

console.log("IM BaseItemRenderer");
// BaseItemRenderer
var BaseItemRenderer = (function () {
    function BaseItemRenderer(id, data) {
        this.id = id;
        this.data = data;
        if (this.data && this.id) {
            this.getHTML();
        }
        else {
        }
    }
    BaseItemRenderer.prototype.getHTML = function () {
        return 'empty';
    };
    BaseItemRenderer.prototype.clear = function () {
    };
    return BaseItemRenderer;
}());

console.log("IM TextInputItemRenderer");
// TextInputItemRenderer
var TextInputItemRenderer = (function (_super) {
    __extends(TextInputItemRenderer, _super);
    function TextInputItemRenderer(id, data, rowId, columnKey) {
        _super.call(this, id, data);
        this.rowId = rowId;
        this.columnKey = columnKey;
        this.inputId = this.rowId + "_" + this.columnKey;
        this.createInput();
    }
    TextInputItemRenderer.prototype.setState = function (state) {
        if (state == 'normal') {
            this.textInput.removeClass('negativeValue');
        }
        else if ('negative') {
            this.textInput.addClass('negativeValue');
        }
    };
    TextInputItemRenderer.prototype.createInput = function () {
        var convertedValue = this.data;
        if (this.data != -1 && this.data != '-1') {
            convertedValue = parseInt(this.data) / 1000;
        }
        var isNegative = convertedValue < 0;
        this.textInput = jQuery('<input class="tableCeilItemRenderer" type="text" id="' + this.inputId + '" value="' + convertedValue + '" data-rowid="' + this.rowId + '" data-columnkey="' + this.columnKey + '">');
        if (isNegative) {
            this.textInput.addClass('negativeValue');
        }
    };
    TextInputItemRenderer.prototype.getHTML = function () {
        if (this.textInput) {
            return '<td>' + this.textInput.prop('outerHTML') + '</td>';
        }
        else {
            return;
        }
    };
    return TextInputItemRenderer;
}(BaseItemRenderer));

console.log("IM CollectionMetaBox");
// CollectionMetaBox
var CollectionMetaBox = function(){
    var addItemButton;
    var removeItemButton;
    var itemsSelect;
    var itemsDataInput;

    var itemsJsonData;
    var $;
    var itemsCollection;
    var selectedItem;
    var selectedItem;

    var addItemButtonId;
    var removeItemButtonId;
    var selectId;
    var jsonDataInputId;
    var collectionId;
    var type;

    function getAddItemButton(){
        addItemButton = $('#'+addItemButtonId);
    }

    function getRemoveItemButton(){
        removeItemButton = $('#'+removeItemButtonId);
    }
    function getItemsSelect(){
        itemsSelect = $('#'+selectId);
    }
    function addSelectListener(){
        itemsSelect.change(function(){
            var itemId = $(this).val();
            selectedItem = itemsCollection.get(itemId);
        });
    }
    function getItemsDataInput(){
        itemsDataInput = $('#'+jsonDataInputId);
    }

    function getItemsJsonData(){
        itemsJsonData = itemsDataInput.val();
    }

    function parseJsonData(){
        var jsonDecoder = new MapJsonDecoder(itemsJsonData);
        try{
            itemsCollection = jsonDecoder.decode();
        }
        catch(error){
            console.error(error);
            clearInput();
            createNewCollection();
            updateInput();
            return;
        }
    }

    function checkCollection(){
        var collectionSize = itemsCollection.size();
        if(collectionSize==0){
            clearInput();
            createNewCollection();
            updateInput();
            hideRemoveButton();
        }
    }

    function clearSelect(){
        itemsSelect.find('option').remove();
    }

    function updateSelect(){
        clearSelect();
        var collectionIterator = itemsCollection.getIterator();
        while(collectionIterator.hasNext()){
            var collectionItem = collectionIterator.next();
            addItemToSelect(collectionItem);
        }
    }

    function setSelectedValue(selectedValue){
        itemsSelect.val(selectedValue);
    }

    function createNewCollection(){
        itemsCollection = new Map(collectionId);
    }

    function clearInput(){
        itemsDataInput.val('');
    }

    function createAddItemButtonListener(){
        addItemButton.click(function(){
            createAddItemDialog();
        });
    }

    function createRemoveItemButtonListener(){
        removeItemButton.click(function(){
            createRemoveItemDialog();
        });
    }

    function createAddItemDialog(){
        var newItem = prompt("Please enter new "+type+" for company", "0");



        if (newItem != null) {
            onNewItem(newItem);
        }
    }

    function createRemoveItemDialog(){
        var removeConfirmation = confirm("Remove "+selectedItem+" "+type+" ?");
        if (removeConfirmation) {
            onRemoveItem();
        }
    }

    function onRemoveItem(){
        itemsCollection.remove(selectedItem);
        EventBus.dispatchEvent(COLLECTION_ITEM_REMOVED,{type:type, item:selectedItem, total:itemsCollection.size()});

        updateInput();
        updateSelect();
        if(itemsCollection.size()>0){
            selectFirstItem();
        }
        else{
            hideRemoveButton();
        }
    }

    function onNewItem(item){
        var isOnlyNumbers = isOnlyNumbersCheck(item);
        if(!isOnlyNumbers){
            alert('Only numbers require');
            return;
        }
        try{
            itemsCollection.add(item, item);
        }
        catch(error){
            alert(error);
            return;
        }

        EventBus.dispatchEvent(COLLECTION_ITEM_ADDED,{type:type, item:item, total:itemsCollection.size()});

        showRemoveButton();

        updateInput();
        addItemToSelect(item);
        setSelectedValue(item);
        selectedItem = item;
    }

    function isOnlyNumbersCheck(data){
        var reg = /^\d+$/;
        return reg.test(data);
    }

    function updateInput(){
        var collectionJsonEncoder = itemsCollection.getEncoder();
        itemsDataInput.val(collectionJsonEncoder.encode());
    }

    function addItemToSelect(item){
        $('<option value="'+item+'">'+item+'</option>').appendTo(itemsSelect);
    }

    function selectFirstItem(){
        if(itemsCollection.size()>0){
            var keys = itemsCollection.getKeys();

            var firstKey = keys[0];
            selectedItem = itemsCollection.get(firstKey);
        }
        updateSelect();
        setSelectedValue(selectedItem);
    }
    function showRemoveButton(){
        removeItemButton.show();
    }
    function hideRemoveButton(){
        removeItemButton.hide();
    }
    
    function dispatchCollectionChanged(){
        EventBus.dispatchEvent(COLLECTION_CHANGED,{type:type,total:itemsCollection.size()});
    }

    return{
        init:function(_type, _addItemButtonId, _removeItemButtonId, _selectId, _jsonDataInputId, _collectionId){
            $ = jQuery;

            type = _type;
            addItemButtonId = _addItemButtonId;
            removeItemButtonId = _removeItemButtonId;
            selectId = _selectId;
            jsonDataInputId = _jsonDataInputId;
            collectionId = _collectionId;

            getAddItemButton();
            createAddItemButtonListener();

            getRemoveItemButton();
            createRemoveItemButtonListener();

            getItemsDataInput();

            getItemsSelect();
            addSelectListener();

            getItemsJsonData();
            parseJsonData();
            checkCollection();
            updateSelect();
            dispatchCollectionChanged();
            selectFirstItem();
        },
        getValues:function(){
            return itemsCollection.getKeys();
        }
    }
};

console.log("IM RatesMetaBox");
// RatesMetaBox
// TODO Хлам! Полнейшее отсутствие ООП и MVC. НО работает. Желательно нормально переписать.
// TODO В сети добавление лагает. Во время добавления опции выскакивает ошибка дубликации. Причем, дубликации точно не было. Это связано с ошибками в events, которые я недавно редактировал.
var RatesMetaBox = function(){
    var $;
    var addItemButton;
    var itemsDataInput;

    var itemsJsonData;
    var dataProvider;

    var addItemButtonId;
    var jsonDataInputId;
    var collectionId;
    var type;

    var newRateDialog;
    var deductibles;
    var tableView;

    var collectionChangedListener;

    function createCollectionListener(){
        collectionChangedListener = new BenefitsCollectionChangedListener();
        collectionChangedListener.init(onBenefitsCollectionEmpty, onBenefitsCollectionNotEmpty);
    }

    function onBenefitsCollectionEmpty(){
        console.log("RatesMetabox onBenefitsCollectionEmpty");
    }
    function onBenefitsCollectionNotEmpty(){
        console.log("RatesMetabox onBenefitsCollectionNotEmpty");
    }

    function getAddItemButton(){
        addItemButton = $('#'+addItemButtonId);
    }

    function getItemsDataInput(){
        itemsDataInput = $('#'+jsonDataInputId);
    }

    function getItemsJsonData(){
        itemsJsonData = itemsDataInput.val();
    }

    function parseJsonData(){
        var jsonDecoder = new MapJsonDecoder(itemsJsonData);

        console.log("parsing rates "+itemsJsonData);
        try{
            dataProvider = jsonDecoder.decode();
        }
        catch(error){
            onJsonParseError(error);
            return;
        }
    }

    function onJsonParseError(error){
        console.error(error);
        clearInput();
        createNewCollection();
        updateInput();
    }

    function checkCollection(){

        var collectionSizeValid = isCollectionSizeValid();

        if(!collectionSizeValid){
            clearInput();
            createNewCollection();
            updateInput();
        }
    }

    function isCollectionSizeValid(){
        var collectionSize = dataProvider.size();
        if(collectionSize==0){
            return false;
        }
        else{
            return true;
        }
    }

    function createNewCollection(){
        dataProvider = new Map(collectionId);
    }

    function clearInput(){
        itemsDataInput.val('');
    }

    function createAddItemButtonListener(){
        addItemButton.click(function(){
            createAddItemDialog();
        });
    }

    function createRemoveItemButtonListener(){
        EventBus.addEventListener(REMOVE_RATE_REQUEST, onRemoveRateRequest);
    }

    function onNewRate(rateData){
        
        var rateId = 'ageFrom:'+rateData.ageFrom+";ageTill:"+rateData.ageTill+";sccOption:"+rateData.sccOption+";mdr:"+rateData.mdr+";premiumTable:"+rateData.premiumTable+";deductible:"+rateData.deductible;
        rateData.id = rateId;

        var dataValid = new AgeRangeValidator().validate(rateData.ageFrom, rateData.ageTill);

        if(!dataValid){
            alert('Rate validation error. AgesSelection incorrect.');
            return;
        }

        var newRate = createRate(rateId, rateData);
        var rateAdded = addRateToCollection(newRate);

        if(rateAdded){
            updateInput();
            dispatchRateAdded(rateData);
        }
        else{
            console.error("Rate not added");
        }
    }

    function createRate(rateId, rateData){
        var newRate = new Map(rateId);
        newRate.add(AGE_FROM, rateData.ageFrom);
        newRate.add(AGE_TILL, rateData.ageTill);
        newRate.add(STABLE_CHRONIC_CONDITION_OPTION, rateData.sccOption);
        newRate.add(MEDICAL_DECLARATION_REQUIRED, rateData.mdr);
        newRate.add(PREMIUM_TABLE, rateData.premiumTable);
        newRate.add(DEDUCTIBLE, rateData.deductible);
        return newRate;
    }
    function addRateToCollection(rate){
        var rateId = rate.getId();

        try{
            dataProvider.add(rateId, rate);
            return true;
        }
        catch(error){
            alert(error);
            return false;
        }
    }

    function dispatchRateAdded(rateData){
       EventBus.dispatchEvent(ON_RATE_ADDED, rateData);

    }
    function dispatchRateRemoved(rateId){
        EventBus.dispatchEvent(ON_RATE_REMOVED, rateId);
    }

    function addNewRateDialogListener(){
        $('#'+NEW_RATE_DIALOG_OK_BUTTON).on('click',function(){
            var ageFrom = $('#'+RATE_AGE_FROM_SELECT_ID).val();
            var ageTill = $('#'+RATE_AGE_TILL_SELECT_ID).val();
            var sccOption = $('#'+SCCO_SELECT_ID).val();
            var medicalDeclarationRequired = $('#'+MEDICAL_DECLARATION_REQUIRED_SELECT_ID).val();
            var premiumTable = $('#'+PREMIUM_TABLE_SELECT_ID).val();
            var normalDeductible = $('#'+RATE_NORMAL_DEDUCTIBLE_AMOUNT_SELECT_ID).val();

            onNewRate({ageFrom:ageFrom, ageTill:ageTill, sccOption:sccOption, mdr:medicalDeclarationRequired, premiumTable:premiumTable, deductible:normalDeductible});
            closeNewRateDialog();
        });

        $('#'+NEW_RATE_DIALOG_CANCEL_BUTTON).on('click', function(){
            closeNewRateDialog();
        });
    }

    function removeNewRateDialogListener(){
        $('#'+NEW_RATE_DIALOG_OK_BUTTON).off('click');
        $('#'+NEW_RATE_DIALOG_CANCEL_BUTTON).off('click');
    }

    function closeNewRateDialog(){
        removeNewRateDialogListener();
        $('#'+NEW_RATE_DIALOG_CONTENT).dialog("close");
    }

    function createAddItemDialog(){
        newRateDialog = $('#'+NEW_RATE_DIALOG_CONTENT).dialog({modal:true, width:400});
        addNewRateDialogListener();
    }

    function onRemoveRateRequest(eventData){
        var rateId = eventData;
        removeItem(rateId);
    }

    function removeItem(rateId){
        dataProvider.remove(rateId);
        updateInput();
        dispatchRateRemoved(rateId);
    }

    function updateInput(){
        var collectionJsonEncoder = dataProvider.getEncoder();
        itemsDataInput.val(collectionJsonEncoder.encode());
    }

    function updateNormalDeductibleAmountSelect(){
        for(var i=0;i< deductibles.length;i++){
            $('<option value="'+deductibles[i]+'">'+deductibles[i]+'</option>').appendTo('#'+RATE_NORMAL_DEDUCTIBLE_AMOUNT_SELECT_ID);
        }
    }

    function addDeductibleCollectionChangedListener(){
        EventBus.addEventListener(COLLECTION_ITEM_ADDED, onCollectionItemAdded);
        EventBus.addEventListener(COLLECTION_ITEM_REMOVED, onCollectionItemRemoved);
    }

    function onCollectionItemAdded(eventData){
        var itemType = eventData.type;
        if(itemType == DEDUCTIBLE){
            var deductible = eventData.item;
            onDeductibleAdded(deductible);
        }
    }

    function onCollectionItemRemoved(eventData){
        var itemType = eventData.type;
        if(itemType == DEDUCTIBLE){
            var deductible = eventData.item;
            onDeductibleRemoved(deductible);
        }
    }

    function onDeductibleAdded(deductible){
        $('<option value="'+deductible+'">'+deductible+'</option>').appendTo('#'+RATE_NORMAL_DEDUCTIBLE_AMOUNT_SELECT_ID);
    }

    function onDeductibleRemoved(deductible){
        $('#'+RATE_NORMAL_DEDUCTIBLE_AMOUNT_SELECT_ID+" option[value="+deductible+"]").remove();
    }

    function createTableView(){
        tableView = new RatesTableView();
        tableView.init(dataProvider);
    }

    return{
        init:function(_type, _addItemButtonId, _removeItemButtonId, _selectId, _jsonDataInputId, _collectionId, _deductibles){
            $ = jQuery;

            type = _type;
            addItemButtonId = _addItemButtonId;
            jsonDataInputId = _jsonDataInputId;
            collectionId = _collectionId;
            deductibles = _deductibles;

            createCollectionListener();

            getAddItemButton();
            getItemsDataInput();
            getItemsJsonData();
            parseJsonData();
            checkCollection();

            updateNormalDeductibleAmountSelect();
            addDeductibleCollectionChangedListener();

            createTableView();
            createAddItemButtonListener();
            createRemoveItemButtonListener();
        }
    }
};

console.log("IM CreateDeductibleAmountOptionDialog");
// CreateDeductibleAmountOptionDialog
var CreateDeductibleAmountOptionDialog = function(){
    var element;
    var $ = jQuery.noConflict();
    
    var deductiblesSelect;
    var aggregatePolicyLimitSelect;

    var surchargeOrDiscountInput;
    var okButton;
    var cancelButton;

    var ageFromSelect;
    var ageTillSelect;

    return{
        init:function(deductiblesCollection, aggregatePolicyLimitsCollection){
            getOkButton();
            getCancelButton();

            addButtonsListener();

            getAgeFromSelect();
            getAgeTillSelect();

            getSurchargeOrDiscountInput();
            addSurchargeOrDiscountInputListener();

            getDeductiblesSelect();
            updateDeductiblesSelect(deductiblesCollection);

            getAggregatePolicyLimitsSelect();
            updateAggregatePolicyLimitsSelect(aggregatePolicyLimitsCollection);

            createDialog();
            hideDialog();
        },
        show:function(){
            showDialog();
        },
        hide:function(){
            hideDialog();
        },
        deductiblesChanged:function(deductiblesCollection){
            clearDeductiblesSelect();
            updateDeductiblesSelect(deductiblesCollection);
        },
        aggregatePolicyChanged:function(aggregatePolicyLimitsCollection){
            clearAggregatePolicyLimitsSelect();
            updateAggregatePolicyLimitsSelect(aggregatePolicyLimitsCollection);
        }
    }

    function createDialog() {
        element = $('#'+NEW_DEDUCTIBLE_AMOUNT_OPTION_DIALOG_CONTENT).dialog({modal:true, width:400});
    }

    function getAgeTillSelect() {
        ageTillSelect = $('#deductibleAmountOptionAgeTillSelect');
    }

    function getAgeFromSelect() {
        ageFromSelect = $('#deductibleAmountOptionAgeFromSelect');
    }

    function getOkButton() {
        okButton = $('#addDeductibleAmountOptionConfirmButton');
    }
    function getCancelButton() {
        cancelButton = $('#cancelDeductibleAmountOptionConfirmationButton');
    }
    function addButtonsListener() {
        okButton.click(function(){
            onOkButtonClick();
        });
        cancelButton.click(function(){
            hideDialog();
        });
    }

    function onOkButtonClick(){
        var optionId = buildNewOptionId();

        var ageFrom = ageFromSelect.val();
        var ageTill = ageTillSelect.val();

        var dataValid = new AgeRangeValidator().validate(ageFrom, ageTill);

        if(!dataValid){
            alert('AgesSelection incorrect.');
            return;
        }

        var surchOrDiscount = surchargeOrDiscountInput.val();
        var apl = aggregatePolicyLimitSelect.val();
        var deductible = deductiblesSelect.val();

        var newOption = new DeductibleAmountOption();
        newOption.construct(optionId, ageFrom, ageTill, surchOrDiscount, apl, deductible);
        dispatchOnNewOptionCreation(newOption);
        hideDialog();
    }

    function dispatchOnNewOptionCreation(newOptionData) {
        EventBus.dispatchEvent(NEW_DEDUCTIBLE_AMOUNT_OPTION_CREATION, newOptionData);
    }
    
    
    function buildNewOptionId(){
        return 'ageFrom:'+ageFromSelect.val()+";ageTill:"+ageTillSelect.val()+";surchOrDisc:"+surchargeOrDiscountInput.val()+";apl:"+aggregatePolicyLimitSelect.val()+";deductible:"+deductiblesSelect.val();
    }

    function getSurchargeOrDiscountInput(){
        surchargeOrDiscountInput = $('#surchargeOrDiscountInput');
    }

    function addSurchargeOrDiscountInputListener(){
        surchargeOrDiscountInput.on('keypress', function(event, renderer){
            return TextInputUtils.isOnlyNumbersWithDot(event);
        });
        surchargeOrDiscountInput.on('keyup', function(event, renderer){
            var newValue = parseFloat($(this).val());
            if(newValue < -100){
                newValue = -100;
                $(this).val(newValue);
            }
            else if(newValue > 100){
                newValue = 100;
                $(this).val(newValue);
            }
        });
    }

    function getDeductiblesSelect(){
        deductiblesSelect = $('#deductibleAmountOptionSelect');
    }
    function updateDeductiblesSelect(deductiblesCollection){
        for(var i=0; i<deductiblesCollection.length; i++){
            var deductible = deductiblesCollection[i];
            $('<option value="'+deductible+'">'+deductible+'</option>').appendTo(deductiblesSelect);
        }
    }
    function clearDeductiblesSelect(){
        deductiblesSelect.find('option').remove();
    }

    function getAggregatePolicyLimitsSelect(){
        aggregatePolicyLimitSelect = $('#aggregatePolicyLimitSelect');
    }

    function updateAggregatePolicyLimitsSelect(aggregatePolicyLimitsCollection){

        $('<option value="any">any</option>').appendTo(aggregatePolicyLimitSelect);

        for(var i=0; i<aggregatePolicyLimitsCollection.length; i++){
            var aggregatePolicyLimit = aggregatePolicyLimitsCollection[i];
            $('<option value="'+aggregatePolicyLimit+'">'+aggregatePolicyLimit+'</option>').appendTo(aggregatePolicyLimitSelect);
        }
    }
    function clearAggregatePolicyLimitsSelect(){
        aggregatePolicyLimitSelect.find('option').remove();
    }
    
    function hideDialog(){
        element.dialog("close");
    }
    function showDialog(){
        element.dialog("open");
    }
}

console.log("IM DeductibleAmountOptionsView");
// DeductibleAmountOptionsView
var DeductibleAmountOptionsView = function(){
    var addNewOptionButton;
    var newOptionDialog;
    var deductiblesCollection;
    var aggregatePolicyLimitsCollection;
    var dataInput;
    var $ = jQuery.noConflict();

    return{
        init:function(_deductiblesCollection, _aggregatePolicyLimitsCollection){
            getDataInput();
            
            deductiblesCollection = _deductiblesCollection;
            aggregatePolicyLimitsCollection = _aggregatePolicyLimitsCollection;

            createAddNewOptionDataInputDialog();
            createAddNewOptionButton();
        },
        updateDeductibles:function(deductiblesCollection){
            newOptionDialog.deductiblesChanged(deductiblesCollection);
        },
        updateAggregatePolicyLimits:function(aggregatePolicyLimitsCollection){
            newOptionDialog.aggregatePolicyChanged(aggregatePolicyLimitsCollection);
        },
        onEmptyDeductiblesOrAggregatePolicyLimits:function(){
            showError('Benefits or AggregatePolicyLimits empty.');
        },
        showNewOptionDataInput:function(){
            newOptionDialog.show();
        },
        getData:function(){
            sendData();
        },
        setData:function(data){
            dataInput.val(data);
        }
    }

    function showError(errorText) {
        alert(errorText);
    }

    function sendData() {
        EventBus.dispatchEvent(ON_DEDUCTIBLE_AMOUNT_OPTIONS_DATA, dataInput.val());
    }
    
    function getDataInput() {
        dataInput = $('#deductibleAmountOptionsTableEditor');
    }
    
    function createAddNewOptionButton(){
        addNewOptionButton = new AddNewDeductibleAmountOptionButton();
        addNewOptionButton.init();
    }

    function createAddNewOptionDataInputDialog(){
        newOptionDialog = new CreateDeductibleAmountOptionDialog();
        newOptionDialog.init(deductiblesCollection, aggregatePolicyLimitsCollection);
    }
}

console.log("IM DeductibleAmountOptionsTableView");
// DeductibleAmountOptionsTableView
// TODO управление диалогом не должно быть тут но нет времени переписать.
var DeductibleAmountOptionsTableView = function(){
    var table;
    var $ = jQuery.noConflict();
    var dataProvider;
    var rowElementsCollection = new Map('rows');
    var idToRemove;

    return{
        init:function(){
            getTableElement();
        },
        setData:function(data){
            dataProvider = data;
            update();
            createRemoveRowListener();
        },
        onItemAdded:function(option){
            var rowElement = createRowElement(option);
            addRowElement(rowElement);
            addRowElementToCollection(option.getId(), rowElement);
            createRemoveRowListener();
        },
        onItemRemoved:function(option){
            var optionId = option.getId();
            var rowElement = rowElementsCollection.get(optionId);
            rowElementsCollection.remove(optionId);
            removeRowElement(rowElement);
        }
    }

    function showRemoveConfirmationDialog() {
        var dialogContent = buildRemoveConfirmationDialogContent();
        var dynamicDialog = $(dialogContent);

        dynamicDialog.dialog({ title: "Remove deductible amount option confirmation", modal: true, width:400, buttons: [
            { text: "Yes", click: function () {
                //EventBus.dispatchEvent(DEDUCTIBLE_AMOUNT_OPTION_REQUEST, idToRemove);
                dispatchRemoveOptionRequest();
                $(this).dialog("close");
            } },
            { text: "No", click: function () {
                $(this).dialog("close");
            } }
        ]});
    }
    
    function dispatchRemoveOptionRequest(){
        EventBus.dispatchEvent(REMOVE_DEDUCTIBLE_AMOUNT_OPTION_REQUEST, idToRemove);
    }

    function buildRemoveConfirmationDialogContent(){
        var option = dataProvider.get(idToRemove);

        var ageFrom = option.get(AGE_FROM);
        var ageTill = option.get(AGE_TILL);
        var surchargeOrDiscount = option.get(SURCHARGE_OR_DISCOUNT);
        var aggregatePolicyLimit = option.get(AGGREGATE_POLICY_LIMIT);
        var deductible = option.get(DEDUCTIBLE);

        return '<div>Really want to delete DAO with data:<br/>age from:  '+ageFrom+'<br/>age till:  '+ageTill+'<br/>Surcharge or discount: '+surchargeOrDiscount+'<br/>Aggregate policy limit:  '+aggregatePolicyLimit+'<br/>deductible:  '+deductible+'</div>';
    }

    function createRemoveRowListener() {
        removeRemoveRowListener();
        $('.removeRowButtonTableItemRenderer[collectiontype='+DEDUCTIBLE_AMOUNT_OPTION+']').on('click', function(){
            idToRemove = $(this).attr('id');
            showRemoveConfirmationDialog();
        });
    }

    function removeRemoveRowListener() {
        $('.removeRowButtonTableItemRenderer[collectiontype='+DEDUCTIBLE_AMOUNT_OPTION+']').off('click');
    }
    
    function getTableElement() {
        table = $('#deductibleAmountOptionsTable');
    }

    function update(){
        var collectionIterator = dataProvider.getIterator();
        while(collectionIterator.hasNext()){
            var rowData = collectionIterator.next();
            var rowElement = createRowElement(rowData);
            addRowElement(rowElement);
            addRowElementToCollection(rowData.getId(), rowElement);
        }
    }

    function addRowElement(rowElement){
        rowElement.appendTo(table);
    }
    function removeRowElement(rowElement){
        rowElement.remove();
    }
    function addRowElementToCollection(rowId, rowElement){
        rowElementsCollection.add(rowId, rowElement);
    }

    function createRowElement(data){
        var id = data.getId();
        var ageFrom = data.get(AGE_FROM);
        var ageTill = data.get(AGE_TILL);

        var surchargeOrDiscount = data.get(SURCHARGE_OR_DISCOUNT);

        if(surchargeOrDiscount == 0){
            surchargeOrDiscount = 'Use Rate Table';
        }
        else{
            surchargeOrDiscount = surchargeOrDiscount+" %"
        }

        var aggregatePolicyLimit = data.get(AGGREGATE_POLICY_LIMIT);

        if(aggregatePolicyLimit==-1){
            aggregatePolicyLimit = 'any';
        }
        else{
            aggregatePolicyLimit = aggregatePolicyLimit+" $";
        }

        var deductible = data.get(DEDUCTIBLE);
        deductible = deductible+" $";

        var formattedAgeRange = new AgeRangeFormatter().format(ageFrom, ageTill);

        return $('<tr id="'+id+'"><td class="fullwidth centered"><input data-type="'+DEDUCTIBLE_AMOUNT_OPTION+'" collectiontype= "'+DEDUCTIBLE_AMOUNT_OPTION+'" class="removeRowButtonTableItemRenderer" type="button" id="'+id+'" value="Remove"></td><td class="fullwidth centered">'+deductible+'</td><td class="fullwidth centered">'+surchargeOrDiscount+'</td><td class="fullwidth centered">'+aggregatePolicyLimit+'</td><td class="fullwidth centered">'+formattedAgeRange+'</td></tr>');
    }
}

console.log("IM DeductibleAmountOptionsModel");
// DeductibleAmountOptionsModel
var DeductibleAmountOptionsModel = function(){
    var view;
    var options;
    var dataProvider;

    return{
        init:function(_view){
            view = _view;
            view.getData();
        },
        onNewOptionRequest:function(deductiblesSize, aggregatePolicyLimitsSize){
            if(deductiblesSize == 0 || aggregatePolicyLimitsSize == 0){
                view.onEmptyDeductiblesOrAggregatePolicyLimits();
            }
            else{
                view.showNewOptionDataInput();
            }
        },
        onDeductiblesChanged:function(deductiblesCollection){
            view.updateDeductibles(deductiblesCollection);
        },
        onAggregatePolicyLimitsChanged:function(aggregatePolicyLimitsCollection){
            view.updateAggregatePolicyLimits(aggregatePolicyLimitsCollection);
        },
        onOptionAdded:function(optionData){
            return onNewOption(optionData);
        },
        removeOption:function(optionId){
            var option = removeOption(optionId);
            return option;
        },
        setData:function(collection){
            dataProvider = collection;
            updateViewData();
        }
    }

    function removeOption(optionId) {
        var option = dataProvider.get(optionId);
        dataProvider.remove(optionId);
        updateViewData();
        
        return option;
    }

    function onNewOption(optionData){
        var optionId = optionData.getId();
        var option = createOption(optionId, optionData);

        var optionExists = dataProvider.has(optionId);
        if(!optionExists){
            dataProvider.add(optionId, option);
            updateViewData();
            return true;
        }
        else{
            alert("Deductible amount option already exists.");
            return false;
        }
    }

    function createOption(id, optionData){
        var option = new Map(id);
        option.add(AGE_FROM, optionData.getAgeFrom());
        option.add(AGE_TILL, optionData.getAgeTill());
        option.add(SURCHARGE_OR_DISCOUNT, optionData.getSurchargeOrDiscount());
        option.add(AGGREGATE_POLICY_LIMIT, optionData.getAggregatePolicyLimit());
        option.add(DEDUCTIBLE, optionData.getDeductible());
        return option;
    }
    
    function updateViewData(){
        var dataProviderJson = buildDataProviderJson();
        view.setData(dataProviderJson);
    }

    function createNewCollection(){
        dataProvider = new Map('deductibleAmountOptions');
    }

    function buildDataProviderJson(){
        var collectionJsonEncoder = dataProvider.getEncoder();
        return collectionJsonEncoder.encode();
    }
};

console.log("IM DeductibleAmountOptionsTableModel");
// DeductibleAmountOptionsTableModel
var DeductibleAmountOptionsTableModel = function(){
    var view;
    var dataProvider;
    
    
    return{
        init:function(_view){
            view = _view;
        },
        setData:function(collection){
            view.setData(collection);
        },
        onOptionAdded:function(option){
            view.onItemAdded(option);
        },
        onOptionRemoved:function(option){
            view.onItemRemoved(option);
        }
    }
}

console.log("IM DeductibleAmountOptionsController");
// DeductibleAmountOptionsController
var DeductibleAmountOptionsController = function(){

    var deductiblesCollection;
    var aggregatePolicyLimitsCollection;
    var view;
    var model;
    var tableModel;
    var tableView;

    var dataProvider;
    
    return{
        init:function(_deductiblesCollection, _aggregatePolicyLimitsCollection){

            createTableView();
            createTableModel();

            createListeners();
            
            deductiblesCollection = _deductiblesCollection;
            aggregatePolicyLimitsCollection = _aggregatePolicyLimitsCollection;
            createView();
            createModel();


        },
        updateDeductibles:function(_deductiblesCollection){
            deductiblesCollection = _deductiblesCollection;
            model.onDeductiblesChanged(deductiblesCollection);
        },
        updateAggregatePolicyLimits:function(_aggregatePolicyLimitsCollection){
            aggregatePolicyLimitsCollection = _aggregatePolicyLimitsCollection;
            model.onAggregatePolicyLimitsChanged(aggregatePolicyLimitsCollection);
        }
    }

    function createModel(){
        model = new DeductibleAmountOptionsModel();
        model.init(view);
    }
    function createView(){
        view = new DeductibleAmountOptionsView();
        view.init(deductiblesCollection, aggregatePolicyLimitsCollection);
    }

    function createTableView() {
        tableView = new DeductibleAmountOptionsTableView();
        tableView.init();
    }

    function createTableModel() {
        tableModel = new DeductibleAmountOptionsTableModel();
        tableModel.init(tableView);
    }

    function onDataHandler(eventData) {
        dataProvider = parseJsonData(eventData);
        
        if(!dataProvider){
            createNewCollection();
        }
        model.setData(dataProvider);
        tableModel.setData(dataProvider);
    }

    function parseJsonData(data){
        var jsonDecoder = new MapJsonDecoder(data);
        var parsedData;
        try{
            parsedData = jsonDecoder.decode();
        }
        catch(error){
            logError('Deductible amount options json parse error. Data was: '+ data+'  New collection created.');
            return;
        }
        return parsedData;
    }

    function parseDeductibleAmountOptionToMap(deductibleAmountOption){
        var map = new Map(deductibleAmountOption.getId());
        map.add(AGE_FROM, deductibleAmountOption.getAgeFrom());
        map.add(AGE_TILL, deductibleAmountOption.getAgeTill());
        map.add(AGGREGATE_POLICY_LIMIT, deductibleAmountOption.getAggregatePolicyLimit());
        map.add(SURCHARGE_OR_DISCOUNT, deductibleAmountOption.getSurchargeOrDiscount());
        map.add(DEDUCTIBLE, deductibleAmountOption.getDeductible());

        return map;
    }

    function logError(errorText){
        console.error(errorText);
    }

    function createNewDataProvider(){
        createNewCollection();
    }
    
    function createNewCollection(){
        dataProvider = new Map('deductibleAmountOptions');
    }

    function createListeners(){
        EventBus.addEventListener(NEW_DEDUCTIBLE_AMOUNT_OPTION_REQUEST, onNewOptionRequestHandler);
        EventBus.addEventListener(NEW_DEDUCTIBLE_AMOUNT_OPTION_CREATION, onNewOptionCreationHandler);
        EventBus.addEventListener(ON_DEDUCTIBLE_AMOUNT_OPTIONS_DATA, onDataHandler);
        EventBus.addEventListener(REMOVE_DEDUCTIBLE_AMOUNT_OPTION_REQUEST, onRemoveDeductibleAmountOptionRequestHandler);
    }

    function onRemoveDeductibleAmountOptionRequestHandler(eventData){
        var removedOption = model.removeOption(eventData);
        tableModel.onOptionRemoved(removedOption);
    }

    function onNewOptionRequestHandler(){
        var deductiblesSize = deductiblesCollection.length;
        var aggregatePolicyLimitsSize = aggregatePolicyLimitsCollection.length;
        model.onNewOptionRequest(deductiblesSize, aggregatePolicyLimitsSize);
    }

    function onNewOptionCreationHandler(eventData) {
        var optionAdded = model.onOptionAdded(eventData);

        if(optionAdded){
            var newOption = parseDeductibleAmountOptionToMap(eventData);
            tableModel.onOptionAdded(newOption);
        }
        else{
            console.log("option didn't add");
        }
    }
}
console.log("IM AddNewDeductibleAmountOptionButton");
// AddNewDeductibleAmountOptionButton
var AddNewDeductibleAmountOptionButton = function(){
    var element;
    var $ = jQuery.noConflict();

    return{
        init:function(){
            getElement();
            createListener();
        }
    }

    function getElement(){
        element = $('#addDeductibleAmountOptionButton');
    }

    function createListener(){
        element.on('click', function(){
            dispatchClickedEvent();
        });
    }
    
    function dispatchClickedEvent(){
        EventBus.dispatchEvent(NEW_DEDUCTIBLE_AMOUNT_OPTION_REQUEST);
    }
}

console.log("IM DeductibleAmountOptionsMetabox");
// DeductibleAmountOptionsMetabox
var DeductibleAmountOptionsMetabox = function(){
    var controller;
    
    return{
        init:function(deductibleCollection, benefitsCollection){
            createController(deductibleCollection, benefitsCollection);
        },
        updateDeductiblesCollection:function(deductiblesCollection){
            controller.updateDeductibles(deductiblesCollection);
        },
        updateAggregatePolicyLimitsCollection:function(aggregatePolicyLimitsCollection){
            controller.updateAggregatePolicyLimits(aggregatePolicyLimitsCollection);
        }
    }

    function createController(deductibleCollection, aggregatePolicyLimitsCollection){
        controller = new DeductibleAmountOptionsController();
        controller.init(deductibleCollection, aggregatePolicyLimitsCollection);
    }
};

console.log("IM DeductibleAmountOption");
// DeductibleAmountOption
var DeductibleAmountOption = function(){
    var id;
    var ageFrom;
    var ageTill;
    var surchargeOrDiscount;
    var aggregatePolicyLimit;
    var deductible;

    return{
        construct:function(_id, _ageFrom, _ageTill, _surchargeOrDiscount, _aggregatePolicyLimit, _deductible){
            id = _id;
            ageFrom = _ageFrom;
            ageTill = _ageTill;
            surchargeOrDiscount = _surchargeOrDiscount;
            aggregatePolicyLimit = _aggregatePolicyLimit;
            deductible = _deductible;
        },
        getId:function(){
            return id;
        },
        getAgeFrom:function(){
            return ageFrom;
        },
        getAgeTill:function(){
            return ageTill;
        },
        getSurchargeOrDiscount:function(){
            return surchargeOrDiscount;
        },
        getAggregatePolicyLimit:function(){
            return aggregatePolicyLimit;
        },
        getDeductible:function(){
            return deductible;
        }
    }
}

console.log("IM FamilyRateMaxAgeMetabox");
// FamilyRateMaxAgeMetabox
var FamilyRateMaxAgeMetabox = function(){

    var $ = jQuery.noConflict();
    var input;

    function getInput(){
        input = $('#familyRateMaxAgeMetaBoxEditor');
    }

    function addInputListener(){
        input.on('keypress', function(event, renderer){
            return TextInputUtils.isOnlyNumbersWithDot(event);
        });
        input.on('keyup', function(event, renderer){
            var newValue = parseFloat($(this).val());
            if(newValue > 100){
                newValue = 100;
                $(this).val(newValue);
            }
            else if(newValue < 0){
                newValue = 0;
                $(this).val(newValue);
            }
        });
    }

    return{
        init:function(){
            console.log("FRMAMetabox");
            getInput();
            addInputListener();
        }
    }
}

console.log("IM TableController");
// TableController
var TableController = function(){
    var $;
    var dataProviderJsonContainerId;
    var dataProviderJsonContainer;
    var dataProviderJson;
    var dataProvider;
    var tableContainerId;
    var tableContainer;
    var clearTableButton;
    var tableId = "tableId";
    var context;
    var tableRowMaxLength = 100;

    function getDataProviderJson(){
        dataProviderJsonContainer = $('#'+dataProviderJsonContainerId);
        dataProviderJson = dataProviderJsonContainer.val();
    }

    function createTableRendererListener(){
        var tableRendererListener = new TableRendererListener();
        tableRendererListener.init(tableContainer, context);
    }

    function onTableValueChanged(rowId, columnKey, newValue){
        var dataProviderRow = dataProvider.get(rowId);
        dataProviderRow.update(columnKey, Math.round(parseFloat(newValue)*1000));
        dataProviderJson = MapUtils.getMapJson(dataProvider);
        updateDataProviderJsonContainer(dataProviderJson);
    }

    function updateDataProviderJsonContainer(data){
        dataProviderJsonContainer.val(data);
    }

    function clear(){
        MapUtils.setAllValuesToZero(dataProvider);
        dataProviderJson = MapUtils.getMapJson(dataProvider);
        updateDataProviderJsonContainer(dataProviderJson);
        updateTable();
        createTableRendererListener();
    }

    function updateTable(){
        tableContainer.html('');
        var tableHTML = TableFactory.createTable(context, tableId, dataProvider);
        tableContainer.html(tableHTML);
    }

    function createEmptyMap(){
        dataProvider = CreateEmptyTableDataProvider.create(context);
    }

    function updateTableContainerHTML(html){
        tableContainer.html(html);
    }
    function createTableHTML(context, tableId, dataProvider){
        return TableFactory.createTable(context, tableId, dataProvider);
    }

    function onCollectionItemAdded(eventData){
        var itemType = eventData.type;
        if(itemType==BENEFIT_AMOUNT){
            var benefitAmount = eventData.item;
            var newRow = new Map(benefitAmount);

            if(context == SCCC_TABLE){
                fillMapWithZeroValues(newRow, 0, tableRowMaxLength);
            }
            else if(context == STANDARD_RATES_TABLE){
                fillMapWithZeroValues(newRow, 0, tableRowMaxLength);
            }
            dataProvider.add(benefitAmount, newRow);
            onDataProviderChanged();
        }
    }

    function onCollectionItemRemoved(eventData){
        var itemType = eventData.type;
        if(itemType==BENEFIT_AMOUNT){
            var benefitAmount = eventData.item;
            dataProvider.remove(benefitAmount);
            onDataProviderChanged();
        }
    }

    function onDataProviderChanged(){
        dataProviderJson = MapUtils.getMapJson(dataProvider);
        updateDataProviderJsonContainer(dataProviderJson);

        var tableHTML = createTableHTML(context, tableId, dataProvider);
        updateTableContainerHTML(tableHTML);
        createTableRendererListener();
    }

    function onNewTableRowAdded(){
        EventBus.dispatchEvent(NEW_TABLE_ROW_ADDED);
    }

    function fillMapWithZeroValues(map, startIndex, rowMaxLength){
        console.log("fillMapWithZeroValues");
        for(var i=startIndex; i<rowMaxLength; i++){
            map.add(i, 0);
        }
    }

    function addCollectionListeners(){
        EventBus.addEventListener(COLLECTION_ITEM_ADDED, onCollectionItemAdded);
        EventBus.addEventListener(COLLECTION_ITEM_REMOVED, onCollectionItemRemoved);
    }

    return{
        init:function(_context, _tableId, _dpJsonContainerId, _tableContainerId){
            $ = jQuery;
            context = _context;
            tableId = _tableId;
            dataProviderJsonContainerId = _dpJsonContainerId;
            tableContainerId = _tableContainerId;
            tableContainer =  $('#'+tableContainerId);

            getDataProviderJson();
            addCollectionListeners();

            if(dataProviderJson){
                dataProvider = MapUtils.createMapFromJson(dataProviderJson);
            }
            else{
                createEmptyMap();
                dataProviderJson = MapUtils.getMapJson(dataProvider);
                updateDataProviderJsonContainer(dataProviderJson);
            }

            var tableHTML = createTableHTML(context, tableId, dataProvider);

            updateTableContainerHTML(tableHTML);
            createTableRendererListener();
        },
        valueChanged:function(rowId, columnKey, newValue){
            onTableValueChanged(rowId, columnKey, newValue);
        },
        clear:function(){
            clear();
        }
    }
};

console.log("IM RatesTableView");
// RatesTableView
var RatesTableView = function(){
    var dataProvider;
    var table;
    var $;
    var rowsCollection = new Map('rows');
    var idToRemove;

    function addListeners(){
        addItemsCollectionChangedListeners();
        addRemoveRowButtonListener();
    }

    function addItemsCollectionChangedListeners(){
        EventBus.addEventListener(ON_RATE_ADDED, onRateAddedHandler);
        EventBus.addEventListener(ON_RATE_REMOVED, onRateRemovedHandler);
    }
    function removeItemsCollectionChangedListeners(){
        EventBus.removeEventListener(ON_RATE_ADDED, onRateAddedHandler);
        EventBus.removeEventListener(ON_RATE_REMOVED, onRateRemovedHandler);
    }

    function onRateAddedHandler(eventData){
        addRate(eventData);
    }
    function onRateRemovedHandler(eventData){
        var rateId = eventData;
        removeRate(rateId);
    }

    function addRate(rateData){
        var id = rateData.id;
        var rowElement = createRowElement(rateData);
        addRowElementToTable(rowElement);
        addRowToCollection(id, rowElement);
        addRemoveRowButtonListener();
    }

    function addRowElementToTable(rowElement){
        rowElement.appendTo(table);
    }
    function addRowToCollection(id, rowElement){
        rowsCollection.add(id, rowElement);
    }
    function removeRowFromCollection(id){
        rowsCollection.remove(id);
    }

    function removeRate(id){
        var rowToRemove = rowsCollection.get(id);
        removeElement(rowToRemove);
        removeRowFromCollection(id);
    }

    function addRemoveRowButtonListener(){
        removeRemoveButtonListener();

        $('.removeRowButtonTableItemRenderer[collectiontype='+RATE+']').on('click', function(){
            idToRemove = $(this).attr('id');
            showRemoveRateConfirmationDialog();
        });
    }

    function removeRemoveButtonListener(){
        $('.removeRowButtonTableItemRenderer[collectiontype='+RATE+']').off('click');
    }

    function buildRemoveRateConfirmationDialogContent(){
        console.log("buildRemoveRateConfirmationDialogContent");
        console.log("idToRemove: "+idToRemove);
        var rate = dataProvider.get(idToRemove);

        var ageFrom = rate.get(AGE_FROM);
        var ageTill = rate.get(AGE_TILL);
        var mdr = rate.get(MEDICAL_DECLARATION_REQUIRED);
        var premiumTable = rate.get(PREMIUM_TABLE);
        var deductible = rate.get(DEDUCTIBLE);

        if(mdr == 0){
            mdr = 'No';
        }
        else{
            mdr = 'Yes';
        }

        return '<div>Really want to delete rate with data:<br/>age from:  '+ageFrom+'<br/>age till:  '+ageTill+'<br/>Medical declaration required: '+mdr+'<br/>premium table:  '+premiumTable+'<br/>deductible:  '+deductible+'</div>';
    }

    function showRemoveRateConfirmationDialog(){
        var dialogContent = buildRemoveRateConfirmationDialogContent();
        var dynamicDialog = $(dialogContent);

        dynamicDialog.dialog({ title: "Remove rate confirmation", modal: true, buttons: [
            { text: "Yes", click: function () {
                EventBus.dispatchEvent(REMOVE_RATE_REQUEST, idToRemove);
                $(this).dialog("close");
            } },
            { text: "No", click: function () {
                $(this).dialog("close");
            } }
        ]});
    }

    function removeElement(element){
        element.remove();
    }

    function createRowElement(rateData){
        var id = rateData.id;
        var ageFrom = rateData.ageFrom;
        var ageTill = rateData.ageTill;
        var sccOption = rateData.sccOption;
        var mdr = rateData.mdr;
        
        var premiumTable = rateData.premiumTable;
        var deductible = rateData.deductible;

        var formattedAgeRange = new AgeRangeFormatter().format(ageFrom, ageTill);

        if(mdr == 0){
            mdr = "No";
        }
        else{
            mdr = "Yes";
        }

        if(premiumTable == SCCC_MAP_ID){
            premiumTable = 'STABLE CHRONIC CONDITION';
        }
        else{
            premiumTable = 'STANDARD RATES';
        }

        if(sccOption == 1){
            sccOption = 'Yes';
        }
        else if(sccOption == 0){
            sccOption = 'No';
        }
        else if(sccOption == -1){
            sccOption = 'Not available';
        }

        return $('<tr id="'+id+'"><td class="fullwidth centered"><input data-type="rate" collectiontype="'+RATE+'" class="removeRowButtonTableItemRenderer" type="button" id="'+id+'" value="Remove"></td><td class="fullwidth centered">'+formattedAgeRange+'</td><td class="fullwidth centered">'+sccOption+'</td><td class="fullwidth centered">'+mdr+'</td><td class="fullwidth centered">'+premiumTable+'</td><td class="fullwidth centered">'+deductible+'</td></tr>');
    }

    function getTable(){
        table = $('#'+RATES_TABLE_ID);
    }

    function updateTable(){
        var keys = dataProvider.getKeys();

        for(var i=0; i<keys.length; i++){
            var rateMap = dataProvider.get(keys[i]);
            var rateData = {id:rateMap.getId(), ageFrom:rateMap.get(AGE_FROM), ageTill:rateMap.get(AGE_TILL), sccOption:rateMap.get(STABLE_CHRONIC_CONDITION_OPTION), mdr:rateMap.get(MEDICAL_DECLARATION_REQUIRED), premiumTable:rateMap.get(PREMIUM_TABLE), deductible:rateMap.get(DEDUCTIBLE)};
            addRate(rateData);
        }
    }
    
    function hideTable(){
        table.hide();
    }
    function showTable(){
        table.show();
    }

    return{
        init:function(_dataProvider){
            $ = jQuery.noConflict();
            dataProvider = _dataProvider;
            getTable();
            updateTable();
            addListeners();
        },
        hide:function(){
            hideTable();
        },
        show:function(){
            showTable();
        }
    }
};

console.log("IM AdminAppInit - plane js. No class");
// AdminAppInit
var $ = jQuery.noConflict();
$(document).ready(function($) {
    var clearScccTableButton;
    var clearStandardRatesTableButton;

    var scccTableController = new TableController();
    scccTableController.init(SCCC_TABLE, "scccTable", "scccTable_editor", "scccTableContainer");

    var standardRatesTableController = new TableController();
    standardRatesTableController.init(STANDARD_RATES_TABLE, "standardRatesTable", "standardRatesTable_editor", "standardRatesTableContainer");

    var benefitsMetabox;
    var deductibleAmountsMetabox;
    var ratesMetabox;
    var deductibleAmountOptionsMetabox;

    function createClearTableButtons(){
        clearScccTableButton = new ClearTableButton();
        clearScccTableButton.init($('#clearScccTableButton'), SCCC_TABLE);

        clearStandardRatesTableButton = new ClearTableButton();
        clearStandardRatesTableButton.init($('#clearStandardRatesTableButton'), STANDARD_RATES_TABLE);
    }

    function addTableRendererListener(){
        EventBus.removeEventListener(RENDERER_VALUE_CHANGED, rendererValueChangedHandler);
        EventBus.addEventListener(RENDERER_VALUE_CHANGED, rendererValueChangedHandler);
    }
    function addClearTableButtonListener(){
        EventBus.addEventListener(CLEAR_TABLE_BUTTON_CLICK, clearTableButtonClickHandler);
    }

    function onNewTableRowAdded(){
        addTableRendererListener();
    }

    // TODO перенести это в контроллер таблицы
    function rendererValueChangedHandler(eventData){
        console.log('value changed');
        var elementContext = eventData.context;
        var rowId = eventData.rowId;
        var columnKey = eventData.columnKey;
        var newValue = eventData.newValue;

        if(elementContext === SCCC_TABLE){
            scccTableController.valueChanged(rowId, columnKey, newValue);
        }
        else if(elementContext === STANDARD_RATES_TABLE){
            standardRatesTableController.valueChanged(rowId, columnKey, newValue);
        }
        else{
            console.error('Unknown context.');
        }
    }

    function clearTableButtonClickHandler(eventData){
        var elementContext = eventData.context;
        if(elementContext === SCCC_TABLE){
            scccTableController.clear();
        }
        else if(elementContext === STANDARD_RATES_TABLE){
            standardRatesTableController.clear();
        }
        else{
            console.error('Unknown context.');
        }
    }

    function createBenefitsMetaBox(){
        console.log("createBenefitsMetaBox");
        benefitsMetabox = new CollectionMetaBox();
        benefitsMetabox.init(BENEFIT_AMOUNT, 'addBenefitButton', 'removeBenefitButton', 'benefitsSelect', 'benefitsEditorInput', 'benefits');
    }

    function createDeductibleAmountsMetaBox(){
        deductibleAmountsMetabox = new CollectionMetaBox();
        deductibleAmountsMetabox.init(DEDUCTIBLE, 'addDeductibleButton', 'removeDeductibleButton', 'deductiblesSelect', 'deductiblesEditorInput', 'deductibles');
    }

    function createRatesMetaBox(){
        var companyDeductibles = deductibleAmountsMetabox.getValues();
        ratesMetabox = new RatesMetaBox();
        ratesMetabox.init(RATE, 'addRateButton', 'removeRateButton', 'rateTableSelect', RATE_TABLE_EDITOR_ID, 'rates', companyDeductibles);
    }

    function createDeductibleAmountOptionsMetaBox(){
        var companyDeductibles = deductibleAmountsMetabox.getValues();
        var companyAggregatePolicyLimits = benefitsMetabox.getValues();
        deductibleAmountOptionsMetabox = new DeductibleAmountOptionsMetabox();
        deductibleAmountOptionsMetabox.init(companyDeductibles, companyAggregatePolicyLimits);

        EventBus.addEventListener(COLLECTION_ITEM_ADDED, onCollectionItemChanged);
        EventBus.addEventListener(COLLECTION_ITEM_REMOVED, onCollectionItemChanged);
    }

    function createFamilyRateMaxAgeMetabox(){
        var familyRateMaxAgeMetabox = new FamilyRateMaxAgeMetabox();
        familyRateMaxAgeMetabox.init();
    }

    function createQuestionary(){
        var questionaryAdminInit = new QuestionaryAdminInitor();
        questionaryAdminInit.create();
    }
    
    function onCollectionItemChanged(eventData){
        var itemType = eventData.type;
        if(itemType == DEDUCTIBLE){
            deductibleAmountOptionsMetabox.updateDeductiblesCollection(deductibleAmountsMetabox.getValues());
        }
        else if(itemType == BENEFIT_AMOUNT){
            deductibleAmountOptionsMetabox.updateAggregatePolicyLimitsCollection(benefitsMetabox.getValues());
        }
    }

    createClearTableButtons();
    addClearTableButtonListener();
    addTableRendererListener();

    createBenefitsMetaBox();
    createDeductibleAmountsMetaBox();

    createRatesMetaBox();
    createDeductibleAmountOptionsMetaBox();

    createFamilyRateMaxAgeMetabox();

    createQuestionary();

    EventBus.addEventListener(NEW_TABLE_ROW_ADDED, onNewTableRowAdded);
});

console.log("IM QuoteEditAdminView");
// QuoteEditAdminView
var QuoteEditAdminView = (function () {
    function QuoteEditAdminView() {
        this.$j = jQuery.noConflict();
        var quoteData = this.$j("#quoteData").text();
        try {
            this.quotedata = JSON.parse(quoteData);
            console.log("quote data: ", this.quotedata);
        }
        catch (error) {
            console.error("quoteData is not json");
            return;
        }
        this.updateChildren();
        this.createStateDropDownListener();
        this.persons = this.getPersons();
        this.iteratePersons();
    }
    QuoteEditAdminView.prototype.getPersons = function () {
        var personsData = this.$j("#personsData").html();
        var personsParser = new PersonCollectionParser(personsData);
        return personsParser.parse();
    };
    QuoteEditAdminView.prototype.iteratePersons = function () {
        var iterator = this.persons.getIterator();
        while (iterator.hasNext()) {
            var person = iterator.next();
            new QuotePersonAdminView(person, this.$j("#personsContainer"));
        }
    };
    QuoteEditAdminView.prototype.updateChildren = function () {
        this.$j("#benefitContainer").text(StringUtils.formatMoneyInt(this.quotedata.benefit));
        this.$j("#deductibleContainer").text(StringUtils.formatMoneyInt(this.quotedata.deductible));
        this.$j("#costContainer").text(StringUtils.formatDivisionalMoney(this.quotedata.cost));
        this.$j("#periodContainer").text(this.quotedata.period + " day(s)");
        this.$j("#startDateContainer").text(this.quotedata.startDate);
        this.$j("#finishDateContainer").text(this.quotedata.finishDate);
    };
    QuoteEditAdminView.prototype.createStateDropDownListener = function () {
        var _this = this;
        this.$j("#stateDropDown").change(function () { return _this.onStateDropDownChanged(); });
    };
    QuoteEditAdminView.prototype.onStateDropDownChanged = function () {
        console.log("onStateDropDownChanged to " + this.$j("#stateDropDown").val());
        this.$j("#applicationStateEditor").val(this.$j("#stateDropDown").val());
    };
    return QuoteEditAdminView;
}());

console.log("IM TableRendererListener");
// TableRendererListener
var TableRendererListener = function(){
    var $;
    var context;
    
    function onTableRendererValueChanged(rowId, columnKey, newValue)
    {
        EventBus.dispatchEvent(RENDERER_VALUE_CHANGED, {rowId:rowId, columnKey:columnKey, newValue:newValue, context:context});
    }

    function onlyNumbersWithDot(e) {
        var charCode;
        if (e.keyCode > 0) {
            charCode = e.which || e.keyCode;
        }
        else if (typeof (e.charCode) != "undefined") {
            charCode = e.which || e.keyCode;
        }
        if (charCode == 46 || charCode == 45)
            return true;
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }

    function updateRendererState(element, value){
        if(value < 0){
            element.addClass('negativeValue');
        }
        else{
            element.removeClass('negativeValue');
        }
    }

    return{
        init:function(tableContainer, _context){
            $ = jQuery;
            context = _context;

            tableContainer.find('.tableCeilItemRenderer').on('keypress', function(event, renderer){
                return TextInputUtils.isOnlyNumbersWithDot(event);
            });
            tableContainer.find('.tableCeilItemRenderer').on('keyup', function(event, renderer){
                var newValue = parseFloat($(this).val());
                if(newValue < -1){
                    newValue = -1;
                    $(this).val(newValue);
                }
                updateRendererState($(this), newValue);
                onTableRendererValueChanged($(this).data('rowid'), $(this).data('columnkey'), $(this).val());
            });
        }
    }
}

console.log("IM PersonCollectionParser");
// PersonCollectionParser
var PersonCollectionParser = (function () {
    function PersonCollectionParser(data) {
        this.$j = jQuery.noConflict();
        this.data = data;
    }
    PersonCollectionParser.prototype.parse = function () {
        var personsData = unescape(this.data);
        var mapJsonDecoder = new MapJsonDecoder(personsData);
        var decodedMap = mapJsonDecoder.decode();
        return this.parsePersons(decodedMap);
    };
    PersonCollectionParser.prototype.parsePersons = function (source) {
        var collection = new QuotePersonCollection();
        var iterator = source.getIterator();
        while (iterator.hasNext()) {
            var personData = iterator.next();
            collection.add(this.parsePerson(personData));
        }
        return collection;
    };
    PersonCollectionParser.prototype.parsePerson = function (personData) {
        var age = personData._age;
        var firstName = personData._firstName;
        var lastName = personData._lastName;
        var gender = personData._gender;
        var relationship = personData._relationship;
        var questions = personData._questions;
        var birthday = personData._birthday;
        var complete = personData._complete;
        var useSCCC = personData._useSCCC;
        var period = personData._period;
        var medicalDeclarationRequired = personData._medicalDeclarationRequired;
        var questionsData = this.parseQuestions(questions);
        var person = new QuotePerson(age, firstName, lastName, gender, relationship, birthday, questionsData);
        person.setIsComplete(complete);
        person.setIsUseSCCC(useSCCC);
        person.setPeriod(period);
        person.setMedicalDeclarationRequired(medicalDeclarationRequired);
        return person;
    };
    PersonCollectionParser.prototype.parseQuestions = function (questions) {
        var questionsData = "";
        console.log("parse questions ", questions);
        var isEmpty = this.$j.isEmptyObject(questions);
        if (!isEmpty) {
            questions.collection.items.id = "questions";
            questions.collection.items.type = "Map";
            questionsData = JSON.stringify(questions.collection.items);
        }
        return questionsData;
    };
    return PersonCollectionParser;
}());

console.log("IM QuotePerson");
// QuotePerson
var QuotePerson = (function () {
    function QuotePerson(age, firstName, lastName, gender, relationship, birthday, questions) {
        this._medicalDeclarationRequired = false;
        this._complete = false;
        this._confirmed = false;
        this._useSCCC = false;
        this._age = age;
        this._firstName = firstName;
        this._lastName = lastName;
        this._gender = gender;
        this._relationship = relationship;
        this._birthday = birthday;
        this._questions = questions;
        if (!this._firstName) {
            this._firstName = "";
        }
        if (!this._lastName) {
            this._lastName = "";
        }
        if (!this._gender) {
            this._gender = "";
        }
        if (!this._relationship) {
            this._relationship = "";
        }
        if (!this._birthday) {
            this._birthday = "";
        }
        if (!this._questions) {
            this._questions = {};
        }
    }
    QuotePerson.prototype.getLastName = function () {
        return this._lastName;
    };
    QuotePerson.prototype.setLastName = function (value) {
        this._lastName = value;
    };
    QuotePerson.prototype.getFirstName = function () {
        return this._firstName;
    };
    QuotePerson.prototype.setFirstName = function (value) {
        this._firstName = value;
    };
    QuotePerson.prototype.getAge = function () {
        return this._age;
    };
    QuotePerson.prototype.setAge = function (value) {
        this._age = value;
    };
    QuotePerson.prototype.getRelationship = function () {
        return this._relationship;
    };
    QuotePerson.prototype.setRelationship = function (value) {
        this._relationship = value;
    };
    QuotePerson.prototype.getBirthday = function () {
        return this._birthday;
    };
    QuotePerson.prototype.setBirthday = function (value) {
        this._birthday = value;
    };
    QuotePerson.prototype.getGender = function () {
        return this._gender;
    };
    QuotePerson.prototype.setGender = function (value) {
        this._gender = value;
    };
    QuotePerson.prototype.getQuestions = function () {
        return this._questions;
    };
    QuotePerson.prototype.setQuestions = function (value) {
        this._questions = value;
    };
    QuotePerson.prototype.setIsComplete = function (value) {
        this._complete = value;
    };
    QuotePerson.prototype.getIsComplete = function () {
        return this._complete;
    };
    QuotePerson.prototype.getMedicalDeclarationRequired = function () {
        return this._medicalDeclarationRequired;
    };
    QuotePerson.prototype.setMedicalDeclarationRequired = function (value) {
        this._medicalDeclarationRequired = value;
    };
    QuotePerson.prototype.getIsUseSCCC = function () {
        return this._useSCCC;
    };
    QuotePerson.prototype.setIsUseSCCC = function (value) {
        this._useSCCC = value;
    };
    QuotePerson.prototype.getIsConfirmed = function () {
        return this._confirmed;
    };
    QuotePerson.prototype.setIsConfirmed = function (value) {
        this._confirmed = value;
    };
    QuotePerson.prototype.getPeriod = function () {
        return this._period;
    };
    QuotePerson.prototype.setPeriod = function (value) {
        this._period = value;
    };
    return QuotePerson;
}());

console.log("IM QuotePersonCollection");
// QuotePersonCollection
var QuotePersonCollection = (function () {
    function QuotePersonCollection() {
        this.createCollection();
    }
    QuotePersonCollection.prototype.createCollection = function () {
        this.collection = new Map("persons");
    };
    QuotePersonCollection.prototype.add = function (person) {
        var randomKey = "_" + Math.round(Math.random() * 100000);
        this.collection.add(randomKey, person);
    };
    QuotePersonCollection.prototype.getAges = function () {
        var ages = new Array();
        var iterator = this.collection.getIterator();
        while (iterator.hasNext()) {
            var person = iterator.next();
            var personAge = person.getAge();
            ages.push(personAge.toString());
        }
        return ages;
    };
    QuotePersonCollection.prototype.size = function () {
        return this.collection.size();
    };
    QuotePersonCollection.prototype.getIterator = function () {
        return this.collection.getIterator();
    };
    QuotePersonCollection.prototype.setData = function (data) {
        this.collection = this.parseData(data);
    };
    QuotePersonCollection.prototype.getData = function () {
        return this.collection.getEncoder().encode();
    };
    QuotePersonCollection.prototype.getPersonByAge = function (age) {
        var personsIterator = this.collection.getIterator();
        while (personsIterator.hasNext()) {
            var person = personsIterator.next();
            if (person.getAge() == age) {
                return person;
            }
        }
    };
    QuotePersonCollection.prototype.parseData = function (data) {
        var jsonDecoder = new MapJsonDecoder(data);
        return jsonDecoder.decode();
    };
    return QuotePersonCollection;
}());

console.log("IM QuotePersonAdminView");
// QuotePersonAdminView
var QuotePersonAdminView = (function () {
    function QuotePersonAdminView(person, container) {
        this.$j = jQuery.noConflict();
        this.person = person;
        this.container = container;
        this.createChildren();
    }
    QuotePersonAdminView.prototype.createChildren = function () {
        this.createPersonDataView();
        this.createQuestionsContainer();
        this.createQuestionsView();
    };
    QuotePersonAdminView.prototype.createPersonDataView = function () {
        var personIsPrimary = this.person.getRelationship() == PRIMARY;
        console.log("person is primary: " + personIsPrimary);
        var personRelationship = this.person.getRelationship();
        console.log("person " + this.person.getFirstName() + "  relationship: " + this.person.getRelationship());
        if (personIsPrimary) {
            this.personContainer = this.$j("<div><h2 style='text-align: center; width: 100%; background-color: #d9edf7; text-align: center;'><span class='glyphicon glyphicon-user' aria-hidden='true'></span>  <b>Primary Insured</b></h2></div>");
        }
        else {
            this.personContainer = this.$j("<div><h2 style='text-align: center; width: 100%; background-color: #d9edf7; text-align: center;'><span class='glyphicon glyphicon-user' aria-hidden='true'></span>  <b>Insured (" + personRelationship + ")</b></h2></div>");
        }
        var table = this.$j("<table style='font-size:1.8em;'><tbody></tbody></table>");
        var tRow1 = this.$j("<tr></tr>");
        var td1Legend = this.$j("<td>First name:</td>");
        var td1Value = this.$j("<td>" + this.person.getFirstName() + "</td>");
        var td2Legend = this.$j("<td>Last name:</td>");
        var td2Value = this.$j("<td>" + this.person.getLastName() + "</td>");
        tRow1.append(td1Legend);
        tRow1.append(td1Value);
        tRow1.append(td2Legend);
        tRow1.append(td2Value);
        var tRow2 = this.$j("<tr></tr>");
        var td1Legend = this.$j("<td>Birthday:</td>");
        var td1Value = this.$j("<td>" + this.person.getBirthday() + "</td>");
        var td2Legend = this.$j("<td>Age:</td>");
        var td2Value = this.$j("<td>" + this.person.getAge() + "</td>");
        tRow2.append(td1Legend);
        tRow2.append(td1Value);
        tRow2.append(td2Legend);
        tRow2.append(td2Value);
        var tRow3 = this.$j("<tr></tr>");
        var td1Legend = this.$j("<td>Gender:</td>");
        var td1Value = this.$j("<td>" + this.person.getGender() + "</td>");
        //var td2Legend:any = this.$j("<td>Medical declaration required:</td>");
        //var td2Value:any = this.$j("<td>"+this.person.getMedicalDeclarationRequired()+"</td>");
        tRow3.append(td1Legend);
        tRow3.append(td1Value);
        //tRow3.append(td2Legend);
        //tRow3.append(td2Value);
        table.append(tRow1);
        table.append(tRow2);
        table.append(tRow3);
        if (!personIsPrimary) {
            var tRow4 = this.$j("<tr></tr>");
            var td1Legend = this.$j("<td>Relationship:</td>");
            var td1Value = this.$j("<td>" + this.person.getRelationship() + "</td>");
            tRow4.append(td1Legend);
            tRow4.append(td1Value);
            table.append(tRow4);
        }
        this.personContainer.append(table);
        this.container.append(this.personContainer);
    };
    QuotePersonAdminView.prototype.createQuestionsView = function () {
        var questions = this.person.getQuestions();
        new FrontendUserAnswers(questions, this.questionsContainerId);
    };
    QuotePersonAdminView.prototype.createQuestionsContainer = function () {
        this.questionsContainerId = "questions_" + Math.round(Math.random() * 100000);
        this.questionsContainer = this.$j("<div id='" + this.questionsContainerId + "'><h1 style='width: 100%; background-color: #dff0d8; text-align: center;'>Medical declaration questions</h1></div>");
        this.personContainer.append(this.questionsContainer);
    };
    return QuotePersonAdminView;
}());

console.log("IM QuotePersonAdminView");
// QuotePersonAdminView

