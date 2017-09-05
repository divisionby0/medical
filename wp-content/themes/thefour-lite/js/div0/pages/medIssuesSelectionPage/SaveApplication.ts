///<reference path="../../utils/QuoteSaver.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/utils/Cookie.ts"/>
///<reference path="../QuoteId.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/admin/quote/persons/QuotePersonCollection.ts"/>
///<reference path="../applicationFinishPage/ApplicationType.ts"/>
declare var StringUtils:any;
class SaveApplication {

    private personsData:string;
    private companyData:any;
    private quoteDataToSave:any;
    private quoteId:QuoteId;
    private persons:QuotePersonCollection;
    private $j:any;
    
    
    constructor(companyData:any, quoteId:QuoteId, personsData:string, persons:QuotePersonCollection){
        console.log("saving application quoteId=",quoteId.getId()," tempId:",quoteId.getTempValue());
        this.$j = jQuery.noConflict();
        this.companyData = companyData;
        this.quoteId = quoteId;
        this.personsData = personsData;
        this.persons = persons;
        
        var quoteSaver:QuoteSaver = new QuoteSaver();

        var period:string = Cookie.getPeriod();

        var encodedPlanData:string = Cookie.getCompanyPlan();
        var planData:any = StringUtils.parseURI(encodedPlanData);

        var encodedFormData:string = Cookie.getUserInputFormData();
        var formData:any = StringUtils.parseURI(encodedFormData);

        var startDate:string = formData.startDate.date;
        var finishDate:string = formData.finishDate.date;

        startDate = startDate.split("+")[0];
        finishDate = finishDate.split("+")[0];

        var quoteData:string = JSON.stringify({company:this.companyData.companyName, benefit:this.companyData.benefit, period:period, deductible:planData.deductible, cost:planData.cost, startDate:startDate, finishDate:finishDate});

        var numPersons:number = this.persons.size();

        var countryOfOrigin:string = Cookie.getCountryOfOrigin();
        var visitorType:string = Cookie.getVisitorType();

        var arrivalDate:string = Cookie.getArrivalDate();
        var sponsorFirstName:string = Cookie.getSponsorFirstName();
        var sponsorLastName:string = Cookie.getSponsorLastName();

        var beneficiaryFirstName:string = Cookie.getBeneficiaryFirstName();
        var beneficiaryLastName:string = Cookie.getBeneficiaryLastName();

        var address:string = Cookie.getAddress();

        var city:string = Cookie.getSponsorCity();
        var province:string = Cookie.getSponsorProvince();
        var postalCode:string = Cookie.getSponsorPostalCode();

        var email:string = Cookie.getEmail();
        var phone:string = Cookie.getPhone();

        var applicationType:string = Cookie.getApplicationType();

        if(!applicationType){
            applicationType = ApplicationType.HAS_MEDICAL_ISSUES;
        }
        
        console.log("application type: "+applicationType);

        this.quoteDataToSave = {
            quoteId:this.quoteId.getId(),
            companyName:this.companyData.companyName,
            quoteData:quoteData,
            persons:this.personsData,
            period:period,
            numPersons:numPersons,
            startDate:startDate,
            finishDate:finishDate,
            countryOfOrigin:countryOfOrigin,
            visitorType:visitorType,
            arrivalDate:arrivalDate,
            sponsorFirstName:sponsorFirstName,
            sponsorLastName:sponsorLastName,
            beneficiaryFirstName:beneficiaryFirstName,
            beneficiaryLastName:beneficiaryLastName,
            address:address,
            city:city,
            province:province,
            postalCode:postalCode,
            email:email,
            phone:phone,
            type:applicationType,
            state:"IN_PROGRESS"
        };

        this.$j("#quoteData").val(JSON.stringify(this.quoteDataToSave));

        quoteSaver.save(this.quoteDataToSave);
    }
}
