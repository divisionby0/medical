///<reference path="../../../../../../plugins/medical_ensurance/js/admin/quote/persons/QuotePersonCollection.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/admin/quote/persons/PersonCollectionParser.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/admin/quote/persons/QuotePersonAdminView.ts"/>
///<reference path="../../email/EmailSender.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/admin/quote/persons/QuotePersonPDFView.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/questionairy/app/UserAnswersPDFView.ts"/>
///<reference path="../../htmlExport/HTMLExporter.ts"/>
declare var StringUtils:any;
declare function unescape(s:string):string;
class SendResultEmailPage{
    private $j:any;

    private data:any;
    private quoteData:any;
    private persons:QuotePersonCollection;
    
    private emailBodyHtml:string;
    private emailSender:EmailSender;
    
    private receiver:string = "";
    private appId:string;
    private emailBody:string;

    constructor(){
        this.$j = jQuery.noConflict();
        this.emailSender = new EmailSender();
    }

    public create():void{
        EventBus.addEventListener("APPLICATION_EMAIL_SENT_RESULT", (result)=>this.onApplicationEmailSentResult(result));
        EventBus.addEventListener("APPLICATION_ADMIN_EMAIL_SENT_RESULT", (result)=>this.onApplicationEmailAdminSentResult(result));
        EventBus.addEventListener("HTML_EXPORT_COMPLETE", (result)=>this.onHTMLExportComplete(result));
        
        var quoteDataString:string = this.getQuoteData();
        this.parseQuoteData(quoteDataString);
        
        this.updateBody();
        this.iteratePersons();

        var personsShortInfoHtml:string = this.createPersonsShortInfoHTML();
        console.log(personsShortInfoHtml);
        this.$j("#personsShortInfoContainer").html(personsShortInfoHtml);

        this.emailBodyHtml = this.$j("#emailBody").html();
        this.emailBodyHtml = this.decorateEmailBody();
        this.exportHtml();
    }

    private exportHtml():void {
        var htmlExporter:HTMLExporter = new HTMLExporter();
        htmlExporter.export(this.data.quoteId, this.emailBodyHtml);
    }

    private onHTMLExportComplete(result:string):void {
        //TODO validate result
        console.log("onHTMLExportComplete. result: "+result);

        var parsedResult:any = JSON.parse(result);
        this.appId = parsedResult.appId;
        var applicationHtmlFileUrl:string = parsedResult.url;
        console.log("applicationHtmlFileUrl="+applicationHtmlFileUrl);
        
       // var emailBody:string = "<b>Thanks</b> for your application. You can download it using <a href='"+applicationHtmlFileUrl+"'>this link</a> <a href='"+applicationHtmlFileUrl+"'>"+applicationHtmlFileUrl+"</a>. Best regards.";
        this.emailBody = '<b>Thanks</b> for your application. You can download it using this link <p><a href="'+applicationHtmlFileUrl+'" target="_blank">'+applicationHtmlFileUrl+'</a></p><p>Best regards</p>';
        console.log("emailBody="+this.emailBody);
        console.log("___appId="+this.appId);

        this.sendApplicationAdminEmail();

        //this.emailSender.sendApplicationResult(this.receiver, this.emailBody, this.appId);
    }
    
    private onApplicationEmailSentResult(result:string):void{
        var dialogContent:any = this.$j("<div>"+result+"</div>");
        dialogContent.dialog({modal: true, buttons: [
            { 
                text: "Ok", click: function (event) {
                    dialogContent.dialog("close");
                } 
            }
        ]});
    }

    private sendApplicationAdminEmail():void {
        console.log("sending application admin email...");
        this.emailSender.sendApplicationAdminEmail(this.appId);
    }
    private sendApplicationResultEmail():void {
        this.emailSender.sendApplicationResult(this.receiver, this.emailBody, this.appId);
    }

    private onApplicationEmailAdminSentResult(result:string):void{
        console.log("application admin email send result "+result);
        this.sendApplicationResultEmail();
    }

    private decorateEmailBody():string{
        var html:string = this.emailBodyHtml;
        return html;
    }

    private getQuoteData():any {
        return this.$j("#quoteDate").text();
    }

    private parseQuoteData(data:string) {
        this.data = JSON.parse(data);
        //console.log("Quote data: ",this.data);
        this.quoteData = JSON.parse(this.data.quoteData);
        this.persons = this.getPersons();
        this.receiver = unescape(this.data.email);
    }

    private getPersons():QuotePersonCollection {
        var personsData:string = this.data.persons;
        var personsParser:PersonCollectionParser = new PersonCollectionParser(personsData);

        return personsParser.parse();
    }

    private iteratePersons():void{
        var iterator:MapIterator = this.persons.getIterator();
        while(iterator.hasNext()){
            var person:QuotePerson = iterator.next();
            new QuotePersonAdminView(person, this.$j("#personsContainer"));
        }
    }

    private createPersonsShortInfoHTML():string{
        var html:string = "<h2><div style='width: 100%; background-color: #d9edf7; text-align: center;'>Insureds</div></h2><table><tbody>";
        var iterator:MapIterator = this.persons.getIterator();
        while(iterator.hasNext()){
            var person:QuotePerson = iterator.next();
            var firstName:string = person.getFirstName();
            var lastName:string = person.getLastName();
            var age:number = person.getAge();
            var birthday:string = person.getBirthday();
            var gender:string = person.getGender();

            var personContainerPrefix:string = "<tr>";
            var personContainerHtml:string = "<td style='padding-left: 10px; padding-right: 10px;'>FirstName:</td>";
            personContainerHtml+= "<td style='padding-left: 10px; padding-right: 10px;'><b>"+firstName+"</b></td>";
            personContainerHtml+= "<td style='padding-left: 10px; padding-right: 10px;'>Last name:</td>";
            personContainerHtml+= "<td style='padding-left: 10px; padding-right: 10px;'><b>"+lastName+"</b></td>";

            personContainerHtml+= "<td style='padding-left: 10px; padding-right: 10px;'>Age:</td>";
            personContainerHtml+= "<td style='padding-left: 10px; padding-right: 10px;'><b>"+age+"</b></td>";

            personContainerHtml+= "<td style='padding-left: 10px; padding-right: 10px;'>Birthday:</td>";
            personContainerHtml+= "<td style='padding-left: 10px; padding-right: 10px;'><b>"+birthday+"</b></td>";

            personContainerHtml+= "<td style='padding-left: 10px; padding-right: 10px;'>Gender:</td>";
            personContainerHtml+= "<td style='padding-left: 10px; padding-right: 10px;'><b>"+gender+"</b></td>";

            var personContainerPostfix:string= "</tr>";

            var personHTML:string = personContainerPrefix+personContainerHtml+personContainerPostfix;

            html+=personHTML;
        }

        html += "</tbody></table>";

        return html;
    }
    
    private updateBody():void{
        this.$j("#cardType").text(this.data.address);
        this.$j("#application").text("Application:   "+this.data.quoteId);
        this.$j("#company").html("Company: <b>"+unescape(this.data.companyName)+"</b>");

        var benefit:string = StringUtils.formatMoneyInt(this.quoteData.benefit);
        this.$j("#benefit").html("<b>"+benefit+"</b>");

        var deductible:string = StringUtils.formatMoneyInt(this.quoteData.deductible);
        this.$j("#deductible").html("<b>"+deductible+"</b>");

        var cost:string = StringUtils.formatDivisionalMoney(this.quoteData.cost);
        this.$j("#cost").html("<b>"+cost+"</b>");

        this.$j("#startDate").html("<b>"+this.quoteData.startDate+"</b>");
        this.$j("#finishDate").html("<b>"+this.quoteData.finishDate+"</b>");
        this.$j("#period").html("<b>"+this.quoteData.period+" day(s)</b>");

        this.updateCardInfo();
        this.updateVisitorsInfo();
    }

    private updateCardInfo():void{
        var cardNumberValue:string = unescape(StringUtils.decorateCardNumber(this.data.cardNumber));

        this.$j("#cardTypeContainer").html("<b>"+unescape(this.data.cardType)+"</b>");
        this.$j("#cardHolder").html("<b>"+unescape(this.data.cardHolderName)+"</b>");

        this.$j("#cardNumberContainer").html("<b>"+cardNumberValue+"</b>");
        this.$j("#cardExpDate").html("<b>***</b>");
    }

    private updateVisitorsInfo():void{
        this.$j("#countryOfOrigin").html("<b>"+unescape(this.data.countryOfOrigin)+"</b>");
        this.$j("#visitorType").html("<b>"+unescape(this.data.visitorType)+"</b>");
        this.$j("#arrivalDate").html("<b>"+unescape(this.data.arrivalDate)+"</b>");

        this.$j("#sponsorFirstName").html("<b>"+unescape(this.data.sponsorFirstName)+"</b>");
        this.$j("#sponsorLastName").html("<b>"+unescape(this.data.sponsorLastName)+"</b>");

        this.$j("#beneficiaryFirstName").html("<b>"+unescape(this.data.beneficiaryFirstName)+"</b>");
        this.$j("#beneficiaryLastName").html("<b>"+unescape(this.data.beneficiaryLastName)+"</b>");
        
        this.$j("#address").html("<b>"+unescape(this.data.address)+"</b>");
        this.$j("#city").html("<b>"+unescape(this.data.city)+"</b>");
        this.$j("#province").html("<b>"+unescape(this.data.province)+"</b>");
        this.$j("#postalCode").html("<b>"+unescape(this.data.postalCode)+"</b>");
        this.$j("#email").html("<b>"+unescape(this.data.email)+"</b>");
        this.$j("#phone").html("<b>"+unescape(this.data.phone)+"</b>");
    }


}
