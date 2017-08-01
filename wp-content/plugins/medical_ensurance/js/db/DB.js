///<reference path="../events/EventBus.ts"/>
var DB = (function () {
    function DB() {
    }
    DB.savePersons = function (data, quoteId) {
        var j = jQuery.noConflict();
        var dataToSave = { 'action': 'saveTempQuotePersons',
            'quoteId': quoteId,
            'data': data
        };
        j.post(ajaxurl, dataToSave, function (response) {
            //console.log("save persons response: "+response);
        });
    };
    DB.loadPersons = function (quoteId) {
        var j = jQuery.noConflict();
        var requestData = { 'action': 'loadTempQuotePersons',
            'quoteId': quoteId
        };
        j.post(ajaxurl, requestData, function (response) {
            EventBus.dispatchEvent("personsDataLoadComplete", response);
        });
    };
    DB.deletePersons = function (quoteId) {
        var j = jQuery.noConflict();
        var requestData = { 'action': 'removeTempQuotePersons',
            'quoteId': quoteId
        };
        j.post(ajaxurl, requestData, function (response) {
            console.log("persons temp record removed data: " + response);
        });
    };
    return DB;
}());
//# sourceMappingURL=DB.js.map