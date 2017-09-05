class Emails{

    private noMedicalIssuesEmailText:string = '<b>Thanks</b> for your application. You can download it using this link <p><a href="applicationHtmlUrlString" target="_blank">applicationHtmlUrlString</a></p><p>Best regards</p>';
    private medicalIssuesEmailText:string = '<b>Thanks</b> for your application. You have medical issues. You can download it using this link <p><a href="applicationHtmlUrlString" target="_blank">applicationHtmlUrlString</a></p><p>Best regards</p>';

    constructor(){

    }

    public composeNoMedicalIssuesEmailText(htmlUrl:string):string{
        var compositionString:string = this.noMedicalIssuesEmailText.replace(/applicationHtmlUrlString/g, htmlUrl);
        console.log("returning "+compositionString);
        return compositionString;
    }
    public composeMedicalIssuesEmailText(htmlUrl:string):string{
        var compositionString:string = this.medicalIssuesEmailText.replace(/applicationHtmlUrlString/g, htmlUrl);
        console.log("returning "+compositionString);
        return compositionString;
    }
}
