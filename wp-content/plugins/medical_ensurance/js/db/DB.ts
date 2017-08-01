///<reference path="../events/EventBus.ts"/>
declare var ajaxurl:string;
class DB{
    
    public static savePersons(data:string, quoteId:string):void{

        var j:any = jQuery.noConflict();

        var dataToSave:any = {'action':'saveTempQuotePersons',
            'quoteId':quoteId,
            'data':data
        };

        j.post(ajaxurl, dataToSave, function(response){
            //console.log("save persons response: "+response);
        });
    }
    
    public static loadPersons(quoteId:string):void{
        var j:any = jQuery.noConflict();

        var requestData:any = {'action':'loadTempQuotePersons',
            'quoteId':quoteId
        };

        j.post(ajaxurl, requestData, function(response){
            EventBus.dispatchEvent("personsDataLoadComplete", response);
        });
    }
    
    public static deletePersons(quoteId:string):void{
        var j:any = jQuery.noConflict();

        var requestData:any = {'action':'removeTempQuotePersons',
            'quoteId':quoteId
        };

        j.post(ajaxurl, requestData, function(response){
            console.log("persons temp record removed data: "+response);
        });
    }
}
