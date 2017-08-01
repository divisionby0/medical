var SCCCParser = function(){
    return{
        parse:function(string){
            var jsonMapDecoder = new MapJsonDecoder(string);
            var scccData = jsonMapDecoder.decode();

            var sccc = new SCCC();
            sccc.create(scccData);
            return sccc;
        }
    }
}
