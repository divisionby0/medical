///<reference path="../../utils/NavigatorUtil.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/utils/Cookie.ts"/>
///<reference path="../BasePage.ts"/>
///<reference path="../QuoteId.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/events/EventBus.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/db/DB.ts"/>
///<reference path="SaveApplication.ts"/>
///<reference path="../applicationFinishPage/ApplicationType.ts"/>
declare var DateUtils:any;
declare function escape(s:string): string;
declare function unescape(s:string): string;
class MedIssuesSelectionPage extends BasePage{

    private finishButton:any;
    private prevButton:any;

    private prevPage:string = "person-details";
    private nextPage:string = "finish-application";
    private nextPageHasMedicalIssues:string = "finish-application-has-medical-issues";

    private selectedOption:number;
    private applicationId:string;
    private payNowButton:any; // name and class wspsc_add_cart_submit
    private cartCheckoutButton:any; // name and class wp_cart_checkout_button
    private companyData:any;
    private quoteId:QuoteId;
    private personsData:string;

    constructor(){
        super();
        //console.log("MedIssuesSelectionPage");
    }

    public create():void{
        /*
        this.persons = this.getPersons();
        this.companyData = this.getCompany();
        this.createQuoteId();
        this.loadQuotePersonsData();
        console.log("QuoteId: id=",this.quoteId.getId(),"tempValue:",this.quoteId.getTempValue());
        */

        this.finishButton = this.$j("#finishButton");
        this.prevButton = this.$j("#prevButton");
        this.payNowButton = this.$j(".wspsc_add_cart_submit");
        this.cartCheckoutButton = this.$j(".wspsc_add_cart_submit");
        
        //console.log("pay now button: ",this.payNowButton);
        
        this.createButtonsListener();
        this.createRadioGroupListener();
        this.updateApplicationType("NORMAL");
        //this.decorateApplicationIdWithCurrentDate();
        //this.saveApplicationId();
        this.updateApplicationIdContainer();
        this.updatePayPalCostInput();
    }

    private loadQuotePersonsData():void {
        EventBus.addEventListener("personsDataLoadComplete", (data)=>this.personsDataLoadComplete(data));
        DB.loadPersons(this.quoteId.getTempValue());
    }

    private personsDataLoadComplete(data:string):void {
        EventBus.removeEventListener("personsDataLoadComplete", (data)=>this.personsDataLoadComplete(data));
        this.onPersonDataLoadComplete(data);
    }
    private onPersonDataLoadComplete(data:string):void {
        var dataIsValid:boolean = this.validatePersonsLoadedData(data);

        if(dataIsValid){
            this.personsData = data;
            this.onPersonsDataValid();
        }
        else{
            console.error("persons loaded data not valid. data: "+data);
        }
    }

    private onPersonsDataValid():void {
        console.log("persons data is valid. Data is: ",this.personsData);
        //this.$j("#quoteDate").text(this.$j("#quoteData").val());

        this.createPayNowButtonListener();
        this.createCartCheckoutButtonListener();
        
        //this.saveApplication();
        //this.onApplicationSaved();
        //this.deletePersonsTempData();
    }

    private saveApplication():void{
        new SaveApplication(this.companyData, this.quoteId, this.personsData, this.persons);
    }

    private createRadioGroupListener():void {
        this.$j('input[type=radio][name=medIssuesRadioGroup]').change((event)=>this.onRadioGroupChanged(event));
    }

    private onRadioGroupChanged(event:any):void {
        this.selectedOption = parseInt(this.$j(event.target).val());
        this.onOptionChanged();
    }

    private onOptionChanged():void {
        if(this.selectedOption == 0){
            this.finishButton.hide();
            this.$j("#paypalButtonContainer").show();
            this.updateApplicationType(ApplicationType.NORMAL);
            //this.updateApplicationType("NORMAL");
        }
        else{
            this.finishButton.show();
            this.$j("#paypalButtonContainer").hide();
            this.finishButton.text("Finish");
            //this.updateApplicationType("MEDICAL_ISSUES");
            this.updateApplicationType(ApplicationType.HAS_MEDICAL_ISSUES);
        }
    }

    private createButtonsListener():void {
        this.finishButton.click(()=>this.onFinishButtonClick());
        this.prevButton.click(()=>this.onPrevButtonClick());
    }

    private onFinishButtonClick():void{
        if(this.selectedOption == 1){
            this.navigateToNextPage();
        }
    }

    private onPrevButtonClick():void{
        this.navigateToPrevPage();
    }

    private navigateToPrevPage():void {
        NavigatorUtil.navigateTo(this.prevPage);
    }
    private navigateToNextPage():void {
        NavigatorUtil.navigateTo(this.nextPageHasMedicalIssues);
    }

    private updateApplicationIdContainer():void {
        this.$j("#applicationIdContainer").text(Cookie.getQuoteId());
    }

    private getCompany():any{
        var companyDecodedData:string = Cookie.getSelectedCompanyData();
        var companyData:any = StringUtils.parseURI(companyDecodedData);
        return companyData;
    }

    private updateApplicationType(type:string):void {
        console.log("updateApplicationType "+type);
        Cookie.setApplicationType(type);
    }

    /*
    private createQuoteId():void{
        this.quoteId = new QuoteId();
    }
    */


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

    private createPayNowButtonListener():void {
        this.payNowButton.click((event:any)=>this.onPayNowButtonClicked(event));
    }
    
    private onPayNowButtonClicked(event:any):any{
        console.log("PAY NOW OR cart checkout BUTTON CLICKED");
        this.saveApplication();
        //return false;
        //event.stopPropagation();
        //return ReadForm(this, true);
    }

    private createCartCheckoutButtonListener():void {
        console.log("createCartCheckoutButtonListener");

        this.cartCheckoutButton
            .unbind('click') // takes care of jQuery-bound click events
            .attr('onclick', '') // clears `onclick` attributes in the HTML
            .each(function() { // reset `onclick` event handlers
                this.onclick = null;
            });
        //this.cartCheckoutButton.click((event:any)=>this.onPayNowButtonClicked(event));
    }
    
    private updatePayPalCostInput():void{
        var totalPremium:string = this.$j("input[name='totalPremiumValueInput']").val();
        console.log("totalPremium: "+totalPremium);
        this.$j("input[name='price']").val(totalPremium);
    }
    
}
