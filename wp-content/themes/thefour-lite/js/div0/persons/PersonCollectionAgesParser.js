var PersonCollectionAgesParser = (function(){
    function sortingFunction(a, b){
        return a-b
    }
    return{
        parse:function(persons){
            var ages = new Array();

            var personsIterator = persons.getIterator();
            while(personsIterator.hasNext()) {
                var person = personsIterator.next();
                var age = person.getAge();
                ages.push(age);
            }

            ages.sort(sortingFunction);
            return ages;
        }
    }
})();