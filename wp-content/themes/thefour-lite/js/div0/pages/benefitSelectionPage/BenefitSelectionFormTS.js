var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../views/SelectionForm.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/events/EventBus.ts"/>
var BenefitSelectionFormTS = (function (_super) {
    __extends(BenefitSelectionFormTS, _super);
    function BenefitSelectionFormTS(selectedItem, inputElementId, formId, tableId) {
        _super.call(this, selectedItem, inputElementId, formId, tableId);
    }
    // override
    BenefitSelectionFormTS.prototype.submitForm = function () {
        EventBus.dispatchEvent("BENEFIT_SELECTED", this.selectedItem);
    };
    return BenefitSelectionFormTS;
}(SelectionForm));
//# sourceMappingURL=BenefitSelectionFormTS.js.map