///<reference path="../questions/parsers/ObjectTypeStringFormatter.ts"/>
var TypeSelectElementData = (function () {
    function TypeSelectElementData() {
        this.createTypes();
        this.createData();
    }
    TypeSelectElementData.prototype.getData = function () {
        return this.data;
    };
    TypeSelectElementData.prototype.createTypes = function () {
        this.types = new Array();
        this.types.push(ObjectType.BOOLEAN_ANSWER);
        this.types.push(ObjectType.TEXT_INPUT_ANSWER);
        this.types.push(ObjectType.TEXT_VIEW_ANSWER);
        this.types.push(ObjectType.DATE_SELECTION_ANSWER);
        this.types.push(ObjectType.SINGLE_SELECTION_ANSWER);
        this.types.push(ObjectType.MULTIPLE_SELECTION_ANSWER);
    };
    TypeSelectElementData.prototype.createData = function () {
        this.data = new Array();
        for (var i = 0; i < this.types.length; i++) {
            var typeId = this.types[i];
            var typeText = ObjectTypeStringFormatter.format(typeId);
            this.data.push({ id: typeId, text: typeText });
        }
    };
    return TypeSelectElementData;
}());
//# sourceMappingURL=TypeSelectElementData.js.map