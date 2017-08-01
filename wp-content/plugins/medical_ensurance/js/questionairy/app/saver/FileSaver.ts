///<reference path="FileSaverEventType.ts"/>
///<reference path="../../../libs/jqueryTS/jquery.d.ts"/>
///<reference path="../../../events/EventBus.ts"/>
class FileSaver{
    save(data:string):void{
        $.ajax({
            url: 'saveFile.php',
            type: "POST",
            async: false,
            data: {data:data},
            dataType : 'text',
            success: function (data){
                console.log("file saved. data=",data);
                if(data = "file_saved"){
                    EventBus.dispatchEvent(FileSaverEventType.SAVE_COMPLETE, data);
                }
                else{
                    EventBus.dispatchEvent(FileSaverEventType.SAVE_ERROR, data);
                }
            },
            error:function(xhr, ajaxOptions, thrownError){
                console.error(xhr, ajaxOptions,thrownError);
                EventBus.dispatchEvent(FileSaverEventType.SAVE_ERROR, data);
                //EventBus.dispatchEvent(FileLoaderEventType.LOAD_ERROR, thrownError);
            }
        });
    }
}
