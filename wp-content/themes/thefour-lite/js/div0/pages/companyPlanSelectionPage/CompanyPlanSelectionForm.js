var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../views/SelectionForm.ts"/>
///<reference path="../../Cookie.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/events/EventBus.ts"/>
var CompanyPlanSelectionForm = (function (_super) {
    __extends(CompanyPlanSelectionForm, _super);
    function CompanyPlanSelectionForm(selectedItem, inputElementId, formId, tableId) {
        _super.call(this, selectedItem, inputElementId, formId, tableId);
    }
    // override
    CompanyPlanSelectionForm.prototype.submitForm = function () {
        EventBus.dispatchEvent("COMPANY_PLAN_SELECTED", { deductible: this.selectedItem });
    };
    return CompanyPlanSelectionForm;
}(SelectionForm));
//# sourceMappingURL=CompanyPlanSelectionForm.js.map