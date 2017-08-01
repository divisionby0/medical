///<reference path="FileLoaderEventType.ts"/>
///<reference path="../../../libs/jqueryTS/jquery.d.ts"/>
///<reference path="../../../events/EventBus.ts"/>
class FileLoader{
    load(url:string):void{
        $.ajax({
            url: url,
            async: false,
            success: function (data){
                //console.log("loaded",data);
                EventBus.dispatchEvent(FileLoaderEventType.LOAD_COMPLETE, data);
            },
            error:function(xhr, ajaxOptions, thrownError){
                //console.error(xhr, ajaxOptions,thrownError);
                EventBus.dispatchEvent(FileLoaderEventType.LOAD_ERROR, thrownError);
            }
        });
    }
}
