///<reference path="QuotePersonCollection.ts"/>
///<reference path="../../../collections/json/MapJsonDecoder.ts"/>
var PersonCollectionParser = (function () {
    function PersonCollectionParser(data) {
        this.$j = jQuery.noConflict();
        this.data = data;
    }
    PersonCollectionParser.prototype.parse = function () {
        var personsData = unescape(this.data);
        var mapJsonDecoder = new MapJsonDecoder(personsData);
        var decodedMap = mapJsonDecoder.decode();
        return this.parsePersons(decodedMap);
    };
    PersonCollectionParser.prototype.parsePersons = function (source) {
        var collection = new QuotePersonCollection();
        var iterator = source.getIterator();
        while (iterator.hasNext()) {
            var personData = iterator.next();
            collection.add(this.parsePerson(personData));
        }
        return collection;
    };
    PersonCollectionParser.prototype.parsePerson = function (personData) {
        var age = personData._age;
        var firstName = personData._firstName;
        var lastName = personData._lastName;
        var gender = personData._gender;
        var relationship = personData._relationship;
        var questions = personData._questions;
        var birthday = personData._birthday;
        var complete = personData._complete;
        var useSCCC = personData._useSCCC;
        var period = personData._period;
        var medicalDeclarationRequired = personData._medicalDeclarationRequired;
        var questionsData = this.parseQuestions(questions);
        var person = new QuotePerson(age, firstName, lastName, gender, relationship, birthday, questionsData);
        person.setIsComplete(complete);
        person.setIsUseSCCC(useSCCC);
        person.setPeriod(period);
        person.setMedicalDeclarationRequired(medicalDeclarationRequired);
        return person;
    };
    PersonCollectionParser.prototype.parseQuestions = function (questions) {
        var questionsData = "";
        console.log("parse questions ", questions);
        var isEmpty = this.$j.isEmptyObject(questions);
        if (!isEmpty) {
            questions.collection.items.id = "questions";
            questions.collection.items.type = "Map";
            questionsData = JSON.stringify(questions.collection.items);
        }
        return questionsData;
    };
    return PersonCollectionParser;
}());
//# sourceMappingURL=PersonCollectionParser.js.map