///<reference path="../../Cookie.ts"/>
///<reference path="../../../libs/jqueryTS/jquery.d.ts"/>
var PersonDetailsPageTesting = (function () {
    function PersonDetailsPageTesting() {
        this.$j = jQuery.noConflict();
        this.getCompany();
        //console.log("company:",this.getCompanyData());
    }
    PersonDetailsPageTesting.prototype.getCompany = function () {
        var companyDecodedData = this.$j("#companyData").text();
        companyDecodedData = decodeURIComponent(companyDecodedData);
        console.log("companyDecodedData", companyDecodedData);
        var json = JSON.parse(companyDecodedData);
        console.log("JSON:", json);
        var companyData = StringUtils.parseURI(companyDecodedData);
        return companyData;
    };
    return PersonDetailsPageTesting;
}());
//# sourceMappingURL=PersonDetailsPageTesting.js.map