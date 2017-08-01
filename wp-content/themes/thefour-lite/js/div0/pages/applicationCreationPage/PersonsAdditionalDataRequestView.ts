///<reference path="../../../../../../plugins/medical_ensurance/js/utils/Cookie.ts"/>
///<reference path="../../utils/validators/PostalCodeValidator.ts"/>
declare function unescape(s:string):string;
declare var jQuery:any;
declare var moment:any;
class PersonsAdditionalDataRequestView{
    // TODO отрефакторить для того чтобы разделить сущности
    private countryOfOriginControl:any;
    private visitorTypeControl:any;

    private savedCountryOfOrigin:string;
    private savedVisitorType:string;
    private savedArrivalDate:string;

    private savedSponsorFirstName:string;
    private savedSponsorLastName:string;

    private savedBeneficiaryFirstName:string;
    private savedBeneficiaryRelationship:string;

    private savedAddress:string;
    private savedCity:string;
    private savedProvince:string;
    private savedPostalCode:string;
    private savedEmail:string;
    private savedPhone:string;

    private sponsorFirstNameControl:any;
    private sponsorLastNameControl:any;

    private beneficiaryFirstNameControl:any;
    private beneficiaryRelationship:any;

    private addressControl:any;
    private cityControl:any;
    private provinceControl:any;
    private postalCodeControl:any;
    private emailControl:any;
    private phoneControl:any;

    private arrivalDateControl:any;

    private emailErrorMessageElement:any;
    private phoneErrorMessageElement:any;

    private $j:any;
    
    constructor(){
        this.$j = jQuery.noConflict();
        this.createChildren();
        this.createListeners();

        //this.loadData();
        //this.updateControls();

        if(!this.savedCountryOfOrigin){
            this.saveCountryOfOrigin();
        }
        if(!this.savedVisitorType){
            this.saveVisitorType();
        }
        if(!this.savedProvince){
            this.saveProvince();
        }
        if(!this.savedArrivalDate){
            this.savedArrivalDate = this.arrivalDateControl.val();
            this.saveArrivalDate(this.savedArrivalDate);
        }
    }
    
    public validate():any{
        var isValid:boolean = true;
        var errorText:string;

        var arrivalDate:string = this.arrivalDateControl.val();
        var sponsorFirstName:string = this.sponsorFirstNameControl.val();
        var sponsorLastName:string = this.sponsorLastNameControl.val();
        var address:string = this.addressControl.val();

        var city:string = this.cityControl.val();
        var postalCode:string = this.postalCodeControl.val();

        var email:string = this.emailControl.val();
        var emailIsValid:boolean = this.validateEmail(email);

        var phone:string = this.phoneControl.val();
        var phoneIsValid:boolean = this.validatePhone(phone);

        var postalCodeIsValid:boolean = PostalCodeValidator.validate(postalCode);

        if(!arrivalDate || arrivalDate.length < 3){
            errorText = "Arrival date invalid";
            isValid = false;
        }
        /*
        if(!sponsorFirstName || sponsorFirstName.length < 3){
            errorText = "Sponsor first name invalid";
            isValid = false;
        }
        if(!sponsorLastName || sponsorLastName.length < 3){
            errorText = "Sponsor last name invalid";
            isValid = false;
        }
        */
        if(!address || address.length < 3){
            errorText = "Canadian address invalid";
            isValid = false;
        }

        if(!city || city.length < 3){
            errorText = "City invalid";
            isValid = false;
        }
        if(!postalCodeIsValid){
            errorText = "Postal code invalid";
            isValid = false;
        }

        if(!emailIsValid){
            errorText = "Email invalid";
            isValid = false;
        }
        if(!phoneIsValid){
            errorText = "Phone invalid";
            isValid = false;
        }
        return {isValid:isValid, errorText:errorText};
    }

    private loadData():void{
        this.savedCountryOfOrigin = Cookie.getCountryOfOrigin();
        this.savedVisitorType = Cookie.getVisitorType();
        this.savedArrivalDate = Cookie.getArrivalDate();

        this.savedSponsorFirstName = Cookie.getSponsorFirstName();
        this.savedSponsorLastName = Cookie.getSponsorLastName();

        this.savedBeneficiaryFirstName = Cookie.getBeneficiaryFirstName();
        this.savedBeneficiaryRelationship = Cookie.getBeneficiaryLastName();

        this.savedAddress = Cookie.getAddress();

        this.savedProvince = Cookie.getSponsorProvince();
        this.savedCity = Cookie.getSponsorCity();
        this.savedPostalCode= Cookie.getSponsorPostalCode();

        this.savedEmail = Cookie.getEmail();
        this.savedPhone = Cookie.getPhone();
    }

    private createChildren():void {
        this.countryOfOriginControl = this.$j("#countriesSelect");
        this.visitorTypeControl = this.$j("#visitorTypeSelect");
        this.arrivalDateControl = this.$j("#arrivalDateInput");

        this.sponsorFirstNameControl = this.$j("#sponsorFirstName");
        this.sponsorLastNameControl = this.$j("#sponsorLastName");

        this.beneficiaryFirstNameControl = this.$j("#beneficiaryFirstName");
        this.beneficiaryRelationship = this.$j("#beneficiaryRelationship");

        this.addressControl = this.$j("#streetInput");

        this.cityControl = this.$j("#cityInput");
        this.provinceControl = this.$j("#provinceSelect");
        this.postalCodeControl = this.$j("#postalCodeSelect");

        this.emailControl = this.$j("#emailInput");
        this.phoneControl = this.$j("#phoneInput");

        this.emailErrorMessageElement = this.$j("#emailErrorMessage");
        this.phoneErrorMessageElement = this.$j("#phoneErrorMessage");

        this.createArrivalDatePicker();
    }

    private createArrivalDatePicker():void{
        console.log("createArrivalDatePicker");
        console.log("default date: ", new Date());
        this.arrivalDateControl.datepicker({
            changeYear: true,
            yearRange:'-1:+10',
            defaultDate: new Date(),
            onSelect: (dateText)=>this.onArrivalDateSelected(dateText)
        });
    }
    
    private updateControls():void{

        console.log("update controls this.savedArrivalDate="+this.savedArrivalDate);
        if(this.savedCountryOfOrigin){
            this.countryOfOriginControl.val(unescape(this.savedCountryOfOrigin));
        }

        if(this.savedVisitorType){
            this.visitorTypeControl.val(unescape(this.savedVisitorType));
        }

        if(this.savedArrivalDate){
            this.arrivalDateControl.val(this.savedArrivalDate);
        }
        if(this.savedSponsorFirstName){
            this.sponsorFirstNameControl.val(unescape(this.savedSponsorFirstName));
        }
        if(this.savedSponsorLastName){
            this.sponsorLastNameControl.val(unescape(this.savedSponsorLastName));
        }
        if(this.savedBeneficiaryFirstName){
            this.beneficiaryFirstNameControl.val(unescape(this.savedBeneficiaryFirstName));
        }
        if(this.savedBeneficiaryRelationship){
            this.beneficiaryRelationship.val(unescape(this.savedBeneficiaryRelationship));
        }
        if(this.savedAddress){
            this.addressControl.val(unescape(this.savedAddress));
        }
        if(this.savedProvince){
            this.provinceControl.val(unescape(this.savedProvince));
        }
        if(this.savedEmail){
            this.emailControl.val(unescape(this.savedEmail));
        }
        if(this.savedPhone){
            this.phoneControl.val(unescape(this.savedPhone));
        }
        if(this.savedPostalCode){
            this.postalCodeControl.val(unescape(this.savedPostalCode));
        }
        if(this.savedCity){
            this.cityControl.val(unescape(this.savedCity));
        }

    }

    private onArrivalDateSelected(dateText):void{
        this.saveArrivalDate(dateText);
    }

    private createListeners():void {
        this.countryOfOriginControl.change(()=>this.countryOfOriginControlChanged());
        this.visitorTypeControl.change(()=>this.visitorTypeControlChanged());

        this.sponsorFirstNameControl.keyup((e)=>this.onSponsorFirstNameChanged(e));
        this.sponsorLastNameControl.keyup((e)=>this.onSponsorLastNameChanged(e));

        this.beneficiaryFirstNameControl.keyup((e)=>this.onBeneficiaryFirstNameChanged(e));
        this.beneficiaryRelationship.keyup((e)=>this.onBeneficiaryRelationshipChanged(e));

        this.addressControl.keyup((e)=>this.onAddressChanged(e));

        this.provinceControl.change(()=>this.provinceControlChanged());
        this.cityControl.keyup((e)=>this.cityChanged(e));
        this.postalCodeControl.keyup((e)=>this.postalCodeChanged(e));

        this.emailControl.keyup((e)=>this.onEmailChanged(e));
        this.phoneControl.keyup((e)=>this.onPhoneChanged(e));
    }

    private countryOfOriginControlChanged():void {
        this.saveCountryOfOrigin();
    }
    private visitorTypeControlChanged():void {
        this.saveVisitorType();
    }

    private provinceControlChanged():void{
        this.saveProvince();
    }

    private saveCountryOfOrigin():void {
        Cookie.setCountryOfOrigin(this.countryOfOriginControl.val());
    }

    private saveVisitorType():void {
        Cookie.setVisitorType(this.visitorTypeControl.val());
    }
    private saveProvince():void {
        Cookie.setSponsorProvince(this.provinceControl.val());
    }

    private saveArrivalDate(date:string):void{
        Cookie.setArrivalDate(date);
    }

    private onSponsorFirstNameChanged(e:any):void {
        Cookie.setSponsorFirstName(this.sponsorFirstNameControl.val());
    }
    private onSponsorLastNameChanged(e:any):void {
        Cookie.setSponsorLastName(this.sponsorLastNameControl.val());
    }

    private onBeneficiaryFirstNameChanged(e:any):void {
        Cookie.setBeneficiaryFirstName(this.beneficiaryFirstNameControl.val());
    }
    private onBeneficiaryRelationshipChanged(e:any):void {
        Cookie.setBeneficiaryLastName(this.beneficiaryRelationship.val());
    }

    private onAddressChanged(e:any):void {
        Cookie.setAddress(this.addressControl.val());
    }
    private onEmailChanged(e:any):void {
        var email:string = this.emailControl.val();
        var emailIsValid:boolean = this.validateEmail(email);

        if(emailIsValid){
            Cookie.setEmail(email);
        }
        else{
            //this.emailErrorMessageElement.html("Email format invalid").show().fadeOut("slow");
        }
    }
    private onPhoneChanged(e:any):void {
        var phone:string = this.phoneControl.val();

        var phoneIsValid:boolean = this.validatePhone(phone);
        if(phoneIsValid){
            Cookie.setPhone(phone);
        }
    }
    private cityChanged(e:any):void {
        Cookie.setSponsorCity(this.cityControl.val());
    }
    private postalCodeChanged(e:any):void {
        Cookie.setSponsorPostalCode(this.postalCodeControl.val());
    }

    private validateEmail(email):boolean{
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    private validatePhone(phone):boolean{
        var regex = /^\d+$/;
        return regex.test(phone);
    }

    private validatePostalCode(postal:string):boolean {
        return PostalCodeValidator.validate(postal);
    }
}
