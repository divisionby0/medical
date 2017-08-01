///<reference path="IDataRenderer.ts"/>
///<reference path="../../../questions/answer/Answer.ts"/>
///<reference path="../../../../libs/jqueryTS/jquery.d.ts"/>
class NodeTreeRenderer implements IDataRenderer{

    protected textLabel:any;
    protected data:any;
    protected container:any;
    protected children:any[] = new Array();
    protected enabled:boolean = true;
    protected childrenContainer:any;
    protected control:any;

    // background color
    protected depth:number=0;
    protected backgroundColorAlpha:number = 0.3;
    protected backgroundColorRGB:number[] = new Array(50, 205, 50);

    protected $j;

    constructor(data:any, container:any){
        this.$j = jQuery.noConflict();
        if(data && container){
            this.data = data;
            this.container = container;
            this.createChildren();
        }
    }
    
    setDepth(depth:number):void{
        this.depth = depth;
    }
    
    setEnabled(enabled:boolean):void{
        this.enabled = enabled;
        this.onEnabledChanged();
    }
    setContainer(container:any) {
        this.container = container;
    }

    setData(data:any):void {
        this.data = data;
    }

    getData():any {
        return this.data;
    }

    clear():void{
        for(var i:number=0; i<this.children.length;i++){
            var child:any = this.children[i];
            child.clear();
        }
    }

    protected onEnabledChanged():void{
        for(var i:number=0; i<this.children.length;i++){
            var child:any = this.children[i];
            child.setEnabled(this.enabled);
        }

        if(!this.textLabel){
            return;
        }
        else{
            if(this.enabled){
                this.textLabel.prop('disabled', false);
            }
            else{
                this.textLabel.prop('disabled', true);
            }
        }
    }
    
    protected createChildren():void{
        this.createChildrenContainer();
        this.createControl(this.childrenContainer);
        this.createText();
        this.updateText();
        this.drawBackground();
    }

    protected updateText():void{
        var text:string = this.data.getText();
        if(text){
            this.textLabel.html(text);
        }
    }
    
    protected createText():void {
        this.textLabel = this.$j('<div id="treeNodeText"></div>');
        this.childrenContainer.append(this.textLabel);
    }
    protected createChildrenContainer():void{
        this.childrenContainer = this.$j('<div id="childrenContainer" class="container subQuestionChildrenContainer"></div>');
        this.container.append(this.childrenContainer);
    }

    protected getControl():any{
        return null;
    }
    
    protected createControl(container:any):void{
        this.control = this.getControl();
        container.append(this.control);
    }

    protected drawBackground():void {
        var backgroundColor = "rgba("+this.backgroundColorRGB[0]+","+this.backgroundColorRGB[1]+","+this.backgroundColorRGB[2]+","+this.backgroundColorAlpha+")";
        this.childrenContainer.css({'background-color':backgroundColor });
    }
}
