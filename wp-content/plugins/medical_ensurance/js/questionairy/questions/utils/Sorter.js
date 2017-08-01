var Sorter = (function () {
    function Sorter(collection) {
        this.collection = collection;
    }
    Sorter.prototype.sortDescidental = function (item1, item2) {
        if (item1.index > item2.index) {
            return 1;
        }
        else {
            return 0;
        }
    };
    Sorter.prototype.sort = function () {
        this.collection.sort(this.sortDescidental);
    };
    return Sorter;
}());
//# sourceMappingURL=Sorter.js.map