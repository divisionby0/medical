///<reference path="../questions/collection/QuestionsCollection.ts"/>
///<reference path="loader/FileLoader.ts"/>
///<reference path="../questions/parsers/QuestionCollectionParser.ts"/>
///<reference path="frontend/UserQuestionsRendererFactory.ts"/>
///<reference path="../../collections/Map.ts"/>
///<reference path="../../collections/json/MapJsonDecoder.ts"/>
///<reference path="../../events/EventBus.ts"/>
class BaseApplication{
    protected questions:QuestionsCollection;
    protected dataFileUrl:string = "data.txt";
    protected map:Map<any>;

    protected $j;
    protected dataString:string;
    protected containerId:string;
    
    constructor(dataString:string, containerId:string){
        this.dataString = dataString;
        this.containerId = containerId;
        this.$j = jQuery.noConflict();
        this.init();
    }

    protected init():void{
        
    }

    protected onDataLoaded(data:string):void {
        var isJson:boolean = this.isJson(data);
        console.log("isJson: ",isJson);
        if(isJson){
            var dataDecoder:MapJsonDecoder = new MapJsonDecoder(data);
            this.map = dataDecoder.decode();
        }
        else{
            this.map = new Map("questions");
        }
    }

    private isJson(data:string):boolean{
        var returnValue:boolean = true;

        try
        {
            var json = JSON.parse(data);
        }
        catch(e)
        {
            returnValue = false;
        }

        return returnValue;
    }
}
