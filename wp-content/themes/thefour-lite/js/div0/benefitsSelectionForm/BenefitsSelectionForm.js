var BenefitsSelectionForm = function(){

    var $ = jQuery.noConflict();

    var selectedBenefit = 1;
    var selectedBenefitRow;

    function updateInput(){
        $('#selectedBenefitInput').val(selectedBenefit);
    }

    function submitForm(){
        Cookie.setBenefit(selectedBenefit);
        $('#benefitSelectionForm').submit();
    }

    function addListener(){
        $('#benefitsSelectionForm > tbody  > tr').not(':first').each(function() {
            $(this).hover(
                function () {
                    $(this).addClass('itemHovered');
                },
                function () {
                    $(this).removeClass('itemHovered');
                });

            $(this).click(function(){
                var newBenefit = $(this).attr('id');
                if(newBenefit!=selectedBenefit){
                    selectedBenefit = newBenefit;

                    updateInput();

                    try{
                        selectedBenefitRow.removeClass('itemSelected');
                    }
                    catch(error){
                    }

                    selectedBenefitRow = $(this);
                }
                $(this).addClass('itemSelected');

                submitForm();
            });
        });
    }

    function selectBenefit(index){
        var benefitRow = $( "#benefitsSelectionForm > tbody  > tr").eq(index);

        selectedBenefit = benefitRow.attr('id');

        benefitRow.addClass('itemSelected');
        selectedBenefitRow = benefitRow;
    }

    function getBenefitIndexByValue(value){

        var selectedIndex = -1;
        $('#benefitsSelectionForm > tbody  > tr').not(':first').each(function(index) {
            var benefit = $(this).attr('id');
            if(parseInt(benefit) == parseInt(value)){
                selectedIndex = index;
            }
        });
        return selectedIndex;
    }

    return{
        init:function(_selectedBenefit){
            addListener();
            var defaultSelectedIndex = 1;

            if(_selectedBenefit){
                selectedBenefit = _selectedBenefit;
                defaultSelectedIndex = getBenefitIndexByValue(selectedBenefit);
                defaultSelectedIndex+=1;
            }
            selectBenefit(defaultSelectedIndex);
            updateInput();
        }
    }
}