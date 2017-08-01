var ClearTableButton = function(){
    var view;
    var context;

    function createListener(){
        view.click(function(){
            EventBus.dispatchEvent(CLEAR_TABLE_BUTTON_CLICK, {context:context});
        });
    }

    return{
        init:function(_view, _context){
            context = _context
            if(_view){
                view = _view;
                createListener();
            }
            else{
                console.error('View not set');
            }
        }
    }
};
