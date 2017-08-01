var BenefitsJsonDataParser = function(){
    return{
        parse:function(jsonData){

            var companiesBenefits;
            try{
                companiesBenefits = JSON.parse(jsonData);
            }
            catch(error){
                console.error("Benefits parse error. "+error+". Given string '"+jsonData+"'" );
                return;
            }

            var benefits = new Map('allBenefits');

            var companyBenefitsJsonDataDecoder = new MapJsonDecoder();

            for(var i=0;i<companiesBenefits.length;i++){
                var companyBenefitsJsonData = companiesBenefits[i];
                companyBenefitsJsonDataDecoder = new MapJsonDecoder(companyBenefitsJsonData);
                var companyBenefitsMap = companyBenefitsJsonDataDecoder.decode();

                // я исхожу из того что тут невозможны дублирования ключей без дублирования значений. Поэтому все дубликаты я отбрасываю
                var companyBenefitsMapIterator = companyBenefitsMap.getIterator();
                while(companyBenefitsMapIterator.hasNext()){
                    var companyBenefit = companyBenefitsMapIterator.next();
                    try{
                        benefits.add(companyBenefit, companyBenefit);
                    }
                    catch(error){
                        //console.log('benefit duplication error: '+error);
                    }
                }
            }

            return benefits;
        }
    }
}

