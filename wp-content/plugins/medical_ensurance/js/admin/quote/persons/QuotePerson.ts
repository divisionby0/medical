///<reference path="IQuestionsCollection.ts"/>
class QuotePerson implements IQuestionsCollection{
    
    private _age:number;
    private _firstName:string;
    private _lastName:string;
    private _gender:string;
    private _relationship:string;
    private _birthday:string;
    private _questions:any;
    private _medicalDeclarationRequired:boolean = false;
    private _complete:boolean = false;
    private _confirmed:boolean = false;
    private _useSCCC:boolean = false;
    private _period:number;
    
    constructor(age:number, firstName:string, lastName:string, gender:string, relationship:string, birthday:string, questions:any){
        this._age = age;
        this._firstName = firstName;
        this._lastName = lastName;
        this._gender = gender;
        this._relationship = relationship;
        this._birthday = birthday;
        this._questions = questions;

        if(!this._firstName){
            this._firstName = "";
        }
        if(!this._lastName){
            this._lastName = "";
        }
        if(!this._gender){
            this._gender = "";
        }
        if(!this._relationship){
            this._relationship = "";
        }
        if(!this._birthday){
            this._birthday = "";
        }
        if(!this._questions){
            this._questions = {};
        }
    }

    getLastName():string {
        return this._lastName;
    }

    setLastName(value:string) {
        this._lastName = value;
    }
    getFirstName():string {
        return this._firstName;
    }

    setFirstName(value:string) {
        this._firstName = value;
    }
    getAge():number {
        return this._age;
    }

    setAge(value:number) {
        this._age = value;
    }

    getRelationship():string {
        return this._relationship;
    }
    setRelationship(value:string) {
        this._relationship = value;
    }
    
    getBirthday():string {
        return this._birthday;
    }
    setBirthday(value:string) {
        this._birthday = value;
    }
    
    getGender():string {
        return this._gender;
    }

    setGender(value:string) {
        this._gender = value;
    }

    getQuestions():any {
        return this._questions;
    }

    setQuestions(value:any) {
        this._questions = value;
    }

    setIsComplete(value:boolean):void{
        this._complete = value;
    }
    getIsComplete():boolean{
        return this._complete;
    }

    getMedicalDeclarationRequired():boolean {
        return this._medicalDeclarationRequired;
    }

    setMedicalDeclarationRequired(value:boolean) {
        this._medicalDeclarationRequired = value;
    }

    getIsUseSCCC():boolean {
        return this._useSCCC;
    }

    setIsUseSCCC(value:boolean) {
        this._useSCCC = value;
    }

    getIsConfirmed():boolean {
        return this._confirmed;
    }

    setIsConfirmed(value:boolean) {
        this._confirmed = value;
    }
    getPeriod():number {
        return this._period;
    }

    setPeriod(value:number) {
        this._period = value;
    }
}


