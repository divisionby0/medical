class RendererFactoryClass{
    private static _class:any;
    
    static setClass(value:any):void{
        this._class = value;
    }
    static getClass():any{
        return this._class;
    }
}
