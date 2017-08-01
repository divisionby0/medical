var GetFormData = function(){
    var $ = jQuery.noConflict();
    return{
        init:function(){
            var element = $('#formData');
            var formDataObject = JSON.parse(element.text());
            return formDataObject;
        }
    }
};
