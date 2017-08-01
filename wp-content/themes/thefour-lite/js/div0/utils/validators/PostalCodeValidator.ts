class PostalCodeValidator{
    public static validate(postal:string):boolean{
        var regex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

        if(regex.test(postal)){
            return true;
        }
        else{
            return false;
        }
    }
}
