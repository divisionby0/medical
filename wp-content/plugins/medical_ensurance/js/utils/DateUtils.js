var DateUtils = (function(){

    function calculateAge(start) { // birthday is a date
        var ageDifMs = Date.now() - start.getTime();
        console.log("start.getTime()="+start.getTime());
        console.log("ageDifMs="+ageDifMs);
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    function formatValue(value){
        var formated = value.toString();;

        if(formated.length == 1){
            formated = '0'+formated;
        }
        return formated;
    }


    return{
        getTomorrowDate:function(currentDateString){
            var tomorrowDate;

            if(currentDateString){
                tomorrowDate = moment(currentDateString, "YYYY-MM-DD").add(1, 'days');
            }
            else{
                var now = moment();
                tomorrowDate = now.add(1, 'days');
            }

            var day = tomorrowDate.format('DD');
            var month = tomorrowDate.format('MM');
            var year = tomorrowDate.format('YYYY');

            day = formatValue(day);
            month = formatValue(month);

            return year+"-"+month+"-"+day;
        },
        getCurrentDate:function(){
            var d = new Date();
            var curr_date = d.getDate();
            var curr_month = d.getMonth() + 1;
            var curr_year = d.getFullYear();

            curr_date = formatValue(curr_date);
            curr_month = formatValue(curr_month);

            return curr_year+"-"+curr_month+"-"+curr_date;
        },
        parseDate:function(dateString){
            var dateArray = dateString.split('+');
            var anotherData = moment(dateString, "YYYY-MM-DD");

            var day = anotherData.format('DD');
            var month = anotherData.format('MM');
            var year = anotherData.format('YYYY');

            day = formatValue(day);
            month = formatValue(month);

            //return curr_year+"-"+curr_month+"-"+curr_date;
            return year+"-"+month+"-"+day;
        },
        getYearsFromDate:function(dateString){
            var years = moment().diff(dateString, 'years');
            return years;
        },
        parseToArray:function(dateString){
            var dateArray = dateString.split('-');
            var year = dateArray[0];
            var month = dateArray[1];
            var day = dateArray[2];

            day = formatValue(day);
            month = formatValue(month);

            return [year, month,day];
        }
    }
})();