///<reference path="../utils/Sorter.ts"/>
class SortChildren{
    constructor(children:any[]){
        var sorter:Sorter = new Sorter(children);
        sorter.sort();
    }
}
