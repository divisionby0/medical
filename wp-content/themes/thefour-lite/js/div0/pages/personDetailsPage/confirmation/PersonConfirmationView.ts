///<reference path="../../../../../../../plugins/medical_ensurance/js/questionairy/app/FrontendUserAnswers.ts"/>
///<reference path="../../../../../../../plugins/medical_ensurance/js/admin/quote/persons/QuotePerson.ts"/>
class PersonConfirmationView{
    protected $j:any;
    protected confirmCheckBox:any;
    protected containerId:string;
    protected person:QuotePerson;
    private checkBoxContainer:any;

    constructor(person:QuotePerson){
        this.$j = jQuery.noConflict();
        this.person = person;
        this.containerId = "questionsRootContainer";
        this.createChildren();
    }

    public destroy():void{
        this.$j("#"+this.containerId).empty();
    }

    public isValid():boolean{
        return this.confirmCheckBox.is(':checked');
    }

    protected createChildren():void {
        this.$j("#personHeaderContainer").hide();
        this.$j("#confirmationHeaderContainer").show();
        this.createConfirmCheckBox();
        this.updatePersonPrivateDetails();
        this.$j("#"+this.containerId).append(this.checkBoxContainer);
    }

    private createConfirmCheckBox():void {
        this.confirmCheckBox = this.$j('<input type="checkbox" id="confirmCheckBox">  <label for="confirmCheckBox" class="text-success"> I confirm all this data !</label><br/>');
        this.checkBoxContainer = this.$j("<div style='width:100%; text-align: center; display:inline-block; text-align: center;' id='cont'>").append(this.confirmCheckBox);
    }

    private updatePersonPrivateDetails():void {
        this.$j("#personHeaderContainer").text(this.person.getFirstName()+"   "+this.person.getLastName());

        this.$j("#firstNameContainer").text(this.person.getFirstName());
        this.$j("#lastNameContainer").text(this.person.getLastName());
        this.$j("#genderContainer").text(this.person.getGender());
        this.$j("#dateOfBirthContainer").text(this.person.getBirthday());
        this.$j("#ageContainer").text(this.person.getAge());
    }
}
