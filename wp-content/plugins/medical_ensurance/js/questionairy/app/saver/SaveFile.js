///<reference path="FileSaver.ts"/>
var SaveFile = (function () {
    function SaveFile() {
        this.fileSaver = new FileSaver();
    }
    SaveFile.prototype.execute = function (data) {
        this.createFileSaverListeners();
        this.fileSaver.save(data);
    };
    SaveFile.prototype.createFileSaverListeners = function () {
        var _this = this;
        EventBus.addEventListener(FileSaverEventType.SAVE_COMPLETE, function (data) { return _this.fileSaveCompleteHandler(data); });
        EventBus.addEventListener(FileSaverEventType.SAVE_ERROR, function (error) { return _this.fileSaveErrorHandler(error); });
    };
    SaveFile.prototype.removeFileSaverListeners = function () {
        var _this = this;
        EventBus.removeEventListener(FileSaverEventType.SAVE_COMPLETE, function (data) { return _this.fileSaveCompleteHandler(data); });
        EventBus.removeEventListener(FileSaverEventType.SAVE_ERROR, function (error) { return _this.fileSaveErrorHandler(error); });
    };
    SaveFile.prototype.fileSaveCompleteHandler = function (data) {
        this.removeFileSaverListeners();
        alert("File saved");
    };
    SaveFile.prototype.fileSaveErrorHandler = function (data) {
        this.removeFileSaverListeners();
        alert("File save error: " + data);
    };
    return SaveFile;
}());
//# sourceMappingURL=SaveFile.js.map