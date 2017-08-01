///<reference path="../../libs/jqueryTS/jquery.d.ts"/>
class PageMarkupResposabilityTS{

    private $j:any;
    
    constructor(){
        this.$j = jQuery.noConflict();
    }
    
    public removeResponsabilityMarkup():void{
        this.$j("meta[width='device-width']").remove();
        this.$j("meta[initial-scale='1.0']").remove();
    }
}
