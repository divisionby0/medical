///<reference path="../../../../../plugins/medical_ensurance/js/events/EventBus.ts"/>
var HTMLExporter = (function () {
    //private siteUrl:string;
    function HTMLExporter() {
        this.$j = jQuery.noConflict();
        //this.siteUrl = this.$j("#siteUrlContainer").text();
    }
    HTMLExporter.prototype.export = function (id, content) {
        var _this = this;
        var dataToSave = this.createApplicationResultData(id, content);
        this.$j.post(ajaxurl, dataToSave, function (response) { return _this.onComplete(response); });
    };
    HTMLExporter.prototype.createApplicationResultData = function (id, content) {
        return { 'action': 'saveApplicationHTML',
            'appId': id,
            'appContent': content
        };
    };
    HTMLExporter.prototype.onComplete = function (response) {
        //console.log("html export response: ",response);
        EventBus.dispatchEvent("HTML_EXPORT_COMPLETE", response);
    };
    return HTMLExporter;
}());
//# sourceMappingURL=HTMLExporter.js.map