var CompanyTableRowView = function(){

    var $ = jQuery.noConflict();

    var company;

    function createReadMoreLinkElement(url){
        return $('<div class="fullwidth centered resultTableTextDataReadMore"><a id="readMoreLink" href="'+url+'">read more</a></div>');
    }
    
    function createBuyOnlineButton(companyId, companyName){
        //var medicalDeclarationRequired = isMedicalDeclarationRequired();
        
        var button = $('<div class="buyButton centered" id="buyButton" data-companyId="'+companyId+'" data-companyName="'+companyName+'"><button type="button" class="btn btn-success">Order online</button></div>');
        createBuyOnlineButtonListener(button);
        return button;
    }
    function createBuyOnlineButtonListener(element){
        element.on('click', buyOnlineButtonClicked);
    }

    function buyOnlineButtonClicked(){
        var element = $(this);
        var companyName = element.attr("data-companyName");
        var companyId = element.attr("data-companyid");
        var medicalDeclarationRequired = element.attr("data-medicalDeclarationRequired");
        console.log("clicked element = "+element.attr("id")+"  companyId="+element.attr("data-companyId")+ "name:"+companyName+"  medicalDeclarationRequired="+medicalDeclarationRequired);
        onSelect(companyName, companyId, medicalDeclarationRequired);
    }

    
    function onSelect(name, id, medicalDeclarationRequired){
        EventBus.dispatchEvent(BUY_ONLINE_BUTTON_CLICKED, {name:name, id:id, medicalDeclarationRequired:medicalDeclarationRequired});
    }

    function isMedicalDeclarationRequired(){
        return company.isMedicalDeclarationRequired();
    }
    
    return{
        create:function(companyModel){
            company = companyModel;

            console.log("company: ",company);

            var name = company.getName();
            var id = company.getId();
            var costs = company.getDeductiblesCosts();
            var url = company.getUrl();

            var readMoreLinkElement;

            var benefitsText = company.getBenefitsText();
            var limitationsText = company.getLimitationsText();

            var companyIsFamilyRate = company.getIsFamilyRate();

            var row = $('<tr class="resultTableRow companyTableRow" id="company_126" data-companyid="'+id+'" data-companyname="'+name+'">');

            var planColumn = $('<td class="planTableColumn">');
            planColumn.appendTo(row);

            var companyNameContainer = $('<div class="fullwidth centered colorRed companyName">');
            var companyNameElement = $('<a href="'+url+'" class="colorRed"><b>'+name+'</b></a>');
            companyNameElement.appendTo(companyNameContainer);

            companyNameContainer.appendTo(planColumn);

            var planTable = $('<table class="fullwidth planTable" id="planTable">');
            planTable.appendTo(planColumn);

            var planTableLegendElement = $('<tr class="resultTableRow"><th class="fullwidth centered">Deductible</th><th class="fullwidth centered">Premium</th></tr>');
            planTableLegendElement.appendTo(planTable);

            var deductibles = costs.getKeys();
            for(var i=0; i<deductibles.length; i++ ){
                var deductible = deductibles[i];
                var cost = costs.get(deductible);
                var formatedCost = cost.toFixed(2);

                var costRow = $('<tr class="resultTableRow companyBenefitAndCost"><td class="planTableItemRenderer benefit">$ '+deductible+'</td><td class="planTableItemRenderer benefitCost">$ '+formatedCost+'</td></tr>');
                costRow.appendTo(planTable);
            }

            if(companyIsFamilyRate){
                $('<div class="centered familyRateInfo">Family Rate</div>').appendTo(planColumn);
            }

            var buyOnlineButton = createBuyOnlineButton(id, name);
            buyOnlineButton.appendTo(planColumn);

            var limitationsContainer = $('<td class="companyTableItemRenderer resultTableTextDataPositionRelative">');
            var limitationsTextElement = $('<div class="companyTextData" id="limitationsText"><p>'+limitationsText+'</p></div>');
            readMoreLinkElement = createReadMoreLinkElement(url);

            limitationsTextElement.appendTo(limitationsContainer);

            readMoreLinkElement.appendTo(limitationsContainer);
            limitationsContainer.appendTo(row);

            var benefitsContainer = $('<td class="companyTableItemRenderer resultTableTextDataPositionRelative">');
            var benefitsTextElement = $('<div class="companyTextData" id="benefitsText"><p>'+benefitsText+'</p></div>');
            readMoreLinkElement = createReadMoreLinkElement(url);
            benefitsTextElement.appendTo(benefitsContainer);
            readMoreLinkElement.appendTo(benefitsContainer);
            benefitsContainer.appendTo(row);

            return row;
        }
    }
}
