var CreatePersons = function(){

    var numPersons;
    var benefit;
    var totalDays;
    var useSCCC;
    
    var personsCollection = new Map('persons');

    function createPersonsFromAges(ages){
        var i;
        var total = ages.length;
        
        for(i=0; i < total; i++){
            var age = ages[i];
            var person = new Person();

            person.create(i, age, benefit, useSCCC, totalDays);
            personsCollection.add(i, person);
        }
    }

    return{
        create:function(data){
            benefit = data.benefit;
            useSCCC = data.useSccc;
            totalDays = data.totalDays;

            createPersonsFromAges(data.ages);

            var persons = new Persons();
            persons.setCollection(personsCollection);

            return persons;
        }
    }
}
