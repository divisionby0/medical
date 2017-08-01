///<reference path="../../../libs/jqueryTS/jquery.d.ts"/>
///<reference path="../../utils/validators/TextLengthValidator.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/events/EventBus.ts"/>
declare var DateUtils:any;
class PersonalInfoRequestView{
    
    private genderSelect:any;
    private dateSelect:any;

    private firstName:string;
    private lastName:string;
    private gender:string;
    private dateOfBirth:string;

    private firstNameInput:any;
    private lastNameInput:any;
    private relationshipInput:any;

    private firstNameErrorText:any;
    private lastNameErrorText:any;
    private dateOfBirthErrorText:any;

    private firstNameValid:boolean;
    private lastNameValid:boolean;
    private dateOfBirthValid:boolean;
    private relationshipValid:boolean;

    private age:number;

    private birthday:string;
    private relationship:string;

    private $j:any;
    
    // TODO привести сюда QuotePerson вместо объекта
    constructor(personData:any){

        this.$j = jQuery.noConflict();
        
        this.age = personData.age;

        this.firstName = personData.firstName;
        this.lastName = personData.lastName;
        this.gender = personData.gender;
        this.relationship = personData.relationship;
        this.birthday = personData.birthday;

        this.firstNameValid = false;
        this.lastNameValid = false;
        this.dateOfBirthValid = false;
        this.relationshipValid = false;

        this.dateOfBirth = "";
        this.createChildren();
    }

    private validate():void{
        this.firstName = this.firstNameInput.val();
        this.lastName = this.lastNameInput.val();
        this.gender = this.genderSelect.val();
        this.dateOfBirth = this.dateSelect.val();

        this.firstNameValid = this.isFirstNameValid();
        this.lastNameValid = this.isLastNameValid();
        this.dateOfBirthValid = this.isBirthdayValid();

        if(!this.firstNameValid){
            EventBus.dispatchEvent("PERSONAL_INFO_FIRST_NAME_VALIDATE_ERROR", this.age);
            this.showFirstNameError();
        }
        else if(!this.lastNameValid){
            EventBus.dispatchEvent("PERSONAL_INFO_LAST_NAME_VALIDATE_ERROR", this.age);
            this.showLastNameError();
        }
        else if(!this.dateOfBirthValid){
            EventBus.dispatchEvent("PERSONAL_INFO_BIRTHDAY_VALIDATE_ERROR", this.age);
            this.showDateOfBirthError();
        }
    }
    
    public isValid():boolean{
        this.validate();
        
        if(this.firstNameValid && this.lastNameValid && this.dateOfBirthValid){
            return true;
        }
        else{
            return false;
        }
    }
    
    public dropError():void{
        this.hideFirstNameError();
        this.hideLastNameError();
        this.hideDateOfBirthError();
    }
    
    public getData():any{
        var userData:any = {age:this.age, firstName:this.firstName, lastName:this.lastName, gender:this.gender, birthday:this.dateOfBirth, relationship:this.$j("#relationship_"+this.age).val()};
        return userData;
    }
    
    private createChildren():void {
        this.lastNameInput = this.$j('#lastname_'+this.age);
        this.firstNameInput = this.$j('#firstname_'+this.age);

        this.relationshipInput = this.$j("#relationship_"+this.age);

        this.firstNameErrorText = this.$j('#firstNameErrorText_'+this.age);
        this.lastNameErrorText = this.$j('#lastNameErrorText_'+this.age);
        this.dateOfBirthErrorText = this.$j('#dateOfBirthErrorText_'+this.age);

        this.genderSelect = this.$j('#genderSelect_'+this.age);
        this.dateSelect = this.$j('#dateOfBirthSelect_'+this.age);

        this.lastNameInput.keydown(()=>this.lastNameChangedHandler());
        this.firstNameInput.keydown(()=>this.firstNameChangedHandler());


        if(this.firstName){
            this.firstNameInput.val(this.firstName);
        }
        if(this.lastName){
            this.lastNameInput.val(this.lastName);
        }
        if(this.relationship){
            this.relationshipInput.val(this.relationship);
        }

        if(this.birthday){
            this.dateSelect.val(this.birthday);
        }
        
        this.createDateSelector();
    }

    private createDateSelector():void{
        this.dateSelect.datepicker({
            maxDate: 0,
            changeMonth: true,
            changeYear: true,
            yearRange:'-99:+0',
            defaultDate: new Date(),
            onSelect: (dateText)=>this.dateOfBirthSelected(dateText)
        });
    }

    private isBirthdayValid():boolean{
        var validator:TextLengthValidator = new TextLengthValidator(this.dateOfBirth);
        var isNotEmpty:boolean = validator.validate(1);

        var calculatedAge:any = DateUtils.getYearsFromDate(this.dateOfBirth);

        if(calculatedAge !=this.age){
            return false;
        }
        return isNotEmpty
    }

    private isFirstNameValid():boolean{
        var validator:TextLengthValidator = new TextLengthValidator(this.firstName);
        return validator.validate(1);
    }
    private isLastNameValid():boolean{
        var validator:TextLengthValidator = new TextLengthValidator(this.lastName);
        return validator.validate(1);
    }

    private showFirstNameError():void{
        this.$j("#firstNameRow_"+this.age).css("color","#a94442");
        this.$j("#firstNameError_"+this.age).removeClass("hidden");
        this.$j("#firstNameContainer_"+this.age).addClass("has-error has-feedback");
    }
    private hideFirstNameError():void{
        this.$j("#firstNameRow_"+this.age).css("color","");
        this.$j("#firstNameError_"+this.age).addClass("hidden");
        this.$j("#firstNameContainer_"+this.age).removeClass("has-error has-feedback");
    }

    private showLastNameError():void{
        this.$j("#lastNameRow_"+this.age).css("color","#a94442");
        this.$j("#lastNameError_"+this.age).removeClass("hidden");
        this.$j("#lastNameContainer_"+this.age).addClass("has-error has-feedback");
    }
    private hideLastNameError():void{
        this.$j("#lastNameRow_"+this.age).css("color","");
        this.$j("#lastNameError_"+this.age).addClass("hidden");
        this.$j("#lastNameContainer_"+this.age).removeClass("has-error has-feedback");
    }

    private showDateOfBirthError():void{
        this.$j("#birthdayRow_"+this.age).css("color","#a94442");
        this.$j("#birthdayError_"+this.age).removeClass("hidden");
        this.$j("#birthdayContainer_"+this.age).addClass("has-error has-feedback");
        this.$j("#dateOfBirthSelect_"+this.age).val("").attr("placeholder","Empty or not "+this.age+" y.o.").addClass("dateInputError_webkit").addClass("dateInputError_moz").addClass("dateInputError_moz_2").addClass("dateInputError_ms");
    }
    private hideDateOfBirthError():void{
        this.$j("#birthdayRow_"+this.age).css("color","");
        this.$j("#birthdayError_"+this.age).addClass("hidden");
        this.$j("#birthdayContainer_"+this.age).removeClass("has-error has-feedback");
        this.$j("#dateOfBirthSelect_"+this.age).attr("placeholder","Click to pick date of birth").removeClass("dateInputError_webkit").removeClass("dateInputError_moz").removeClass("dateInputError_moz_2").removeClass("dateInputError_ms");
    }

    private lastNameChangedHandler():void {
        this.hideLastNameError();
        this.dispatchValueChanged();
    }

    private firstNameChangedHandler():void {
        this.hideFirstNameError();
        this.dispatchValueChanged();
    }

    private dateOfBirthSelected(dateText:string):void {
        this.hideDateOfBirthError();
        this.dispatchValueChanged();
    }
    
    private dispatchValueChanged():void{
        EventBus.dispatchEvent("PERSONAL_INFO_VALUE_CHANGED", null);
    }
}
    
