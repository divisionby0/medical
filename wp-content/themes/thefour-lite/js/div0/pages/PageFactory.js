///<reference path="applicationCreationPage/ApplicationCreationPage.ts"/>
///<reference path="personDetailsPage/PersonDetailsPage.ts"/>
///<reference path="companyPlanSelectionPage/CompanyPlanSelectionPage.ts"/>
///<reference path="companiesByUserDataPage/CompaniesByUserDataPageTS.ts"/>
///<reference path="cardDetailsPage/CardDetailsPage.ts"/>
///<reference path="applicationFinishPage/ApplicationFinishPage.ts"/>
///<reference path="sendResultEmailPage/SendResultEmailPage.ts"/>
var PageFactory = (function () {
    function PageFactory() {
    }
    PageFactory.create = function (type) {
        console.log("PageFactory create by type " + type);
        if (type == "companiesTablePage") {
            return new CompaniesByUserDataPageTS();
        }
        else if (type == "benefitsByUserDataAndZeroDeductiblePage") {
            return new BenefitSelectionPage();
        }
        else if (type == "personDetailsPage") {
            return new PersonDetailsPage();
        }
        else if (type == "cardDetailsPage") {
            return new CardDetailsPage();
        }
        else if (type == "applicationCreationPage") {
            return new ApplicationCreationPage();
        }
        else if (type == "applicationFinishPage") {
            return new ApplicationFinishPage();
        }
        else if (type == "sendResultEmailPage") {
            return new SendResultEmailPage();
        }
        else if (type == "companyPlanSelection") {
            return new CompanyPlanSelectionPage();
        }
        else if (type == "simplePage") {
            return new UserInputFormPage();
        }
        else if (type == "datePickerYearAndMonthOnlyTestingPage") {
            return new DatePickerYearAndMonthOnlyTestingPage();
        }
    };
    return PageFactory;
}());
//# sourceMappingURL=PageFactory.js.map