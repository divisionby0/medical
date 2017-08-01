class Card{

    private cardNumber:string;
    private holderName:string;
    private expDate:string;
    private type:string;

    constructor(cardNumber:string = "", holderName:string = "", expDate:string = "", type:string = ""){
        this.cardNumber = cardNumber;
        this.holderName = holderName;
        this.expDate = expDate;
        this.type = type;
    }
    
    public getNumber():string{
        return this.cardNumber;
    }
    public setNumber(number:string):void{
        this.cardNumber = number;
    }
    
    public getHolderName():string{
        return this.holderName;
    }
    public setHolderName(name:string):void{
        this.holderName = name;
    }
    
    public getExpDate():string{
        return this.expDate;
    }
    public setExpDate(date:string):void{
        this.expDate = date;
    }
    
    public getType():string{
        return this.type;
    }
    public setType(type:string):void{
        this.type = type;
    }
}