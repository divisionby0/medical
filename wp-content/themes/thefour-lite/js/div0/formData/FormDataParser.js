var FormDataParser = function(){

    function parseAges(ages){
        if(typeof ages === 'string' || ages instanceof String){
            ages = ages.replace(/\\"/g, '"');
            var parsedAges = JSON.parse(ages);
            return parsedAges;
        }
        else{
            return ages;
        }
    }

    function parseBenefit(benefit){
        return parseInt(benefit);
    }

    function parseNumPersons(numPerson){
        return parseInt(numPerson);
    }

    function parseUseSccc(useSccc) {
        if(useSccc == 'Yes'){
            return 1;
        }
        else{
            return 0;
        }
    }

    function parseTotalDays(startDate, finishDate){
        var timeDiff = Math.abs(finishDate.getTime() - startDate.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }

    return{
        parse:function(formData){

            console.log("parse form data ", formData);
            var startDateString;
            try{
                startDateString = formData.startDate.date;
            }
            catch(error){
                return;
            }
            //var startDateString = formData.startDate.date;
            var finishDateString = formData.finishDate.date;

            var startDate = new Date(startDateString);
            var finishDate = new Date(finishDateString);

            var parsedAges = parseAges(formData.ages);
            formData.ages = parsedAges;

            var useSccc = parseUseSccc(formData.useSccc);
            formData.useSccc = useSccc;

            var benefit = parseBenefit(formData.benefit);
            formData.benefit = benefit;

            var numPersons = parseNumPersons(formData.numPersons);
            formData.numPersons = numPersons;

            //var totalDays = parseTotalDays(startDate, finishDate);
            //formData.totalDays = totalDays;
            
            
            return formData;
        }
    }
}
