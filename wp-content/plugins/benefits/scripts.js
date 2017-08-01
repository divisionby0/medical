document.addEventListener("DOMContentLoaded", function(event) {
    console.log("benefits admin ready");

    var select = document.getElementById("companiesSelect");
    var titleInput = document.getElementsByName("post_title")[0];
    var selectedCompanyInput = document.getElementsByName("selectedCompany")[0];
    //var selectedCompany = selectedCompanyInput.value;
    var selectedCompany;

    try{
        selectedCompany = selectedCompanyInput.value
    }
    catch(error){
        console.error("selectedCompanyInput is undefined");
        return;
    }

    var currentTitle = titleInput.value;

    function selectedCompanyChanged(event){
        selectedCompanyInput.value = titleInput.value = event.target.value;
    }

    select.addEventListener("change", selectedCompanyChanged);

    if(selectedCompany){
        titleInput.value = selectedCompany;
    }
    else{// select first company by default
        var defaultCompany = select.options[0].text;
        selectedCompanyInput.value = titleInput.value = defaultCompany;
    }
});
