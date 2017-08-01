class TextLengthValidator{
    private text:string;
    
    constructor(text:string){
        this.text = text;
    }
    
    validate(minCharacters:number):boolean{
        return this.text.length > minCharacters -1;
    }
}
