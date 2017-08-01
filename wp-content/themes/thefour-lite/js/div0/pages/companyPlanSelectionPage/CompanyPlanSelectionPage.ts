///<reference path="../../Cookie.ts"/>
///<reference path="../views/SelectionForm.ts"/>
///<reference path="CompanyPlanSelectionForm.ts"/>
///<reference path="../../../../../../plugins/medical_ensurance/js/collections/json/MapJsonDecoder.ts"/>
///<reference path="../../utils/NavigatorUtil.ts"/>
declare var StringUtils;
class CompanyPlanSelectionPage{
    private $j:any;

    private nextPage:string = "/application-creation";

    private companyCosts:Map<string>;
    
    constructor(){
        
        this.$j = jQuery.noConflict();
    }
    
    public create():void{
        var companyData:any = this.getCompany();
        var mapDecoder:MapJsonDecoder = new MapJsonDecoder(companyData.deductiblesCosts);
        this.companyCosts = mapDecoder.decode();
        this.createCostSelectionForm();
        EventBus.addEventListener("COMPANY_PLAN_SELECTED", (data)=>this.companyPlanSelectedHandler(data));
    }

    private navigateToNextPage():void{
        NavigatorUtil.navigateTo(this.nextPage);
    }

    private getCompany():any{
        var companyDecodedData:string = Cookie.getSelectedCompanyData();
        var companyData:any = StringUtils.parseURI(companyDecodedData);
        return companyData;
    }
    
    private saveSelectedPlan(deductible:any, cost:any):void{
        Cookie.setCompanyPlan(JSON.stringify({deductible:deductible, cost:cost}));
    }
    
    private createCostSelectionForm():void {
        var savedPlanData:any = Cookie.getCompanyPlan();
        var parsedData = StringUtils.parseURI(savedPlanData);
        var savedPlan:any = parsedData;

        var savedDeductible:number = -1;
        if(savedPlan){
            savedDeductible = savedPlan.deductible;
        }
        var costSelectionForm:SelectionForm = new CompanyPlanSelectionForm(savedDeductible, "selectedPlanInput", "planSelectionForm", "planSelectionTable");
    }

    private companyPlanSelectedHandler(data:any):void {
        var deductible:string = data.deductible;
        var cost:string = this.companyCosts.get(deductible);

        this.saveSelectedPlan(deductible, cost);
        this.navigateToNextPage();
    }
}
