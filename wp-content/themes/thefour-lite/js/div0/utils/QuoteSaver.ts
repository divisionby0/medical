///<reference path="../../libs/jqueryTS/jquery.d.ts"/>
declare var ajaxurl;
class QuoteSaver{
    
    private $j:any;
    
    constructor(){
        this.$j = jQuery.noConflict();
    }
    
    //public save(companyName:string, data:string, persons:string, period:string, numPersons:number, startDate:string, finishDate:string):void{
    public save(quoteData:any):void{
        var dataToSave:any = {'action':'saveApplication',
            'companyName':quoteData.companyName, 
            'quoteData':quoteData.quoteData, 
            'persons':quoteData.persons, 
            'period':quoteData.period, 
            'numPersons':quoteData.numPersons, 
            'startDate':quoteData.startDate, 
            'finishDate':quoteData.finishDate,
            'cardType':quoteData.cardType,
            'cardHolderName':quoteData.cardHolderName,
            'cardExpDate':quoteData.cardExpDate,
            'cardNumber':quoteData.cardNumber,
            'countryOfOrigin':quoteData.countryOfOrigin,
            'visitorType':quoteData.visitorType,
            'arrivalDate':quoteData.arrivalDate,
            'sponsorFirstName':quoteData.sponsorFirstName,
            'sponsorLastName':quoteData.sponsorLastName,
            'beneficiaryFirstName':quoteData.beneficiaryFirstName,
            'beneficiaryLastName':quoteData.beneficiaryLastName,
            'address':quoteData.address,
            'email':quoteData.email,
            'phone':quoteData.phone,
            'city':quoteData.city,
            'province':quoteData.province,
            'postalCode':quoteData.postalCode,
            'quoteId':quoteData.quoteId,
            'applicationType':quoteData.type
        };

        this.$j.post(ajaxurl, dataToSave, (response) => this.onQuoteSaveComplete(response));
    }
    
    private onQuoteSaveComplete(response):void{
        //alert("ApplicationSaver response "+response);
    }
}
