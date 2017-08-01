var QuestionaryAdminInitor = function(){

    var $ = jQuery.noConflict();

    return{
        create:function(){
            console.log("Im new QuestionaryAdminInitor $="+$);
            var app = new Application();

            /*
            console.log("creating temp editor");
            $("#tempEditorContainer").summernote({
                height: 150,                 // set editor height
                minHeight: 150,             // set minimum height of editor
                maxHeight: 150,
            });
            */
        }
    }
}


