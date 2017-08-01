//http://summernote.org/
var WYSIWYGEditor = function(){
    var _elementId;

    var $ = jQuery.noConflict();

    function getEditorSettings(){
        console.log("getEditorSettings()");
        return [
            ['para', ['ul', 'ol', 'paragraph']],
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['fontsize', ['fontsize']],
            ['color', ['color']]
        ];
    }


    return{
        init:function(elementId){
            _elementId = elementId;

            // установка происходит в E:\workspaces\DenverServers\home\medicalensurance\www\wp-content\plugins\medical_ensurance\js\libs\wysiwyg\summernote\summernote.js строка 6848
            $(document).ready(function() {
                $("#"+_elementId).summernote({
                    toolbar:getEditorSettings(),
                    height: 150,                 // set editor height
                    minHeight: 150,             // set minimum height of editor
                    maxHeight: 150
                });
            });

            /*
            var editor = tinymce.init({
                selector: "textArea",
                language: 'ru',
                statusbar: false,
                skin:"black",
                resize: false,
                menubar: false,
                plugins: 'image lists link media table',
                automatic_uploads: true,
                relative_urls: false,
                remove_script_host: false,
                media_live_embeds: true,
                toolbar: "undo redo | bold italic | bullist numlist | table | image list link media",
                content_style: ".mce-content-body {font-size:15px;font-family:Arial,sans-serif;}",
                images_upload_url: '../../../div0/ImageUploader.php',
                // here we add custom filepicker only to Image dialog
                file_picker_types: 'image',
                // and here's our custom image picker
                file_picker_callback: function(cb, value, meta) {
                    var input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');

                    input.onchange = function() {
                        var file = this.files[0];

                        console.log("file",file);

                        var id = 'blobid' + (new Date()).getTime();
                        var blobCache = tinymce.activeEditor.editorUpload.blobCache;

                        var blobInfo = blobCache.create(id, file);
                        blobCache.add(blobInfo);

                        console.log("blobInfo.blobUri()",blobInfo.blobUri());
                        console.log("blobInfo",blobInfo);
                        console.log("file.name",file.name);

                        // call the callback and populate the Title field with the file name
                        cb(blobInfo.blobUri(), { title: file.name });
                    };

                    input.click();
                }
            });
            */
        },
        destroy:function(){
            $("#"+_elementId).summernote("destroy");
        },
        getContent:function(){
            var isEmpty = $("#"+_elementId).summernote("isEmpty");
            var currentText = $("#"+_elementId).summernote("code");
            if(isEmpty){
                return "";
            }
            else{
                return currentText;
            }
        },
        setContent:function(data){
            $("#"+_elementId).summernote("code", data);
        }
    }
}
