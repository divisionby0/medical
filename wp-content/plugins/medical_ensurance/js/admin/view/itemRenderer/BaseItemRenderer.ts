class BaseItemRenderer{
    public id:string;
    public data:any;


    constructor(id:string, data:string){
        this.id = id;
        this.data = data;

        if(this.data && this.id){
            this.getHTML();
        }
        else{

        }
    }

    getHTML():string{
        return 'empty';
    }
    clear():void{

    }
}
