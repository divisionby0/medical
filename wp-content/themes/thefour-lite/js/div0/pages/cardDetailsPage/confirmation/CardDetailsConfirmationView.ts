///<reference path="../Card.ts"/>
class CardDetailsConfirmationView{

    private $j:any;
    private card:Card;
    private checkBox:any;
    
    constructor(card:Card){
        this.$j = jQuery.noConflict();
        this.card = card;
        this.checkBox = this.$j("#confirmCheckBox");
        this.update();
        // uncheck check box
        this.uncheckCheckBox();
    }

    private update():void{
        this.$j("#cardTypeConfirmation").text(this.card.getType());
        this.$j("#cardNumberConfirmation").text(this.card.getNumber());
        this.$j("#cardholderConfirmation").text(this.card.getHolderName());
        this.$j("#cardExpConfirmation").text(this.card.getExpDate());
    }

    public destroy():void{
        this.$j("#cardTypeConfirmation").text("");
        this.$j("#cardNumberConfirmation").text("");
        this.$j("#cardholderConfirmation").text("");
        this.$j("#cardExpConfirmation").text("");
        this.uncheckCheckBox();
    }

    public isConfirmed():boolean{
        return this.checkBox.is(':checked');
    }

    private uncheckCheckBox():void {
        this.checkBox.prop( "checked", false );
    }
}
