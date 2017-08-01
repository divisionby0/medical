///<reference path="../../../../../plugins/medical_ensurance/js/events/EventBus.ts"/>
declare var ajaxurl;
class HTMLExporter{

    private $j:any;
    //private siteUrl:string;

    constructor(){
        this.$j = jQuery.noConflict();
        //this.siteUrl = this.$j("#siteUrlContainer").text();
    }

    public export(id:string, content:string):void{
        var dataToSave:any = this.createApplicationResultData(id, content);
        this.$j.post(ajaxurl, dataToSave, (response) => this.onComplete(response));
    }

    private createApplicationResultData(id:string, content:string):any{
        return {'action':'saveApplicationHTML',
            'appId':id,
            'appContent':content
        };
    }

    private onComplete(response:any):void {
        //console.log("html export response: ",response);
        EventBus.dispatchEvent("HTML_EXPORT_COMPLETE",response);
    }
}
