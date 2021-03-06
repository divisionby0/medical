///<reference path="FileLoaderEventType.ts"/>
///<reference path="../../../libs/jqueryTS/jquery.d.ts"/>
///<reference path="../../../events/EventBus.ts"/>
var FileLoader = (function () {
    function FileLoader() {
    }
    FileLoader.prototype.load = function (url) {
        $.ajax({
            url: url,
            async: false,
            success: function (data) {
                //console.log("loaded",data);
                EventBus.dispatchEvent(FileLoaderEventType.LOAD_COMPLETE, data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //console.error(xhr, ajaxOptions,thrownError);
                EventBus.dispatchEvent(FileLoaderEventType.LOAD_ERROR, thrownError);
            }
        });
    };
    return FileLoader;
}());
//# sourceMappingURL=FileLoader.js.map