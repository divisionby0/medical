//TODO по-идиотски сделано. Сначала создаются ows а потом в них вписываются данные. Это мешает последующей сортировке
//TODO попробовать при помощи List, если получится - избавиться от него в пользу Map как и было
var CompaniesTable = function(){

    var $ = jQuery.noConflict();
    var rowElements;
    var companies = new Map('companies');
    var urls;

    function getRowElements(){
        rowElements = new Map('companiesRowsElements');

        $('.companyTableRow').each(function(){
            var companyTableRowElement = $(this);
            var companyId = companyTableRowElement.data('companyid');
            rowElements.add(companyId, companyTableRowElement);
        });
    }

    function removeRows(){
        $('.companyTableRow').each(function(){
            var companyTableRowElement = $(this);
            companyTableRowElement.remove();
        });
    }

    function parseCompanies(){
        var rowElementsIterator = rowElements.getIterator();
        while(rowElementsIterator.hasNext()){
            var companyRowElement = rowElementsIterator.next();
            
            var companyRowId = companyRowElement.attr('id');
            var companyId = companyRowElement.data('companyid');
            var companyName = companyRowElement.data('companyname');

            var companyModel = new CompanyModel();
            companyModel.init(companyId, companyName);

            companies.add(companyId, companyModel);

            companyRowElement.find('.companyTextData').each(function(){
                var companyDataKey = $(this).attr('id');

                switch(companyDataKey){

                    case 'benefitsText':
                        companyModel.setBenefitsText($(this).html());
                        break;
                    case 'limitationsText':
                        companyModel.setLimitationsText($(this).html());
                        break;

                    case 'rateTableGuideText':
                        companyModel.setRateTableGuide($(this).text());
                        break;
                    case 'scccText':
                        companyModel.setSCCC($(this).text());
                        break;
                    case 'standartRatesText':
                        companyModel.setStandardRates($(this).text());
                        break;
                    case 'deductibleAmountOptionsText':
                        companyModel.setDeductibleAmountOptions($(this).text());
                        break;
                    case 'benefitsCollection':
                        companyModel.setBenefits($(this).text());
                        break;
                    case 'deductiblesCollection':
                        companyModel.setDeductibles($(this).text());
                        break;
                    case 'familyRateMaxAgeText':
                        companyModel.setFamilyRateMaxAge(parseInt($(this).text()));
                        break;
                    case 'familyRatePremiumTable':
                        companyModel.setFamilyRatePremiumTable($(this).text());
                        break;
                }
            });
        }
    }

    function createCompanyRow(companyModel){
        var companyURL = urls.get(companyModel.getName());
        companyModel.setUrl(companyURL);
        var companyTableRowView = new CompanyTableRowView();
        var row = companyTableRowView.create(companyModel);
        row.appendTo($('#companiesTable'));
    }

    function addFamilyRateListener(){
        EventBus.addEventListener('FAMILY_RATE_DETECTED', familyRateDetectedHandler);
    }

    function familyRateDetectedHandler(event){
        var ages = event.ages;

        $('#familyRateInfo').show();
        $('#familyRateInfo').text('Family rate. Ages: '+ages);
    }

    function getUrls(){
        var urlsJson = $('#urls').text();
        var urlsObject = JSON.parse(urlsJson);
        urls = parseUrls(urlsObject);
    }

    function parseUrls(urlsObject){
        var map = new Map('urls');
        for(var property in urlsObject){
            map.add(property, urlsObject[property]);
        }
        return map;
    }

    return{
        getData:function(){

            addFamilyRateListener();
            getRowElements();
            parseCompanies();
            return companies;
        },
        setData:function(data){
            urls = new Map('urls');
            getUrls();
            removeRows();

            var companiesDataIterator = data.getIterator();
            while(companiesDataIterator.hasNext()){
                var companyModel = companiesDataIterator.next();
                createCompanyRow(companyModel);
            }
        }
    }
}
