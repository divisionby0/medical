var AgesSelection = function(){
    var $ = jQuery.noConflict();

    var ageRowsElements = new Map('agesElements');
    var elementIds;
    var agesArray = new Array();
    var dataContainerElement;

    function numPersonsChangedHandler(event) {
        onNumPersonsChanged(event.data);
    }

    function onNumPersonsChanged(totalPersons){
        showRows(totalPersons);
    }

    function showRows(total){
        for(var i = elementIds.length - 1; i > -1; i--){
            var element = ageRowsElements.get(elementIds[i]);

            if(i < total){
                element.removeClass('invisible');
                var age = $('#agesSelect_'+i).val();
                onAgeChanged(i, age);
            }
            else{
                clearAgeSelect(i);
                clearBirthdaySelect(i);
                onAgeRemoved(i);
                element.addClass('invisible');
            }
        }
    }

    function clearAgeSelect(id){
        $('#agesSelect_'+id).val(0);
    }
    function clearBirthdaySelect(id){
        $('#ageCalendarInput_'+id).val('');
    }

    function getRowElements(){
        $('.ageRow').each(function( index ) {
            var rowElementId = $( this ).attr('id');
            rowElementId = rowElementId.replace('ageRow_','');
            addAgeRowElementToCollection(rowElementId, $( this ));
        });
        getRowsIDs();
    }

    function getRowsIDs(){
        elementIds = ageRowsElements.getKeys();
    }

    function addAgeRowElementToCollection(id, element){
        ageRowsElements.add(id, element);
    }

    function ageChangedHandler(event){
        var id = event.id;
        var value = event.value;
        onAgeChanged(id, value);
    }

    function onAgeRemoved(id){
        agesArray.splice(id, 1);

        updateDataContainer();
    }

    function onAgeChanged(id, age){
        agesArray[id] = age;
        updateDataContainer();
    }

    function onSavedAgesChangedHandler(event){
        var savedAges = parseSavedAges(event.data);
        for(var i=0; i<savedAges.length; i++){
            onAgeChanged(i, savedAges[i]);
        }
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

    function updateDataContainer(){
        dataContainerElement.val(JSON.stringify(agesArray));
    }

    function getDataContainer(){
        dataContainerElement = $('#ages');
    }

    function addAgesSelectorsListener() {
        // СТРАХ !!!
        // iterate over all selects with partial id
        $('select[id^="agesSelect_"]').each(function(index){
            var select = $(this);

            // listen to select changed event
            select.on('change',function(){
                var id = index;
                var age = $(this).val();
                onAgeChanged(id, age);

                // clear birthday input
                clearBirthdayInput(id);
            });
        });
    }

    function clearBirthdayInput(id){
        $('#ageCalendarInput_'+id).val('');
    }

    return{
        init:function(){
            getDataContainer();
            getRowElements();
            
            showRows(1);
            updateDataContainer();
            addAgesSelectorsListener();

            EventBus.addEventListener('NUM_PERSONS_CHANGED', numPersonsChangedHandler);
            EventBus.addEventListener('ON_AGE_CHANGED', ageChangedHandler);
            EventBus.addEventListener('SAVED_AGES_CHANGED', onSavedAgesChangedHandler);
        }
    }
}
