var TableFactory = (function(){
    return{
        createTable:function(type, tableId, tableData){
            if(type === SCCC_TABLE){
                var table = new Table(tableId, tableData);
                return table.getHTML();
            }
            else if(type === STANDARD_RATES_TABLE){
                var table = new Table(tableId, tableData); // starts from 60 years old
                return table.getHTML();
            }
            else{
                throw new Error('Undefined type "'+type+'"');
            }
        }
    }
})();
