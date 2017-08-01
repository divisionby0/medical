var DatePickerYearAndMonthOnlyTestingPage = function(){

    var $ = jQuery.noConflict();
    
    return{
        create:function(){
            $("#dateInput").datepicker({
                    minDate:0,
                    changeMonth: true,
                    changeYear: true,
                    yearRange:'-10:+10',
                    dateFormat: 'MM yy',
                    showButtonPanel: true
            });
        }
    }
}