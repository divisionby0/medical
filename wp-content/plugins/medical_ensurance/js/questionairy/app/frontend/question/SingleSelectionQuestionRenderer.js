var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="QuestionRenderer.ts"/>
///<reference path="../../../questions/question/Question.ts"/>
var SingleSelectionQuestionRenderer = (function (_super) {
    __extends(SingleSelectionQuestionRenderer, _super);
    function SingleSelectionQuestionRenderer(data, container) {
        _super.call(this, data, container);
    }
    SingleSelectionQuestionRenderer.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.control.val(this.options[0]);
        this.controlChangedHandler();
    };
    SingleSelectionQuestionRenderer.prototype.createChildren = function () {
        var _this = this;
        this.answer = this.data.getAnswer();
        this.value = this.answer.getValue();
        var formatCollection = new FormatCollection(this.answer);
        var items = formatCollection.format();
        new SortChildren(items);
        this.options = new Array();
        for (var i = 0; i < items.length; i++) {
            var answerVariation = items[i];
            this.options.push(answerVariation.getText());
        }
        this.createChildrenContainer();
        this.createText();
        this.updateText();
        this.createControl(this.childrenContainer);
        this.control.change(function () { return _this.controlChangedHandler(); });
    };
    SingleSelectionQuestionRenderer.prototype.getControl = function () {
        var control = this.$j('<select>');
        for (var i = 0; i < this.options.length; i++) {
            if (this.options[i] == this.value) {
                var option = this.$j('<option selected="selected">' + this.options[i] + '</option>');
            }
            else {
                var option = this.$j('<option>' + this.options[i] + '</option>');
            }
            control.append(option);
        }
        return control;
    };
    SingleSelectionQuestionRenderer.prototype.controlChangedHandler = function () {
        this.data.getAnswer().setValue(this.control.val());
    };
    /*
    setEnabled(enabled:boolean):void{
         this.enabled = enabled;

         if(this.enabled){
             this.control.attr('disabled', false);
             this.textLabel.removeClass("disabledElement");
         }
         else{
             this.control.attr('disabled', true);
             this.textLabel.addClass("disabledElement");
         }
         this.onEnabledChanged();
    }
    */
    SingleSelectionQuestionRenderer.prototype.onEnabledChanged = function () {
        if (this.enabled) {
            this.textLabel.removeClass('disabledElement');
        }
        else {
            this.textLabel.addClass('disabledElement');
        }
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            child.setEnabled(this.enabled);
        }
    };
    return SingleSelectionQuestionRenderer;
}(QuestionRenderer));
//# sourceMappingURL=SingleSelectionQuestionRenderer.js.map