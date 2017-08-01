///<reference path="../../../../../plugins/medical_ensurance/js/events/EventBus.ts"/>
declare var ajaxurl;
class EmailSender{

    private $j:any;

    constructor(){
        this.$j = jQuery.noConflict();
    }

    public sendApplicationResult(receiver:string, emailContent:string, appId:string){
        var dataToSave:any = this.createApplicationResultData(receiver, emailContent, appId);
        this.$j.post(ajaxurl, dataToSave, (response) => this.onComplete(response));
    }

    public sendApplicationAdminEmail(appId:string){
        var dataToSave:any = {'action':'sendApplicationAdminEmail',
            'appId':appId
        };
        this.$j.post(ajaxurl, dataToSave, (response) => this.onApplicationAdminEmailSent(response));
    }

    
    private createApplicationResultData(receiver:string, emailContent:string, appId:string):any{
        //console.log("appId:"+appId);
        return {'action':'sendApplicationResultEmail',
            'receiver':receiver,
            'body':emailContent,
            'appId':appId
        };
    }

    private onComplete(response:any):void {
        EventBus.dispatchEvent("APPLICATION_EMAIL_SENT_RESULT", response);
    }

    private onApplicationAdminEmailSent(response:any):void {
        EventBus.dispatchEvent("APPLICATION_ADMIN_EMAIL_SENT_RESULT", response);
    }
}
