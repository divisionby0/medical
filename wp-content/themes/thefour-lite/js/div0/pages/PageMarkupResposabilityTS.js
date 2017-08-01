///<reference path="../../libs/jqueryTS/jquery.d.ts"/>
var PageMarkupResposabilityTS = (function () {
    function PageMarkupResposabilityTS() {
        this.$j = jQuery.noConflict();
    }
    PageMarkupResposabilityTS.prototype.removeResponsabilityMarkup = function () {
        this.$j("meta[width='device-width']").remove();
        this.$j("meta[initial-scale='1.0']").remove();
    };
    return PageMarkupResposabilityTS;
}());
//# sourceMappingURL=PageMarkupResposabilityTS.js.map