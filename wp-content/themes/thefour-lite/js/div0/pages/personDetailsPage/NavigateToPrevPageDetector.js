///<reference path="../../../../../../plugins/medical_ensurance/js/collections/iterators/MapIterator.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/admin/quote/persons/QuotePerson.ts"/>
var NavigateToPrevPageDetector = (function () {
    function NavigateToPrevPageDetector(personsIterator) {
        this.personsIterator = personsIterator;
    }
    NavigateToPrevPageDetector.prototype.detect = function (state) {
        while (this.personsIterator.hasNext()) {
            var person = this.personsIterator.next();
            console.log("Person " + person.getFirstName() + "  isComplete:" + person.getIsComplete());
            if (person.getIsComplete()) {
                return false;
            }
        }
        if (state == "CONFIRMATION") {
            return false;
        }
        else {
            return true;
        }
    };
    return NavigateToPrevPageDetector;
}());
//# sourceMappingURL=NavigateToPrevPageDetector.js.map