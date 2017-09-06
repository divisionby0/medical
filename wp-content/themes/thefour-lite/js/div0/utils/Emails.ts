class Emails{

    private noMedicalIssuesEmailText:string = '<p><b>Thank you for your order!</b></p><p>Please find your application attached.</p><p><a href="applicationHtmlUrlString" target="_blank">applicationHtmlUrlString</a></p><p>Please check your application to ensure that the information you provided to us is correct. You will also receive an email soon with your Visitors to Canada Insurance Policy from the insurance company. If you need to make any changes to your application, or have any questions related to your order, email us at: <a href="mailto:CustomerSupport@InsureYourStay.ca">CustomerSupport@InsureYourStay.ca</a></p>';
    private medicalIssuesEmailText:string =   '<p><b>Thank you for your application!</b></p><p>Please find your application attached.</p><p><a href="applicationHtmlUrlString" target="_blank">applicationHtmlUrlString</a></p><p>Please check your application to ensure that the information you provided to us is correct.</p><p style="color: #a60021;"><b>Important:</b></p><p style="color: #a60021;"><b>Next Step to Complete Your Application</b></p><p>You selected that you had a medical condition you wished to have covered... Please send an email to us explaining the nature of your medical condition. Include your phone number and the best time of day to contact you, and we will call you to complete your application and process your payment. If you need to make any changes to your application, or have any questions related to your order, please include them in your email. Email us at: <a href="mailto:CustomerSupport@InsureYourStay.ca">CustomerSupport@InsureYourStay.ca</a></p>';

    constructor(){

    }

    public composeNoMedicalIssuesEmailText(htmlUrl:string):string{
        var compositionString:string = this.noMedicalIssuesEmailText.replace(/applicationHtmlUrlString/g, htmlUrl);
        return compositionString;
    }
    public composeMedicalIssuesEmailText(htmlUrl:string):string{
        var compositionString:string = this.medicalIssuesEmailText.replace(/applicationHtmlUrlString/g, htmlUrl);
        return compositionString;
    }
}
