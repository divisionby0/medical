///<reference path="../BasePage.ts"/>
///<reference path="../../utils/Emails.ts"/>
class ComposeEmailTestingPage extends BasePage{
    
    constructor(){
        super();
    }

    public create():void{
        console.log("ComposeEmailTestingPage create...");
        var emails:Emails = new Emails();
        var hasMedicalIssuesEmailText:string = emails.composeMedicalIssuesEmailText("111");
        var hasNoMedicalIssuesEmailText:string = emails.composeNoMedicalIssuesEmailText("222")
        
        console.log("hasMedicalIssuesEmailText = "+hasMedicalIssuesEmailText);
        console.log("hasNoMedicalIssuesEmailText = "+hasNoMedicalIssuesEmailText);
        
    }
}