var TextInputUtils = (function(){
    return{
        isOnlyNumbersWithDot:function(elementEvent){
            var charCode;
            if (elementEvent.keyCode > 0) {
                charCode = elementEvent.which || elementEvent.keyCode;
            }
            else if (typeof (elementEvent.charCode) != "undefined") {
                charCode = elementEvent.which || elementEvent.keyCode;
            }
            if (charCode == 46 || charCode == 45)
                return true;
            if (charCode > 31 && (charCode < 48 || charCode > 57))
                return false;
            return true;
        }
    }
})();
