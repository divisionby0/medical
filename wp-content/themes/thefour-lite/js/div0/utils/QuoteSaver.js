///<reference path="../../libs/jqueryTS/jquery.d.ts"/>
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
            'cardType': quoteData.cardType,
            'cardHolderName': quoteData.cardHolderName,
            'cardExpDate': quoteData.cardExpDate,
            'cardNumber': quoteData.cardNumber,
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
            'quoteId': quoteData.quoteId
        };
        //console.log("saving ",dataToSave);
        this.$j.post(ajaxurl, dataToSave, function (response) { return _this.onQuoteSaveComplete(response); });
    };
    QuoteSaver.prototype.onQuoteSaveComplete = function (response) {
        //alert("ApplicationSaver response "+response);
    };
    return QuoteSaver;
}());
//# sourceMappingURL=QuoteSaver.js.map