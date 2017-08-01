var StringUtils = (function(){
    function splitMoney(source){
        var n = source.toString(), p = n.indexOf('.');
        return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function($0, i){
            return p<0 || i<p ? ($0+' ') : $0;
        });
    }
    
    return{
        formatDivisionalMoney:function(source){
            var data = source.toString().split(".");
            var division = data[1];
            var int = data[0];
            var result = "$ "+ int+"."+ division.substring(0,2);

            return result;
        },
        formatMoney:function(source){
            var result = source.toString();

            var firstBits = result.substring(0,3);
            var nextBits = result.substring(3,6);

            return "$ "+firstBits+" "+nextBits;
        },
        formatMoneyInt:function(source){
            return "$ "+splitMoney(source);
        },
        parseURI:function(dataString){
            var dataObject = null;

            try{
                //console.log("decoding '"+dataString+"'");
                dataString = decodeURIComponent(dataString);
                //console.log("decoded "+dataString);
            }
            catch(error){
                console.error("decodeURIComponent error: "+error);
            }
            
            try{
                dataObject = JSON.parse(dataString);
            }
            catch(error){
                console.error('parse error '+error);
                return null;
            }
            return dataObject;
        },
        decodeHTML:function(html){
            var txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
        },
        stripHTML:function(source){
            var $ = jQuery.noConflict();
            return $(source).text()
        },
        decorateCardNumber:function(source){
            var characters = source.split("");
            var totalCharacters = characters.length;

            var result = "";
            for(var i=0; i<totalCharacters;i++){
                if(i < totalCharacters - 4){
                    result+="*";
                }
                else{
                    result+=characters[i];
                }

            }
            return result;
        }
    }
})();
