var Persons = function(){
    
    var collection;

    function sortingFunction(a, b){
        return a-b
    }
    
    return{
        setCollection:function(_collection){
            collection = _collection;
        },
        findByAge:function(age){
            var iterator = collection.getIterator();
            while(iterator.hasNext()){
                var person = iterator.next();
                var personAge = person.getAge();
                if(personAge == age){
                    return person;
                }
            }
        },
        getIterator:function(){
            return collection.getIterator();
        },
        getAges:function(){
            var ages = new Array();

            var personsIterator = collection.getIterator();
            while(personsIterator.hasNext()) {
                var person = personsIterator.next();
                var age = person.getAge();
                ages.push(age);
            }

            ages.sort(sortingFunction);
            return ages;
        }
    }
}
