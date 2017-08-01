var NumPersons = function(){

    var $ = jQuery.noConflict();

    function onSavedNumPersonsHandler(event){
        $('#numPersonsSelect').val(event.data);
        EventBus.dispatchEvent('NUM_PERSONS_CHANGED', {data:event.data});
    }

    return{
        init:function(){
            EventBus.addEventListener('SAVED_NUM_PERSONS_CHANGED', onSavedNumPersonsHandler);

            $('#numPersonsSelect').change(function(){
                EventBus.dispatchEvent('NUM_PERSONS_CHANGED', {data:$(this).val()});
            });
        }
    }
}
