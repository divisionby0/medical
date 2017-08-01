var StartDateCalendar = function(){

    var $ = jQuery.noConflict();

    console.log("IM start date calendar");

    function updateInputs(year, month, day){
        $('#startDateMonth').val(month);
        $('#startDateYear').val(year);
        $('#startDateDay').val(day);
    }
    
    function onChange(dateText){
        var dateArray = DateUtils.parseToArray(dateText);
        var year = dateArray[0];
        var month = dateArray[1];
        var day = dateArray[2];
        updateInputs(year, month, day);
    }

    function addListener(){
        console.log("StartDateCalendar addListener for SAVED_START_DATE_CHANGED event");
        EventBus.addEventListener('SAVED_START_DATE_CHANGED', onSavedStartDateChangedHandler);
    }

    function onSavedStartDateChangedHandler(event){
        console.log("StartDateCalendar onSavedStartDateChangedHandler "+event.data.date);
        var parsedDate = DateUtils.parseDate(event.data.date);

        console.log("parsedDate:");
        console.log(parsedDate);

        $( "#startDateCalendarContainer").val(parsedDate);
        onChange(parsedDate);
    }

    return{
        init:function(){

            try{
                var currentDate = DateUtils.getCurrentDate();

                $( "#startDateCalendarContainer" ).val(currentDate);

                $( "#startDateCalendarContainer" ).datepicker({onSelect: function(dateText) {
                    onChange(dateText);
                }, minDate: 0, defaultDate: new Date()});

                onChange(DateUtils.getCurrentDate());

                addListener();
            }
            catch(error){

            }

        }
    }
};
