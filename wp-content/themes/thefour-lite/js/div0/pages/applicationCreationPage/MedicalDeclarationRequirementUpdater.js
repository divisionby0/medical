///<reference path="../../../../../../plugins/medical_ensurance/js/admin/quote/persons/QuotePersonCollection.ts"/>
var MedicalDeclarationRequirementUpdater = (function () {
    function MedicalDeclarationRequirementUpdater(persons, rateTableGuide) {
        this.persons = persons;
        this.rateTableGuide = rateTableGuide;
    }
    MedicalDeclarationRequirementUpdater.prototype.update = function () {
        var personIterator = this.persons.getIterator();
        while (personIterator.hasNext()) {
            var person = personIterator.next();
            var personAge = person.getAge();
            var useSCCC = person.getIsUseSCCC();
            var medicalDeclarationRequired = this.rateTableGuide.isMedicalDeclarationRequired(personAge, useSCCC);
            person.setMedicalDeclarationRequired(medicalDeclarationRequired);
            console.log("Person " + personAge + "  medicalDeclarationRequired=" + medicalDeclarationRequired);
        }
    };
    return MedicalDeclarationRequirementUpdater;
}());
//# sourceMappingURL=MedicalDeclarationRequirementUpdater.js.map