var TableRendererListener = function(){
    var $;
    var context;
    
    function onTableRendererValueChanged(rowId, columnKey, newValue)
    {
        EventBus.dispatchEvent(RENDERER_VALUE_CHANGED, {rowId:rowId, columnKey:columnKey, newValue:newValue, context:context});
    }

    function onlyNumbersWithDot(e) {
        var charCode;
        if (e.keyCode > 0) {
            charCode = e.which || e.keyCode;
        }
        else if (typeof (e.charCode) != "undefined") {
            charCode = e.which || e.keyCode;
        }
        if (charCode == 46 || charCode == 45)
            return true;
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }

    function updateRendererState(element, value){
        if(value < 0){
            element.addClass('negativeValue');
        }
        else{
            element.removeClass('negativeValue');
        }
    }

    return{
        init:function(tableContainer, _context){
            $ = jQuery;
            context = _context;

            tableContainer.find('.tableCeilItemRenderer').on('keypress', function(event, renderer){
                return TextInputUtils.isOnlyNumbersWithDot(event);
            });
            tableContainer.find('.tableCeilItemRenderer').on('keyup', function(event, renderer){
                var newValue = parseFloat($(this).val());
                if(newValue < -1){
                    newValue = -1;
                    $(this).val(newValue);
                }
                updateRendererState($(this), newValue);
                onTableRendererValueChanged($(this).data('rowid'), $(this).data('columnkey'), $(this).val());
            });
        }
    }
}
