///<reference path="applicationCreationPage/ApplicationCreationPage.ts"/>
///<reference path="personDetailsPage/PersonDetailsPage.ts"/>
///<reference path="companyPlanSelectionPage/CompanyPlanSelectionPage.ts"/>
///<reference path="companiesByUserDataPage/CompaniesByUserDataPageTS.ts"/>
///<reference path="cardDetailsPage/CardDetailsPage.ts"/>
///<reference path="applicationFinishPage/ApplicationFinishPage.ts"/>
///<reference path="sendResultEmailPage/SendResultEmailPage.ts"/>
declare var CompaniesByUserDataPage;
declare var BenefitSelectionPage;
declare var UserInputFormPage;
class PageFactory {
    public static create(type:string):any{
        console.log("PageFactory create by type "+type);

        if(type == "companiesTablePage"){
            return new CompaniesByUserDataPageTS();
        }
        else if(type == "benefitsByUserDataAndZeroDeductiblePage"){
            return new BenefitSelectionPage();
        }
        else if(type == "personDetailsPage"){
            return new PersonDetailsPage();
        }
        else if(type == "cardDetailsPage"){
            return new CardDetailsPage();
        }
        else if(type == "applicationCreationPage"){
            return new ApplicationCreationPage();
        }
        else if(type == "applicationFinishPage"){
            return new ApplicationFinishPage();
        }
        else if(type == "sendResultEmailPage"){
            return new SendResultEmailPage();
        }
        else if(type == "companyPlanSelection"){
            return new CompanyPlanSelectionPage();
        }
        else if(type == "simplePage"){
            return new UserInputFormPage();
        }
        else if(type == "datePickerYearAndMonthOnlyTestingPage"){
            return new DatePickerYearAndMonthOnlyTestingPage();
        }
    }
}
