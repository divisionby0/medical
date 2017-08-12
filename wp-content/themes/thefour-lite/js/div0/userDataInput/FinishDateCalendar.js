var FinishDateCalendar = function(){

    var $ = jQuery.noConflict();

    function updateInputs(year, month, day){
        $('#finishDateMonth').val(month);
        $('#finishDateYear').val(year);
        $('#finishDateDay').val(day);
    }

    function onChange(dateText){
        var dateArray = DateUtils.parseToArray(dateText);
        var year = dateArray[0];
        var month = dateArray[1];
        var day = dateArray[2];

        updateInputs(year, month, day);
    }

    function addListener(){
        EventBus.addEventListener('SAVED_FINISH_DATE_CHANGED', onSavedFinishDateChangedHandler);
    }

    function onSavedFinishDateChangedHandler(event){
        var parsedData = DateUtils.parseDate(event.data.date);
        $( "#finishDateCalendarContainer").val(parsedData);
        onChange(parsedData);
    }

    return{
        init:function(){

            var tomorrowDate = DateUtils.getTomorrowDate();

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            $( "#finishDateCalendarContainer" ).val(tomorrowDate);

            $( "#finishDateCalendarContainer" ).datepicker({onSelect: function(dateText) {
                onChange(dateText);
            }, minDate: +1, defaultDate: tomorrow});

            onChange(tomorrowDate);
            addListener();
        }
    }
}
