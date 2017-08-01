var FamilyRateMaxAgeMetabox = function(){

    var $ = jQuery.noConflict();
    var input;

    function getInput(){
        input = $('#familyRateMaxAgeMetaBoxEditor');
    }

    function addInputListener(){
        input.on('keypress', function(event, renderer){
            return TextInputUtils.isOnlyNumbersWithDot(event);
        });
        input.on('keyup', function(event, renderer){
            var newValue = parseFloat($(this).val());
            if(newValue > 100){
                newValue = 100;
                $(this).val(newValue);
            }
            else if(newValue < 0){
                newValue = 0;
                $(this).val(newValue);
            }
        });
    }

    return{
        init:function(){
            console.log("FRMAMetabox");
            getInput();
            addInputListener();
        }
    }
}
