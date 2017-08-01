///<reference path="libs/jqueryTS/jquery.d.ts"/>
var TestingJquery = (function () {
    function TestingJquery() {
        var container = this.createContainer();
        $(document.body).append(container);
        console.log("TS JQUERY ");
    }
    TestingJquery.prototype.createContainer = function () {
        return $('<div id="testing_container"></div>');
    };
    return TestingJquery;
}());
//# sourceMappingURL=TestingJquery.js.map