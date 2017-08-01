///<reference path="../../../libs/jqueryTS/jquery.d.ts"/>
///<reference path="../../utils/NavigatorUtil.ts"/>
///<reference path="../../utils/validators/TextLengthValidator.ts"/>
///<reference path="PersonalInfoRequestView.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/collections/Map.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/collections/json/MapJsonDecoder.ts"/>
///<reference path="../views/SelectionForm.ts"/>
///<reference path="../companyPlanSelectionPage/CompanyPlanSelectionForm.ts"/>
///<reference path="../BasePage.ts"/>
///<reference path="MedicalDeclarationRequirementUpdater.ts"/>
///<reference path="PersonsAdditionalDataRequestView.ts"/>
declare var ajaxurl:string;
declare var StringUtils;
declare var RateTableGuide;
declare var RateTableGuideParser;
class ApplicationCreationPage extends BasePage{

    private prevButton:any;
    private nextButton:any;

    private prevPage:string = "plan-selection";
    private nextPage:string = "person-details";

    private ages:number[];
    private views:Map<PersonalInfoRequestView>;

    private personsAdditionalDataRequestView:PersonsAdditionalDataRequestView;

    private errorText:string;

    constructor(){
        super();
    }
    
    public create():void{
        this.views = new Map<PersonalInfoRequestView>("personViews");
        this.ages = this.getAges();
        this.persons = this.getPersons();
        
        this.updatePersonsMedicalDeclarationRequirements();
        
        this.createChildren();

        EventBus.addEventListener("PERSONAL_INFO_VALUE_CHANGED", ()=>this.personalInfoValueChangedHandler());
        EventBus.addEventListener("PERSONAL_INFO_FIRST_NAME_VALIDATE_ERROR", (data)=>this.personalInfoFirstNameValidateErrorHandler(data));
        EventBus.addEventListener("PERSONAL_INFO_LAST_NAME_VALIDATE_ERROR", (data)=>this.personalInfoLastNameValidateErrorHandler(data));
        EventBus.addEventListener("PERSONAL_INFO_BIRTHDAY_VALIDATE_ERROR", (data)=>this.personalInfoBirthdayValidateErrorHandler(data));
    }

    
    private getCompany():any{
        var companyDecodedData:string = Cookie.getSelectedCompanyData();
        var companyData:any = StringUtils.parseURI(companyDecodedData);
        return companyData;
    }

    // TODO путаница. Тут я получаю возрасты из элемента, хотя могу получить их из куков !!!!
    private getAges():number[] {
        var agesData:string = this.$j("#agesCollectionContainer").text();

        var ages:number[] = new Array();
        var agesDecodedObject:any = JSON.parse(agesData);

        for(var i:number = 0; i<agesDecodedObject.length;i++){
            var age:any = agesDecodedObject[i];
            ages.push(age);
        }

        // disable sorting
        //ages.sort(this.compareFunction);

        return ages;
    }

    private createChildren():void {
        this.prevButton = this.$j('#prevButton');
        this.nextButton = this.$j('#nextButton');
        
        this.prevButton.on("click", ()=>this.prevButtonClickHandler());
        this.nextButton.on("click", ()=>this.nextButtonClickHandler());
        
        for(var i:number = 0; i<this.ages.length; i++){

            var person:QuotePerson = this.persons.getPersonByAge(this.ages[i]);
            var personData:any = {age:this.ages[i]};

            if(person){
                personData.firstName = person.getFirstName();
                personData.lastName = person.getLastName();
                personData.gender = person.getGender();
                personData.relationship = person.getRelationship();
                personData.birthday = person.getBirthday();
            }

            var view:PersonalInfoRequestView = new PersonalInfoRequestView(personData);
            this.views.add(this.ages[i].toString(), view);
        }
        this.personsAdditionalDataRequestView = new PersonsAdditionalDataRequestView();
    }

    private prevButtonClickHandler():void{
       this.navigateToPrevPage();
    }

    private navigateToNextPage():void{
        
        NavigatorUtil.navigateTo(this.nextPage);
    }
    private navigateToPrevPage():void{
        NavigatorUtil.navigateTo(this.prevPage);
    }

    private nextButtonClickHandler():void{
        this.onNextButtonClick();
    }

    private onNextButtonClick():void{
        this.hideError();

        console.log("this.personsAdditionalDataRequestView="+this.personsAdditionalDataRequestView);

        var validateResult:any = this.personsAdditionalDataRequestView.validate();
        var dataIsValid:boolean = validateResult.isValid;
        if(!dataIsValid){
            this.errorText = validateResult.errorText;
            this.onDataInvalid();
            return;
        }
        
        var viewsIterator:MapIterator = this.views.getIterator();
        while(viewsIterator.hasNext()){
            var view:PersonalInfoRequestView = viewsIterator.next();
            dataIsValid = view.isValid();
            if(!dataIsValid){
                this.onDataInvalid();
                return;
            }
        }

        this.saveData();
        this.navigateToNextPage();
    }

    private onDataInvalid():void{
        this.showError();
    }

    private personalInfoValueChangedHandler():void{
        this.hideError();
    }

    private hideError():void {
        this.$j("#userPersonalDataErrorText").text("");
        this.$j("#userPersonalDataErrorText").addClass("hidden");
        
        var viewsIterator:MapIterator = this.views.getIterator();
        while(viewsIterator.hasNext()){
            var view:PersonalInfoRequestView = viewsIterator.next();
            view.dropError();
        }
    }

    private showError():void{
        this.$j("#userPersonalDataErrorText").text(this.errorText);
        this.$j("#userPersonalDataErrorText").removeClass("hidden");
    }

    private saveData():void{
        var viewsIterator:MapIterator = this.views.getIterator();

        var counter:number = 0;
        while(viewsIterator.hasNext()){
            var view:PersonalInfoRequestView = viewsIterator.next();
            var personData:any = view.getData();
            var age:number = personData.age;
            
            var currentPerson:QuotePerson = this.persons.getPersonByAge(age);

            currentPerson.setFirstName(personData.firstName);
            currentPerson.setLastName(personData.lastName);
            currentPerson.setGender(personData.gender);
            currentPerson.setBirthday(personData.birthday);

            if(counter == 0){
                currentPerson.setRelationship("Primary");
            }
            else{
                currentPerson.setRelationship(personData.relationship);
            }
            
            counter++;
        }
        Cookie.setPersons(this.persons.getData());
    }

    private personalInfoFirstNameValidateErrorHandler(age:string){
        this.errorText = "Person with age "+age+" has invalid first name."
    }
    private personalInfoLastNameValidateErrorHandler(age:string){
        this.errorText = "Person with age "+age+" has invalid last name."
    }
    private personalInfoBirthdayValidateErrorHandler(age:string){
        this.errorText = "Person with age "+age+" has invalid birthday."
    }

    private getRateTableGuideData():string{
        return this.$j("#companyRateTableGuide").text()
    }
    private parseRateTableGuide(data:string):any{
        var parser:any = new RateTableGuideParser();
        return parser.parse(data);
    }

    private compareFunction(a:number, b:number):number{
        if(a > b){
            return -1;
        }
        else{
            return 1;
        }
    }

    private updatePersonsMedicalDeclarationRequirements():void {
        var rateTableGuideData:string = this.getRateTableGuideData();
        var rateTableGuide:any = this.parseRateTableGuide(rateTableGuideData);
        
        var medicalDeclarationRequirementUpdater:MedicalDeclarationRequirementUpdater = new MedicalDeclarationRequirementUpdater(this.persons, rateTableGuide);
        medicalDeclarationRequirementUpdater.update();
    }
}
