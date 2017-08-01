///<reference path="../../collections/Map.ts"/>
///<reference path="../../collections/json/MapJsonDecoder.ts"/>
///<reference path="../quote/persons/QuotePerson.ts"/>
///<reference path="../quote/persons/QuotePersonCollection.ts"/>
///<reference path="../../questionairy/questions/collection/QuestionsCollection.ts"/>
///<reference path="../../questionairy/app/FrontendUserAnswers.ts"/>
///<reference path="persons/QuotePersonAdminView.ts"/>
///<reference path="persons/PersonCollectionParser.ts"/>
var QuoteEditAdminView = (function () {
    function QuoteEditAdminView() {
        this.$j = jQuery.noConflict();
        var quoteData = this.$j("#quoteData").text();
        try {
            this.quotedata = JSON.parse(quoteData);
            console.log("quote data: ", this.quotedata);
        }
        catch (error) {
            console.error("quoteData is not json");
            return;
        }
        this.updateChildren();
        this.createStateDropDownListener();
        this.persons = this.getPersons();
        this.iteratePersons();
    }
    QuoteEditAdminView.prototype.getPersons = function () {
        var personsData = this.$j("#personsData").html();
        var personsParser = new PersonCollectionParser(personsData);
        return personsParser.parse();
    };
    QuoteEditAdminView.prototype.iteratePersons = function () {
        var iterator = this.persons.getIterator();
        while (iterator.hasNext()) {
            var person = iterator.next();
            new QuotePersonAdminView(person, this.$j("#personsContainer"));
        }
    };
    QuoteEditAdminView.prototype.updateChildren = function () {
        this.$j("#benefitContainer").text(StringUtils.formatMoneyInt(this.quotedata.benefit));
        this.$j("#deductibleContainer").text(StringUtils.formatMoneyInt(this.quotedata.deductible));
        this.$j("#costContainer").text(StringUtils.formatDivisionalMoney(this.quotedata.cost));
        this.$j("#periodContainer").text(this.quotedata.period + " day(s)");
        this.$j("#startDateContainer").text(this.quotedata.startDate);
        this.$j("#finishDateContainer").text(this.quotedata.finishDate);
    };
    QuoteEditAdminView.prototype.createStateDropDownListener = function () {
        var _this = this;
        this.$j("#stateDropDown").change(function () { return _this.onStateDropDownChanged(); });
    };
    QuoteEditAdminView.prototype.onStateDropDownChanged = function () {
        console.log("onStateDropDownChanged to " + this.$j("#stateDropDown").val());
        this.$j("#applicationStateEditor").val(this.$j("#stateDropDown").val());
    };
    return QuoteEditAdminView;
}());
//# sourceMappingURL=QuoteEditAdminView.js.map