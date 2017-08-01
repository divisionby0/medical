var DeductibleAmountOption = function(){
    var id;
    var ageFrom;
    var ageTill;
    var surchargeOrDiscount;
    var aggregatePolicyLimit;
    var deductible;

    return{
        construct:function(_id, _ageFrom, _ageTill, _surchargeOrDiscount, _aggregatePolicyLimit, _deductible){
            id = _id;
            ageFrom = _ageFrom;
            ageTill = _ageTill;
            surchargeOrDiscount = _surchargeOrDiscount;
            aggregatePolicyLimit = _aggregatePolicyLimit;
            deductible = _deductible;
        },
        getId:function(){
            return id;
        },
        getAgeFrom:function(){
            return ageFrom;
        },
        getAgeTill:function(){
            return ageTill;
        },
        getSurchargeOrDiscount:function(){
            return surchargeOrDiscount;
        },
        getAggregatePolicyLimit:function(){
            return aggregatePolicyLimit;
        },
        getDeductible:function(){
            return deductible;
        }
    }
}
