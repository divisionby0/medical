var ResultTableEmail = function(){
    var $ = jQuery.noConflict();
    var button;
    var content;

    var urls;
    var emailData;

    var receiverEmail;

    function getReceiverEmail(){
        return $('#emailInput').val();
    }

    function validateReceiverEmail(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function addButtonListener(){
        button.click(function(){

            receiverEmail = getReceiverEmail();
            var emailValid = validateReceiverEmail(receiverEmail);

            if(emailValid){
                var data = {'action':'sendResultFormEmail', 'data':emailData, receiver:receiverEmail};

                $.post(ajaxurl, data, function(response) {
                    console.log("email sending response: "+response);
                    var responseData = JSON.parse(response);
                    var result = responseData.result;

                    if(result == "complete"){
                        showDialog("Email sent");
                    }
                    else{
                        showDialog("Error sending email");
                    }
                    //alert(response);
                });
            }
            else{
                alert('Email address not valid.');
            }
        })
    }


    function showDialog(content){
        var dialogContent = $("<div>"+content+"</div>");
        dialogContent.dialog({modal: true, buttons: [
            {
                text: "Ok", click: function (event) {
                dialogContent.dialog("close");
            }
            }
        ]});
    }


    function removeHiddenAgesContainer(){
        $('#urls').remove();
    }

    function createCompanyPlanContent(sourceRowElement, resultRowElement){
        var plan = new Array();

        var  planTableElement= $('<table><tbody><tr><td>Deductible</td><td>Premium</td></tr></tbody>');
        planTableElement.appendTo(resultRowElement);

        sourceRowElement.find('.companyBenefitAndCost').each(function(){
            var benefitAndCostElement = $(this);
            var benefit = benefitAndCostElement.find('.benefit').text();
            var benefitCost = benefitAndCostElement.find('.benefitCost').text();
            plan.push({benefit:benefit, cost:benefitCost});
        });
        return plan;
    }

    function createTableJson(){
        var testTableContainer = $("#testTableContainer");
        var container = $('<div>');

        container.appendTo(testTableContainer);

        var table = $('<table style="border-bottom: 1px solid #ddd;"><tbody><tr><td style="width: 200px; text-align: center;"><b>Plan</b></td><td style="width: 300px; text-align: center;"><b>Exclusions and Limitations</b></td><td style="width: 300px; text-align: center;"><b>Benefits</b></td></tr></tbody>');
        table.appendTo(container);

        var userDataInfo = $('.userDataSelectionInfoContainer').text();
        var companies = new Array();

        $('.companyTableRow').each(function(){
            var sourceCompanyTableRowElement = $(this);

            var companyName = sourceCompanyTableRowElement.data('companyname');
            var companyUrl = sourceCompanyTableRowElement.find('#readMoreLink').attr('href');

            var companyTableRow = $('<tr>');
            var companyNameElement = $('<td style="width: 200px; text-align: center;"><b style="color: #bd070f">'+companyName+"</b></td>");
            companyNameElement.appendTo(companyTableRow);

            companyTableRow.appendTo(table);

            var companyPlan = createCompanyPlanContent(sourceCompanyTableRowElement, companyNameElement);

            var benefitsText = sourceCompanyTableRowElement.find('#benefitsText').html();
            var limitationsText = sourceCompanyTableRowElement.find('#limitationsText').html();

            companies.push({name:companyName, url:companyUrl, plan:companyPlan, benefits:benefitsText, limitations:limitationsText });
        });

        var emailData = {userDataInfo: userDataInfo, companies:companies};

        emailData = JSON.stringify(emailData);

        //console.log(emailData);
        return emailData;
    }

    return{
        init:function(){
            button = $("#sendEmailButton");
            addButtonListener();
            //removeHiddenAgesContainer();
            emailData = createTableJson();

            content = $("#resultPageContent").html();
        }
    }
}
