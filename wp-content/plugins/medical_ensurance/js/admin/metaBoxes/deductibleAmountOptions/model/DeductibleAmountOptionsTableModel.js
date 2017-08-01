var DeductibleAmountOptionsTableModel = function(){
    var view;
    var dataProvider;
    
    
    return{
        init:function(_view){
            view = _view;
        },
        setData:function(collection){
            view.setData(collection);
        },
        onOptionAdded:function(option){
            view.onItemAdded(option);
        },
        onOptionRemoved:function(option){
            view.onItemRemoved(option);
        }
    }
}
