///<reference path="QuotePerson.ts"/>
///<reference path="../../../questionairy/app/FrontendUserAnswers.ts"/>
declare var PRIMARY:string;
class QuotePersonAdminView{

    protected $j:any;
    protected person:QuotePerson;
    private container:any;

    protected personContainer:any;

    protected questionsContainer:any;
    protected questionsContainerId:string;

    constructor(person:QuotePerson, container:any){
        this.$j = jQuery.noConflict();
        this.person = person;
        this.container = container;
        this.createChildren();
    }

    private createChildren():void {
        this.createPersonDataView();
        this.createQuestionsContainer();
        this.createQuestionsView();
    }

    private createPersonDataView():void {
        var personIsPrimary:boolean = this.person.getRelationship()==PRIMARY;

        console.log("person is primary: "+personIsPrimary);

        var personRelationship:string = this.person.getRelationship();
        console.log("person "+this.person.getFirstName()+"  relationship: "+this.person.getRelationship());

        if(personIsPrimary){
            this.personContainer = this.$j("<div><h2 style='text-align: center; width: 100%; background-color: #d9edf7; text-align: center;'><span class='glyphicon glyphicon-user' aria-hidden='true'></span>  <b>Primary Insured</b></h2></div>");
        }
        else{
            this.personContainer = this.$j("<div><h2 style='text-align: center; width: 100%; background-color: #d9edf7; text-align: center;'><span class='glyphicon glyphicon-user' aria-hidden='true'></span>  <b>Insured ("+personRelationship+")</b></h2></div>");
        }
        
        var table:any = this.$j("<table style='font-size:1.8em;'><tbody></tbody></table>");

        var tRow1:any = this.$j("<tr></tr>");
        var td1Legend:any = this.$j("<td>First name:</td>");
        var td1Value:any = this.$j("<td>"+this.person.getFirstName()+"</td>");
        var td2Legend:any = this.$j("<td>Last name:</td>");
        var td2Value:any = this.$j("<td>"+this.person.getLastName()+"</td>");

        tRow1.append(td1Legend);
        tRow1.append(td1Value);
        tRow1.append(td2Legend);
        tRow1.append(td2Value);

        var tRow2:any = this.$j("<tr></tr>");
        var td1Legend:any = this.$j("<td>Birthday:</td>");
        var td1Value:any = this.$j("<td>"+this.person.getBirthday()+"</td>");
        var td2Legend:any = this.$j("<td>Age:</td>");
        var td2Value:any = this.$j("<td>"+this.person.getAge()+"</td>");

        tRow2.append(td1Legend);
        tRow2.append(td1Value);
        tRow2.append(td2Legend);
        tRow2.append(td2Value);

        var tRow3:any = this.$j("<tr></tr>");
        var td1Legend:any = this.$j("<td>Gender:</td>");
        var td1Value:any = this.$j("<td>"+this.person.getGender()+"</td>");

        //var td2Legend:any = this.$j("<td>Medical declaration required:</td>");
        //var td2Value:any = this.$j("<td>"+this.person.getMedicalDeclarationRequired()+"</td>");

        tRow3.append(td1Legend);
        tRow3.append(td1Value);

        //tRow3.append(td2Legend);
        //tRow3.append(td2Value);

        table.append(tRow1);
        table.append(tRow2);
        table.append(tRow3);

        if(!personIsPrimary){
            var tRow4:any = this.$j("<tr></tr>");
            var td1Legend:any = this.$j("<td>Relationship:</td>");
            var td1Value:any = this.$j("<td>"+this.person.getRelationship()+"</td>");

            tRow4.append(td1Legend);
            tRow4.append(td1Value);

            table.append(tRow4);
        }

        this.personContainer.append(table);

        this.container.append(this.personContainer);
    }

    protected createQuestionsView():void {
        var questions:any = this.person.getQuestions();
        new FrontendUserAnswers(questions, this.questionsContainerId);
    }

    protected createQuestionsContainer():void {
        this.questionsContainerId = "questions_"+Math.round(Math.random()*100000);
        this.questionsContainer = this.$j("<div id='"+this.questionsContainerId+"'><h1 style='width: 100%; background-color: #dff0d8; text-align: center;'>Medical declaration questions</h1></div>");
        this.personContainer.append(this.questionsContainer);
    }
}
