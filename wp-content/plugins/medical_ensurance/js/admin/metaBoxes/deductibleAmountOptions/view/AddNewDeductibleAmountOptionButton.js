var AddNewDeductibleAmountOptionButton = function(){
    var element;
    var $ = jQuery.noConflict();

    return{
        init:function(){
            getElement();
            createListener();
        }
    }

    function getElement(){
        element = $('#addDeductibleAmountOptionButton');
    }

    function createListener(){
        element.on('click', function(){
            dispatchClickedEvent();
        });
    }
    
    function dispatchClickedEvent(){
        EventBus.dispatchEvent(NEW_DEDUCTIBLE_AMOUNT_OPTION_REQUEST);
    }
}
