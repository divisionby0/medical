var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../BasePage.ts"/>
///<reference path="../../utils/Emails.ts"/>
var ComposeEmailTestingPage = (function (_super) {
    __extends(ComposeEmailTestingPage, _super);
    function ComposeEmailTestingPage() {
        _super.call(this);
    }
    ComposeEmailTestingPage.prototype.create = function () {
        console.log("ComposeEmailTestingPage create...");
        var emails = new Emails();
        var hasMedicalIssuesEmailText = emails.composeMedicalIssuesEmailText("111");
        var hasNoMedicalIssuesEmailText = emails.composeNoMedicalIssuesEmailText("222");
        console.log("hasMedicalIssuesEmailText = " + hasMedicalIssuesEmailText);
        console.log("hasNoMedicalIssuesEmailText = " + hasNoMedicalIssuesEmailText);
    };
    return ComposeEmailTestingPage;
}(BasePage));
//# sourceMappingURL=ComposeEmailTestingPage.js.map