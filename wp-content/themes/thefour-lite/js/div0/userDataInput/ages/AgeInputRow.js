var AgeInputRow = function(){

    var $ = jQuery.noConflict();

    var savedAges;

    function createListener(){
        $('[id*="ageRow_"]').click(function(){
            var id = parseId($(this).attr('id'));
            var rowState = $(this).data('rowstate');
        });

        EventBus.addEventListener('SAVED_AGES_CHANGED', onSavedAgesChangedHandler);
    }

    function onSavedAgesChangedHandler(event){
        savedAges = parseSavedAges(event.data);
        updateAgeSelectElements();
    }

    function parseId(string){
        return string.substring(7, string.length);
    }

    function onLegendClick(){

    }

    function parseSavedAges(ages){
        if(typeof ages === 'string' || ages instanceof String){
            ages = ages.replace(/\\/g, '');
            return JSON.parse(ages);
        }
        else{
            return ages;
        }
    }

    function updateAgeSelectElements(){
        for(var i=0; i<savedAges.length; i++){
            var id = i;
            var element = $('#agesSelect_'+id).val(savedAges[i]);
        }
    }
    
    return{
        init:function(){
            createListener();
        }
    }
}
