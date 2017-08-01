///<reference path="../BasePage.ts"/>
///<reference path="../../utils/QuoteSaver.ts"/>
///<reference path="../cardDetailsPage/Card.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/utils/Cookie.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/db/DB.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/events/EventBus.ts"/>
///<reference path="../sendResultEmailPage/SendResultEmailPage.ts"/>
///<reference path="../QuoteId.ts"/>
declare function escape(s:string): string;
declare function unescape(s:string): string;
declare var DateUtils:any;
class ApplicationFinishPage extends BasePage{
    private companyData:any;
    private quoteId:QuoteId;
    private personsData:string;
    private quoteDataToSave:any;

    constructor(){
        super();
        console.log("Im application finish page");
    }
    
    public create():void{
        this.persons = this.getPersons();
        this.companyData = this.getCompany();
        this.createQuoteId();
        this.loadQuotePersonsData();
    }
    
    private createQuoteId():void{
        console.log("app finish page creating quote id");
        var savedAppId:string = this.$j("#appIdContainer").val();
        console.log("outer app id: "+savedAppId);
        this.quoteId = new QuoteId(savedAppId);
    }
    
    private onApplicationSaved():void{
        var resultEmailPage:SendResultEmailPage = new SendResultEmailPage();
        resultEmailPage.create();
    }

    private saveApplication():void {
        var quoteSaver:QuoteSaver = new QuoteSaver();

        var period:string = Cookie.getPeriod();

        var encodedPlanData:string = Cookie.getCompanyPlan();
        var planData:any = StringUtils.parseURI(encodedPlanData);

        var encodedFormData:string = Cookie.getUserInputFormData();
        var formData:any = StringUtils.parseURI(encodedFormData);
        
        console.log("formData:",formData);

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
    
    private onPersonsDataValid():void {

        console.log("persons data is valid. Data is: ",this.personsData);
        
        //this.decorateQuoteIdWithCurrentDate();
        this.saveApplication();

        this.$j("#quoteDate").text(this.$j("#quoteData").val());

        this.onApplicationSaved();

        this.deletePersonsTempData();
    }

    private deletePersonsTempData():void {
        DB.deletePersons(this.quoteId.getTempValue());
    }

    private getCompany():any{
        var companyDecodedData:string = Cookie.getSelectedCompanyData();
        var companyData:any = StringUtils.parseURI(companyDecodedData);
        return companyData;
    }

    private loadQuotePersonsData():void {
        EventBus.addEventListener("personsDataLoadComplete", (data)=>this.personsDataLoadComplete(data));
        //DB.loadPersons(this.quoteId.getTempValue());
        console.log("loading persons by app temp id "+this.quoteId.getTempValue());
        DB.loadPersons(this.quoteId.getTempValue());
    }

    private personsDataLoadComplete(data:string):void {
        EventBus.removeEventListener("personsDataLoadComplete", (data)=>this.personsDataLoadComplete(data));
        this.onPersonDataLoadComplete(data);
    }

    private onPersonDataLoadComplete(data:string):void {
        console.log("persons data: ",data);
        var dataIsValid:boolean = this.validatePersonsLoadedData(data);
        
        if(dataIsValid){
            this.personsData = data;
            this.onPersonsDataValid();
        }
        else{
            console.error("persons loaded data not valid. data: "+data);
        }
    }

    private validatePersonsLoadedData(data:string):boolean{
        var decodedData:string = unescape(data);

        try{
            var dataJson:any = JSON.parse(decodedData);
            return true;
        }
        catch(error){
            return false;
        }
    }
}
