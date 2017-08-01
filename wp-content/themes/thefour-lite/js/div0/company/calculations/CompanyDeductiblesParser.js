var CompanyDeductiblesParser = function(){ 
    return{
        parse:function(json){
            var jsonMapDecoder = new MapJsonDecoder(json);
            return jsonMapDecoder.decode();
        }
    }
}
