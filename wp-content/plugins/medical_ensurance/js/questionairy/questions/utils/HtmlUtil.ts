class HtmlUtil{
    public static strip(html)
    {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }
}
