///<reference path="../../../../../plugins/medical_ensurance/js/utils/Cookie.ts"/>
declare var DateUtils:any;
class QuoteId{

    private $j:any;
    private id:string;
    private cookieValue:string;
    
    constructor(value:string){
        this.$j = jQuery.noConflict();
        //this.cookieValue = Cookie.getQuoteId();
        this.cookieValue = value;
        this.decorateQuoteIdWithCurrentDate();
    }
    
    private decorateQuoteIdWithCurrentDate():void{
        var now:any = new Date();
        var year:string = now.getFullYear();
        var month:string = now.getMonth();
        var day:string = now.getDate();

        var hours:string = now.getHours();
        var minutes:string = now.getMinutes();
        var seconds:string = now.getSeconds();

        this.id = DateUtils.getCurrentDate()+"__"+hours+"-"+minutes+"-"+seconds;
    }
    
    public getTempValue():string{
        return this.cookieValue;
    }
    
    public getId():string{
        return this.id;
    }
}
