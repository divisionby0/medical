var LoadedDataTreeView = function(){
    return{
        update:function(data){
            $('#loadedDataTree').treeview({data: data});
        }
    }
};
