///<reference path="FileSaver.ts"/>
class SaveFile{

    private fileSaver:FileSaver = new FileSaver();
    
    execute(data:string):void{
        this.createFileSaverListeners();
        this.fileSaver.save(data);
    }

    private createFileSaverListeners():void{
        EventBus.addEventListener(FileSaverEventType.SAVE_COMPLETE, (data)=>this.fileSaveCompleteHandler(data));
        EventBus.addEventListener(FileSaverEventType.SAVE_ERROR, (error)=>this.fileSaveErrorHandler(error));
    }
    private removeFileSaverListeners():void{
        EventBus.removeEventListener(FileSaverEventType.SAVE_COMPLETE, (data)=>this.fileSaveCompleteHandler(data));
        EventBus.removeEventListener(FileSaverEventType.SAVE_ERROR, (error)=>this.fileSaveErrorHandler(error));
    }

    private fileSaveCompleteHandler(data):void{
        this.removeFileSaverListeners();
        alert("File saved");
    }
    private fileSaveErrorHandler(data):void{
        this.removeFileSaverListeners();
        alert("File save error: "+data);
    }
}

