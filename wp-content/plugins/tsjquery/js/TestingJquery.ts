///<reference path="libs/jqueryTS/jquery.d.ts"/>
class TestingJquery{

    private createContainer():any{
        return $('<div id="testing_container"></div>')
    }
    
    constructor(){
        var container = this.createContainer();

        $(document.body).append(container);
        console.log("TS JQUERY ");
        
    }
}
