var GetFormData = function(){

    var $ = jQuery.noConflict();

    return{
        init:function(){

            //console.log('GetFormData');
            var element = $('#formData');
            //console.log(element.text());


            var formDataObject = JSON.parse(element.text());

            //console.log('parsed GetFormData ');
            //console.log(formDataObject);

            return formDataObject;
        }
    }
};
