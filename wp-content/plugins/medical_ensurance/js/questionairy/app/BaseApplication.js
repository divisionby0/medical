///<reference path="../questions/collection/QuestionsCollection.ts"/>
///<reference path="loader/FileLoader.ts"/>
///<reference path="../questions/parsers/QuestionCollectionParser.ts"/>
///<reference path="frontend/UserQuestionsRendererFactory.ts"/>
///<reference path="../../collections/Map.ts"/>
///<reference path="../../collections/json/MapJsonDecoder.ts"/>
///<reference path="../../events/EventBus.ts"/>
var BaseApplication = (function () {
    function BaseApplication(dataString, containerId) {
        this.dataFileUrl = "data.txt";
        this.dataString = dataString;
        this.containerId = containerId;
        this.$j = jQuery.noConflict();
        this.init();
    }
    BaseApplication.prototype.init = function () {
    };
    BaseApplication.prototype.onDataLoaded = function (data) {
        var isJson = this.isJson(data);
        console.log("isJson: ", isJson);
        if (isJson) {
            var dataDecoder = new MapJsonDecoder(data);
            this.map = dataDecoder.decode();
        }
        else {
            this.map = new Map("questions");
        }
    };
    BaseApplication.prototype.isJson = function (data) {
        var returnValue = true;
        try {
            var json = JSON.parse(data);
        }
        catch (e) {
            returnValue = false;
        }
        return returnValue;
    };
    return BaseApplication;
}());
//# sourceMappingURL=BaseApplication.js.map