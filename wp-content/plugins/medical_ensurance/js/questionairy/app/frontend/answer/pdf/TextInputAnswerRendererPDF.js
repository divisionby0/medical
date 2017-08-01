var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="AnswerRendererPDF.ts"/>
///<reference path="../../../../questions/question/Question.ts"/>
///<reference path="../../collection/FormatCollection.ts"/>
///<reference path="../../RendererFactoryClass.ts"/>
var TextInputAnswerRendererPDF = (function (_super) {
    __extends(TextInputAnswerRendererPDF, _super);
    function TextInputAnswerRendererPDF(data, container) {
        _super.call(this, data, container);
    }
    TextInputAnswerRendererPDF.prototype.createChildren = function () {
        this.createChildrenContainer();
        this.createText();
        this.updateText();
        this.orderChildren();
    };
    TextInputAnswerRendererPDF.prototype.orderChildren = function () {
        /*
        var formatCollection:FormatCollection = new FormatCollection(this.data.getAnswer());
        var items:Question[] = formatCollection.format();
        new SortChildren(items);

        for(var i:number = 0; i<items.length; i++){
            var child:ICompositeNode = items[i];
            var type:string;
            type = child.getType();
            var questionRenderer:any = RendererFactoryClass.getClass().create(type, child, this.container);
            this.children.push(questionRenderer);
        }
        */
    };
    return TextInputAnswerRendererPDF;
}(AnswerRendererPDF));
//# sourceMappingURL=TextInputAnswerRendererPDF.js.map