var Person = function(){
    var id;
    var age;
    var benefit;
    var useSCCC;
    var totalDays;
    
    return{
        create:function(_id, _age, _benefit, _useSCCC, _totalDays){
            id = _id;
            age = _age;
            benefit = _benefit;
            useSCCC = _useSCCC;
            totalDays = _totalDays;
        },
        getId:function(){
            return id;
        },
        getAge:function(){
            return age;
        },
        getBenefit:function(){
            return benefit;
        },
        getUseSCCC:function(){
            return useSCCC;
        },
        getTotalDays:function(){
            return totalDays;
        }
    }
};
