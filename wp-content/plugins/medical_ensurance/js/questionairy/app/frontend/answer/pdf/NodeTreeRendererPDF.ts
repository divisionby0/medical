///<reference path="../../view/NodeTreeRenderer.ts"/>
class NodeTreeRendererPDF extends NodeTreeRenderer{
    constructor(data:any, container:any){
        super(data, container);
    }

    protected createChildrenContainer():void{
        this.childrenContainer = this.$j('<tr></tr>');
        this.container.append(this.childrenContainer);
    }

    protected createText():void {
        this.textLabel = this.$j('<table id="treeNodeText"></table>');
        this.childrenContainer.append(this.textLabel);
    }
}
