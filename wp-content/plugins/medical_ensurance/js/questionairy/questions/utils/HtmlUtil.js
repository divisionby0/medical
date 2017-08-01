var HtmlUtil = (function () {
    function HtmlUtil() {
    }
    HtmlUtil.strip = function (html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };
    return HtmlUtil;
}());
//# sourceMappingURL=HtmlUtil.js.map