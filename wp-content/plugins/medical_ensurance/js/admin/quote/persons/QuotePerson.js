///<reference path="IQuestionsCollection.ts"/>
var QuotePerson = (function () {
    function QuotePerson(age, firstName, lastName, gender, relationship, birthday, questions) {
        this._medicalDeclarationRequired = false;
        this._complete = false;
        this._confirmed = false;
        this._useSCCC = false;
        this._age = age;
        this._firstName = firstName;
        this._lastName = lastName;
        this._gender = gender;
        this._relationship = relationship;
        this._birthday = birthday;
        this._questions = questions;
        if (!this._firstName) {
            this._firstName = "";
        }
        if (!this._lastName) {
            this._lastName = "";
        }
        if (!this._gender) {
            this._gender = "";
        }
        if (!this._relationship) {
            this._relationship = "";
        }
        if (!this._birthday) {
            this._birthday = "";
        }
        if (!this._questions) {
            this._questions = {};
        }
    }
    QuotePerson.prototype.getLastName = function () {
        return this._lastName;
    };
    QuotePerson.prototype.setLastName = function (value) {
        this._lastName = value;
    };
    QuotePerson.prototype.getFirstName = function () {
        return this._firstName;
    };
    QuotePerson.prototype.setFirstName = function (value) {
        this._firstName = value;
    };
    QuotePerson.prototype.getAge = function () {
        return this._age;
    };
    QuotePerson.prototype.setAge = function (value) {
        this._age = value;
    };
    QuotePerson.prototype.getRelationship = function () {
        return this._relationship;
    };
    QuotePerson.prototype.setRelationship = function (value) {
        this._relationship = value;
    };
    QuotePerson.prototype.getBirthday = function () {
        return this._birthday;
    };
    QuotePerson.prototype.setBirthday = function (value) {
        this._birthday = value;
    };
    QuotePerson.prototype.getGender = function () {
        return this._gender;
    };
    QuotePerson.prototype.setGender = function (value) {
        this._gender = value;
    };
    QuotePerson.prototype.getQuestions = function () {
        return this._questions;
    };
    QuotePerson.prototype.setQuestions = function (value) {
        this._questions = value;
    };
    QuotePerson.prototype.setIsComplete = function (value) {
        this._complete = value;
    };
    QuotePerson.prototype.getIsComplete = function () {
        return this._complete;
    };
    QuotePerson.prototype.getMedicalDeclarationRequired = function () {
        return this._medicalDeclarationRequired;
    };
    QuotePerson.prototype.setMedicalDeclarationRequired = function (value) {
        this._medicalDeclarationRequired = value;
    };
    QuotePerson.prototype.getIsUseSCCC = function () {
        return this._useSCCC;
    };
    QuotePerson.prototype.setIsUseSCCC = function (value) {
        this._useSCCC = value;
    };
    QuotePerson.prototype.getIsConfirmed = function () {
        return this._confirmed;
    };
    QuotePerson.prototype.setIsConfirmed = function (value) {
        this._confirmed = value;
    };
    QuotePerson.prototype.getPeriod = function () {
        return this._period;
    };
    QuotePerson.prototype.setPeriod = function (value) {
        this._period = value;
    };
    return QuotePerson;
}());
//# sourceMappingURL=QuotePerson.js.map