class PersonDetailsErrorView{
    
    private container:any;
    
    constructor(container:any){
        this.container = container;
    }
    
    showAnswerError():void{
        this.container.text("Error. You must answer YES at least the first question !");
        this.container.removeClass("hidden");
    }
    
    showConfirmationError():void{
        this.container.text("Error. You must confirm all data !");
        this.container.removeClass("hidden");
    }
    destroy():void{
        this.container.addClass("hidden");
        this.container.text("");
    }
}
