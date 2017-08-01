var PageMarkupResponsability  = (function(){
    return{
        remove:function(){
            $("meta[width='device-width']").remove();
            $("meta[initial-scale='1.0']").remove();
        }
    }
})();