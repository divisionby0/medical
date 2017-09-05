var Emails = (function () {
    function Emails() {
        this.noMedicalIssuesEmailText = '<b>Thanks</b> for your application. You can download it using this link <p><a href="applicationHtmlUrlString" target="_blank">applicationHtmlUrlString</a></p><p>Best regards</p>';
        this.medicalIssuesEmailText = '<b>Thanks</b> for your application. You have medical issues. You can download it using this link <p><a href="applicationHtmlUrlString" target="_blank">applicationHtmlUrlString</a></p><p>Best regards</p>';
    }
    Emails.prototype.composeNoMedicalIssuesEmailText = function (htmlUrl) {
        var compositionString = this.noMedicalIssuesEmailText.replace(/applicationHtmlUrlString/g, htmlUrl);
        console.log("returning " + compositionString);
        return compositionString;
    };
    Emails.prototype.composeMedicalIssuesEmailText = function (htmlUrl) {
        var compositionString = this.medicalIssuesEmailText.replace(/applicationHtmlUrlString/g, htmlUrl);
        console.log("returning " + compositionString);
        return compositionString;
    };
    return Emails;
}());
//# sourceMappingURL=Emails.js.map