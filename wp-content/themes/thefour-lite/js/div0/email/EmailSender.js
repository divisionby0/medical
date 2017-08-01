///<reference path="../../../../../plugins/medical_ensurance/js/events/EventBus.ts"/>
var EmailSender = (function () {
    function EmailSender() {
        this.$j = jQuery.noConflict();
    }
    EmailSender.prototype.sendApplicationResult = function (receiver, emailContent, appId) {
        var _this = this;
        var dataToSave = this.createApplicationResultData(receiver, emailContent, appId);
        this.$j.post(ajaxurl, dataToSave, function (response) { return _this.onComplete(response); });
    };
    EmailSender.prototype.sendApplicationAdminEmail = function (appId) {
        var _this = this;
        var dataToSave = { 'action': 'sendApplicationAdminEmail',
            'appId': appId
        };
        this.$j.post(ajaxurl, dataToSave, function (response) { return _this.onApplicationAdminEmailSent(response); });
    };
    EmailSender.prototype.createApplicationResultData = function (receiver, emailContent, appId) {
        //console.log("appId:"+appId);
        return { 'action': 'sendApplicationResultEmail',
            'receiver': receiver,
            'body': emailContent,
            'appId': appId
        };
    };
    EmailSender.prototype.onComplete = function (response) {
        EventBus.dispatchEvent("APPLICATION_EMAIL_SENT_RESULT", response);
    };
    EmailSender.prototype.onApplicationAdminEmailSent = function (response) {
        EventBus.dispatchEvent("APPLICATION_ADMIN_EMAIL_SENT_RESULT", response);
    };
    return EmailSender;
}());
//# sourceMappingURL=EmailSender.js.map