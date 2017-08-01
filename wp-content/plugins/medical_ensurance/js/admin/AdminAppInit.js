var $ = jQuery.noConflict();

$(document).ready(function($) {
    console.log('document ready');

    var clearScccTableButton;
    var clearStandardRatesTableButton;

    var scccTableController = new TableController();
    scccTableController.init(SCCC_TABLE, "scccTable", "scccTable_editor", "scccTableContainer");

    var standardRatesTableController = new TableController();
    standardRatesTableController.init(STANDARD_RATES_TABLE, "standardRatesTable", "standardRatesTable_editor", "standardRatesTableContainer");

    var benefitsMetabox;
    var deductibleAmountsMetabox;
    var ratesMetabox;
    var deductibleAmountOptionsMetabox;

    function createClearTableButtons(){
        clearScccTableButton = new ClearTableButton();
        clearScccTableButton.init($('#clearScccTableButton'), SCCC_TABLE);

        clearStandardRatesTableButton = new ClearTableButton();
        clearStandardRatesTableButton.init($('#clearStandardRatesTableButton'), STANDARD_RATES_TABLE);
    }

    function addTableRendererListener(){
        EventBus.removeEventListener(RENDERER_VALUE_CHANGED, rendererValueChangedHandler);
        EventBus.addEventListener(RENDERER_VALUE_CHANGED, rendererValueChangedHandler);
    }
    function addClearTableButtonListener(){
        EventBus.addEventListener(CLEAR_TABLE_BUTTON_CLICK, clearTableButtonClickHandler);
    }

    function onNewTableRowAdded(){
        addTableRendererListener();
    }

    // TODO перенести это в контроллер таблицы
    function rendererValueChangedHandler(eventData){
        console.log('value changed');
        var elementContext = eventData.context;
        var rowId = eventData.rowId;
        var columnKey = eventData.columnKey;
        var newValue = eventData.newValue;

        if(elementContext === SCCC_TABLE){
            scccTableController.valueChanged(rowId, columnKey, newValue);
        }
        else if(elementContext === STANDARD_RATES_TABLE){
            standardRatesTableController.valueChanged(rowId, columnKey, newValue);
        }
        else{
            console.error('Unknown context.');
        }
    }

    function clearTableButtonClickHandler(eventData){
        var elementContext = eventData.context;
        if(elementContext === SCCC_TABLE){
            scccTableController.clear();
        }
        else if(elementContext === STANDARD_RATES_TABLE){
            standardRatesTableController.clear();
        }
        else{
            console.error('Unknown context.');
        }
    }

    function createBenefitsMetaBox(){
        console.log("createBenefitsMetaBox");
        benefitsMetabox = new CollectionMetaBox();
        benefitsMetabox.init(BENEFIT_AMOUNT, 'addBenefitButton', 'removeBenefitButton', 'benefitsSelect', 'benefitsEditorInput', 'benefits');
    }

    function createDeductibleAmountsMetaBox(){
        deductibleAmountsMetabox = new CollectionMetaBox();
        deductibleAmountsMetabox.init(DEDUCTIBLE, 'addDeductibleButton', 'removeDeductibleButton', 'deductiblesSelect', 'deductiblesEditorInput', 'deductibles');
    }

    function createRatesMetaBox(){
        var companyDeductibles = deductibleAmountsMetabox.getValues();
        ratesMetabox = new RatesMetaBox();
        ratesMetabox.init(RATE, 'addRateButton', 'removeRateButton', 'rateTableSelect', RATE_TABLE_EDITOR_ID, 'rates', companyDeductibles);
    }

    function createDeductibleAmountOptionsMetaBox(){
        var companyDeductibles = deductibleAmountsMetabox.getValues();
        var companyAggregatePolicyLimits = benefitsMetabox.getValues();
        deductibleAmountOptionsMetabox = new DeductibleAmountOptionsMetabox();
        deductibleAmountOptionsMetabox.init(companyDeductibles, companyAggregatePolicyLimits);

        EventBus.addEventListener(COLLECTION_ITEM_ADDED, onCollectionItemChanged);
        EventBus.addEventListener(COLLECTION_ITEM_REMOVED, onCollectionItemChanged);
    }

    function createFamilyRateMaxAgeMetabox(){
        var familyRateMaxAgeMetabox = new FamilyRateMaxAgeMetabox();
        familyRateMaxAgeMetabox.init();
    }

    function createQuestionary(){
        var questionaryAdminInit = new QuestionaryAdminInitor();
        questionaryAdminInit.create();
    }
    
    function onCollectionItemChanged(eventData){
        var itemType = eventData.type;
        if(itemType == DEDUCTIBLE){
            deductibleAmountOptionsMetabox.updateDeductiblesCollection(deductibleAmountsMetabox.getValues());
        }
        else if(itemType == BENEFIT_AMOUNT){
            deductibleAmountOptionsMetabox.updateAggregatePolicyLimitsCollection(benefitsMetabox.getValues());
        }
    }

    createClearTableButtons();
    addClearTableButtonListener();
    addTableRendererListener();

    createBenefitsMetaBox();
    createDeductibleAmountsMetaBox();

    createRatesMetaBox();
    createDeductibleAmountOptionsMetaBox();

    createFamilyRateMaxAgeMetabox();

    createQuestionary();

    EventBus.addEventListener(NEW_TABLE_ROW_ADDED, onNewTableRowAdded);
});

