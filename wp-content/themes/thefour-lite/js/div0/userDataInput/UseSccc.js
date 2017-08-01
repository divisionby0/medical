var UseSccc = function(){

    var $ = jQuery.noConflict();

    function addListener(){
        EventBus.addEventListener('SAVED_USE_SCCC_CHANGED', onUseScccSavedDataHandler);
    }

    function onUseScccSavedDataHandler(event){
        updateRadioGroup(event.data);
    }

    function updateRadioGroup(value){
        $("input[name=scccCovering][value=" + value + "]").attr('checked', 'checked');
    }

    return{
        init:function(){
            addListener();
        }
    }
}
