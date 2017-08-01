var CountriesSelect = function(){
    var $ = jQuery.noConflict();
    var element;
    function getElement(){
        element = $('#countriesSelect');
    }
   
    function addBlankItem(){
        var blankOption = $("<option value='null' selected='selected'>Select country</option>");
        element.prepend(blankOption);
        blankOption.prop('disabled', true);
    }
    return{
        init:function(){
            getElement();
            addBlankItem();
        }
    }
}
