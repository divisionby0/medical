///<reference path="QuotePerson.ts"/>
///<reference path="../../../collections/Map.ts"/>
///<reference path="../../../collections/iterators/MapIterator.ts"/>
///<reference path="../../../collections/json/MapJsonDecoder.ts"/>
var QuotePersonCollection = (function () {
    function QuotePersonCollection() {
        this.createCollection();
    }
    QuotePersonCollection.prototype.createCollection = function () {
        this.collection = new Map("persons");
    };
    QuotePersonCollection.prototype.add = function (person) {
        var randomKey = "_" + Math.round(Math.random() * 100000);
        this.collection.add(randomKey, person);
    };
    QuotePersonCollection.prototype.getAges = function () {
        var ages = new Array();
        var iterator = this.collection.getIterator();
        while (iterator.hasNext()) {
            var person = iterator.next();
            var personAge = person.getAge();
            ages.push(personAge.toString());
        }
        return ages;
    };
    QuotePersonCollection.prototype.size = function () {
        return this.collection.size();
    };
    QuotePersonCollection.prototype.getIterator = function () {
        return this.collection.getIterator();
    };
    QuotePersonCollection.prototype.setData = function (data) {
        this.collection = this.parseData(data);
    };
    QuotePersonCollection.prototype.getData = function () {
        return this.collection.getEncoder().encode();
    };
    QuotePersonCollection.prototype.getPersonByAge = function (age) {
        var personsIterator = this.collection.getIterator();
        while (personsIterator.hasNext()) {
            var person = personsIterator.next();
            if (person.getAge() == age) {
                return person;
            }
        }
    };
    QuotePersonCollection.prototype.parseData = function (data) {
        var jsonDecoder = new MapJsonDecoder(data);
        return jsonDecoder.decode();
    };
    return QuotePersonCollection;
}());
//# sourceMappingURL=QuotePersonCollection.js.map