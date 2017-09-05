///<reference path="../../utils/QuoteSaver.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/utils/Cookie.ts"/>
///<reference path="../QuoteId.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/admin/quote/persons/QuotePersonCollection.ts"/>
///<reference path="../applicationFinishPage/ApplicationType.ts"/>
var SaveApplication = (function () {
    function SaveApplication(companyData, quoteId, personsData, persons) {
        console.log("saving application quoteId=", quoteId.getId(), " tempId:", quoteId.getTempValue());
        this.$j = jQuery.noConflict();
        this.companyData = companyData;
        this.quoteId = quoteId;
        this.personsData = personsData;
        this.persons = persons;
        var quoteSaver = new QuoteSaver();
        var period = Cookie.getPeriod();
        var encodedPlanData = Cookie.getCompanyPlan();
        var planData = StringUtils.parseURI(encodedPlanData);
        var encodedFormData = Cookie.getUserInputFormData();
        var formData = StringUtils.parseURI(encodedFormData);
        var startDate = formData.startDate.date;
        var finishDate = formData.finishDate.date;
        startDate = startDate.split("+")[0];
        finishDate = finishDate.split("+")[0];
        var quoteData = JSON.stringify({ company: this.companyData.companyName, benefit: this.companyData.benefit, period: period, deductible: planData.deductible, cost: planData.cost, startDate: startDate, finishDate: finishDate });
        var numPersons = this.persons.size();
        var countryOfOrigin = Cookie.getCountryOfOrigin();
        var visitorType = Cookie.getVisitorType();
        var arrivalDate = Cookie.getArrivalDate();
        var sponsorFirstName = Cookie.getSponsorFirstName();
        var sponsorLastName = Cookie.getSponsorLastName();
        var beneficiaryFirstName = Cookie.getBeneficiaryFirstName();
        var beneficiaryLastName = Cookie.getBeneficiaryLastName();
        var address = Cookie.getAddress();
        var city = Cookie.getSponsorCity();
        var province = Cookie.getSponsorProvince();
        var postalCode = Cookie.getSponsorPostalCode();
        var email = Cookie.getEmail();
        var phone = Cookie.getPhone();
        var applicationType = Cookie.getApplicationType();
        if (!applicationType) {
            applicationType = ApplicationType.HAS_MEDICAL_ISSUES;
        }
        console.log("application type: " + applicationType);
        this.quoteDataToSave = {
            quoteId: this.quoteId.getId(),
            companyName: this.companyData.companyName,
            quoteData: quoteData,
            persons: this.personsData,
            period: period,
            numPersons: numPersons,
            startDate: startDate,
            finishDate: finishDate,
            countryOfOrigin: countryOfOrigin,
            visitorType: visitorType,
            arrivalDate: arrivalDate,
            sponsorFirstName: sponsorFirstName,
            sponsorLastName: sponsorLastName,
            beneficiaryFirstName: beneficiaryFirstName,
            beneficiaryLastName: beneficiaryLastName,
            address: address,
            city: city,
            province: province,
            postalCode: postalCode,
            email: email,
            phone: phone,
            type: applicationType,
            state: "IN_PROGRESS"
        };
        this.$j("#quoteData").val(JSON.stringify(this.quoteDataToSave));
        quoteSaver.save(this.quoteDataToSave);
    }
    return SaveApplication;
}());
//# sourceMappingURL=SaveApplication.js.map