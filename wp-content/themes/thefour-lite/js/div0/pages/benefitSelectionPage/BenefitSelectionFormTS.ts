///<reference path="../views/SelectionForm.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/events/EventBus.ts"/>
class BenefitSelectionFormTS extends SelectionForm{
    constructor(selectedItem:any, inputElementId:string, formId:string, tableId:string){
        super(selectedItem, inputElementId, formId, tableId);
    }

    // override
    protected submitForm(){
        EventBus.dispatchEvent("BENEFIT_SELECTED", this.selectedItem);
    }
}
