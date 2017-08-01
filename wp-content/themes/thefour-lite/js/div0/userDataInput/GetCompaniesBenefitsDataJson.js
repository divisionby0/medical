var GetCompaniesBenefitsDataJson = function(){

    return{
        execute:function(){
            var jsonData = $('#allBenefits').text();
            return jsonData;
        }
    }
};
