class Sorter{

    private collection:any[];

    private sortDescidental(item1, item2):number{
        if(item1.index > item2.index){
            return 1;
        }
        else{
            return 0;
        }
    }
    
    constructor(collection:any[]){
        this.collection = collection;
    }

    public sort():void{
        this.collection.sort(this.sortDescidental);
    }
}
