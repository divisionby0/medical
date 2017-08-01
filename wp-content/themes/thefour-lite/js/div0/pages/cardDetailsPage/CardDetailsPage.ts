///<reference path="../../utils/NavigatorUtil.ts"/>
///<reference path="confirmation/CardDetailsConfirmationView.ts"/>
class CardDetailsPage{

    private $j:any;

    private cardTypeSelect:any;
    private cardHolderInput:any;
    private cardExpirationDateInput:any;
    private cardNumberInput:any;

    private cardType:string;
    private cardHolderName:string;
    private cardNumber:string;
    private cardExpirationDate:string;

    private cardIdMinCharacters:number = 15;
    private cardIdMaxCharacters:number = 16;

    private nextButton:any;
    private prevButton:any;

    private prevPage:string = "person-details";

    private errorContainer:any;
    private confirmationContainer:any;

    private currentState:string;
    private NORMAL:string = "NORMAL";
    private CONFIRMATION:string = "CONFIRMATION";
    private CONFIRMED:string = "CONFIRMED";

    private confirmationView:CardDetailsConfirmationView;
    private card:Card;
    private form:any;

    constructor(){
        this.$j = jQuery.noConflict();
        this.card = new Card();
        this.card.setType("mastercard");
        this.currentState = this.NORMAL;
    }

    public create():void{
        this.cardTypeSelect = this.$j("#cardTypeSelect");
        this.cardHolderInput = this.$j("#cardholderNameInput");
        this.cardExpirationDateInput = this.$j("#expirationDateInput");
        this.cardNumberInput = this.$j("#cardNumberInput");

        this.nextButton = this.$j("#nextButton");
        this.prevButton = this.$j("#prevButton");

        this.errorContainer = this.$j("#errorText");
        this.confirmationContainer = this.$j("#confirmationViewContainer");
        this.form = this.$j("#cardDetailsForm");

        if(this.cardExpirationDateInput.val()!=""){
            this.card.setExpDate(this.cardExpirationDateInput.val());
        }
        this.card.setType("mastercard");

        this.createCardTypeSelectListener();
        this.createCardNumberInputListener();
        this.createDateSelector();
        this.createButtonsListener();
    }

    private onStateChanged():void{
        if(this.currentState == this.NORMAL){
            this.hideConfirmation();
            this.showForm();
        }
        else if(this.currentState == this.CONFIRMATION){
            this.hideForm();
            this.showConfirmation();
        }
        else{
            // next page
            this.navigateToNextPage();
        }
    }

    private showConfirmation():void{
        this.$j("#confirmationViewContainer").removeClass("hidden");
        this.confirmationView = new CardDetailsConfirmationView(this.card);
    }

    private hideConfirmation():void{
        this.$j("#confirmationViewContainer").addClass("hidden");
        if(this.confirmationView){
            this.confirmationView.destroy();
            this.confirmationView = null;
        }
    }
    
    private onNextButtonClick():void{
        this.hideError();

        var isValid:boolean;

        if(this.currentState == this.NORMAL){
            this.cardHolderName = this.cardHolderInput.val();
            this.cardExpirationDate = this.cardExpirationDateInput.val();
            this.cardNumber = this.cardNumberInput.val();

            this.card.setNumber(this.cardNumber);
            this.card.setHolderName(this.cardHolderName);

            isValid = this.validate();

            if(isValid){
                this.currentState = this.CONFIRMATION;
                this.onStateChanged();
            }
        }
        else if(this.currentState == this.CONFIRMATION){
            isValid = this.validate();
            if(isValid){
                this.currentState = this.CONFIRMED;
                this.onStateChanged();
            }
        }
    }

    private onPrevButtonClick():void{
        if(this.currentState == this.CONFIRMATION){
            this.currentState = this.NORMAL;
            this.onStateChanged();
        }
        else if(this.currentState == this.NORMAL){
            this.navigateToPrevPage();
        }
    }

    private hideError():void{
        this.errorContainer.text("");
        this.errorContainer.addClass("hidden");
    }

    private showError(text:string):void{
        this.errorContainer.text(text);
        this.errorContainer.removeClass("hidden");
    }

    private navigateToNextPage():void {
        this.form.submit();
    }
    private navigateToPrevPage():void {
        NavigatorUtil.navigateTo(this.prevPage);
    }
    private onExpirationDateSelected(dateText:any):void {
        this.cardExpirationDate = this.cardExpirationDateInput.val();
        this.card.setExpDate(this.cardExpirationDate);
    }
    private createButtonsListener():void {
        this.nextButton.click(()=>this.onNextButtonClick());
        this.prevButton.click(()=>this.onPrevButtonClick());
    }

    private validate():boolean{
        var isValid:boolean = true;
        if(this.currentState == this.NORMAL){
            return this.validateInfo();
        }
        else if(this.currentState == this.CONFIRMATION){
            return this.validateConfirmation();
        }
    }

    private validateInfo():boolean{
        var isValid:boolean = true;

        if(this.cardHolderName.length<3){
            this.showError("Card holder name invalid");
            isValid = false;
        }

        var cardNumberMaxChars:number = parseInt(this.cardNumberInput.attr("maxlength"));

        if(cardNumberMaxChars!=this.cardNumber.length){
            this.showError("Card number invalid");
            isValid = false;
        }

        if(cardNumberMaxChars!=this.cardNumber.length){
            this.showError("Card number invalid");
            isValid = false;
        }

        if(this.cardExpirationDate.length < 1){
            this.showError("Card expiration date invalid");
            isValid = false;
        }

        return isValid;
    }

    private validateConfirmation():boolean{
        console.log("validateConfirmation ");
        var isConfirmed:boolean = this.confirmationView.isConfirmed();

        if(isConfirmed == false){
            this.showError("Error. You must confirm card details.");
        }

        return isConfirmed;
    }

    private clearCardIdInput():void{
        this.cardNumberInput.val("");
    }

    private createCardNumberInputListener():void {
        this.cardNumberInput.keypress((e)=>this.onCardNumberChanged(e));
    }

    private onCardNumberChanged(e):boolean{
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            this.onCardNumberError();
            return false;
        }
    }
    private createCardTypeSelectListener():void {
        this.cardTypeSelect.change(()=>this.onCardTypeSelectChanged());
    }

    private onCardTypeSelectChanged():void {
        this.cardType = this.cardTypeSelect.val();

        this.card.setType(this.cardType);

        this.$j("#cardTypeFormData").val(this.cardType);

        this.clearCardIdInput();

        switch(this.cardType){
            case "mastercard":
            case "visa":
                this.cardNumberInput.attr("maxlength", this.cardIdMaxCharacters);
                break;
            case "americanExpress":
                this.cardNumberInput.attr("maxlength", this.cardIdMinCharacters);
                break;
        }
    }

    private createDateSelector():void{
        /*
        this.cardExpirationDateInput.datepicker({
            minDate:0,
            changeYear: true,
            yearRange:'-10:+10',
            defaultDate: new Date(),
            onSelect: (dateText)=>this.onExpirationDateSelected(dateText)
        });
        */

        var datepicker:any = this.cardExpirationDateInput.datepicker({
            minDate:0,
            changeMonth: true,
            changeYear: true,
            yearRange:'-10:+10',
            dateFormat: 'MM yy',
            defaultDate: new Date(),
            showButtonPanel: true,
            onSelect: (dateText)=>this.onExpirationDateSelected(dateText),
            onClose: (dateText, inst)=>this.onCloseDatepicker(dateText, inst)
        });

        this.cardExpirationDateInput.click(()=>this.onDateClicked());
        this.cardExpirationDateInput.focus(()=>this.onDateClicked());
    }

    private onCloseDatepicker(dateText, inst):void{
        var month = this.$j("#ui-datepicker-div .ui-datepicker-month :selected").val();
        var year = this.$j("#ui-datepicker-div .ui-datepicker-year :selected").val();
        this.cardExpirationDateInput.val(this.$j.datepicker.formatDate('MM yy', new Date(year, month, 1)));

        this.cardExpirationDate = this.cardExpirationDateInput.val();
        this.card.setExpDate(this.cardExpirationDate);
    }

    private onDateClicked():void {
        this.$j("table.ui-datepicker-calendar").eq(2).prop('style', 'display: none;');
        this.$j("table.ui-datepicker-calendar").hide();

        this.$j("#ui-datepicker-div").position({
            my: "center top",
            at: "center bottom",
            of: this.cardExpirationDateInput
        });
    }

    private hideForm():void{
        this.form.addClass("hidden");
    }
    private showForm():void{
        this.form.removeClass("hidden");
    }

    private onCardNumberError():void{
        this.$j("#errmsg").html("Digits Only").show().fadeOut("slow");
    }


}
