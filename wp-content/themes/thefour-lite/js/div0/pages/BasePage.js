///<reference path="../../../../../plugins/medical_ensurance/js/collections/Map.ts"/>
///<reference path="../../../../../plugins/medical_ensurance/js/collections/json/MapJsonDecoder.ts"/>
///<reference path="../../libs/jqueryTS/jquery.d.ts"/>
///<reference path="../../../../../plugins/medical_ensurance/js/admin/quote/persons/QuotePersonCollection.ts"/>
///<reference path="../../../../../plugins/medical_ensurance/js/utils/Cookie.ts"/>
var BasePage = (function () {
    function BasePage() {
        this.$j = jQuery.noConflict();
    }
    BasePage.prototype.getPersons = function () {
        var personsData = Cookie.getPersons();
        var parsedPersonsData = StringUtils.parseURI(personsData);
        var mapJsonDecoder = new MapJsonDecoder(JSON.stringify(parsedPersonsData));
        var decodedMap = mapJsonDecoder.decode();
        return this.parsePersons(decodedMap);
    };
    BasePage.prototype.parsePersons = function (source) {
        var collection = new QuotePersonCollection();
        var iterator = source.getIterator();
        while (iterator.hasNext()) {
            var personData = iterator.next();
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
            var person = new QuotePerson(age, firstName, lastName, gender, relationship, birthday, questions);
            person.setIsComplete(complete);
            person.setIsUseSCCC(useSCCC);
            person.setPeriod(period);
            person.setMedicalDeclarationRequired(medicalDeclarationRequired);
            collection.add(person);
        }
        return collection;
    };
    return BasePage;
}());
//# sourceMappingURL=BasePage.js.map