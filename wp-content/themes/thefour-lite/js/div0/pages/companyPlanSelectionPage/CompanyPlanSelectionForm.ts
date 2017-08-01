///<reference path="../views/SelectionForm.ts"/>
///<reference path="../../Cookie.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/events/EventBus.ts"/>
class CompanyPlanSelectionForm extends SelectionForm{
    constructor(selectedItem:any, inputElementId:string, formId:string, tableId:string){
        super(selectedItem, inputElementId, formId, tableId);
    }

    // override
    protected submitForm(){
        EventBus.dispatchEvent("COMPANY_PLAN_SELECTED", {deductible:this.selectedItem});
    }
}
