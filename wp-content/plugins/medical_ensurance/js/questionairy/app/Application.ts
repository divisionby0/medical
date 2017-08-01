///<reference path="../../events/EventBus.ts"/>
///<reference path="BaseApplication.ts"/>
///<reference path="../questions/question/view/QuestionViewFactory.ts"/>
///<reference path="../questions/node/CollectionChangeOrderListener.ts"/>
///<reference path="views/element/treeView/TreeViewEventType.ts"/>
///<reference path="views/element/NodeDialogEventType.ts"/>
///<reference path="../../libs/jqueryTS/jquery.d.ts"/>
///<reference path="../questions/utils/ObjectUtil.ts"/>
///<reference path="views/element/dialog/RemoveNodeConfirmationDialog.ts"/>
///<reference path="views/element/dialog/EditNodeDialog.ts"/>
///<reference path="views/element/dialog/CreateQuestionDialog.ts"/>
///<reference path="views/element/dialog/CreateAnswerDialog.ts"/>
///<reference path="../questions/node/edit/EditNode.ts"/>
///<reference path="../questions/node/remove/RemoveNode.ts"/>
///<reference path="../questions/node/create/CreateNode.ts"/>
///<reference path="saver/SaveFile.ts"/>
declare var ManualTreeView;
class Application extends BaseApplication{

    // TODO все это нужно отрефакторить !!!
    private manualTreeView:any;
    private currentNode:any;
    
    private questionViewType:string = QuestionViewFactory.QUESTION_ADMIN_VIEW;
    private collectionChangeOrderListener:CollectionChangeOrderListener;

    constructor(){
        super();
        EventBus.addEventListener(CollectionEventType.COLLECTION_CHANGED, ()=>this.onQuestionCollectionChanged());
    }

    protected init():void{
        this.manualTreeView = new ManualTreeView();

        var data:string = this.$j("#questionaryEditor").val();
        this.onDataLoaded(data);

        this.selectDefaultNode();

        EventBus.addEventListener(TreeViewEventType.NODE_SELECTED, (node)=>this.onNodeSelected(node));
        EventBus.addEventListener(TreeViewEventType.NODE_UNSELECTED, ()=>this.onNodeUnselected());

        EventBus.addEventListener(TreeViewEventType.NODE_REMOVE_REQUEST, (node)=>this.onNodeRemoveRequest(node));
        EventBus.addEventListener(TreeViewEventType.NODE_EDIT_REQUEST, (node)=>this.onNodeEditRequest(node));

        EventBus.addEventListener(NodeDialogEventType.CREATE, (data)=>this.onCreateNode(data));
        EventBus.addEventListener(NodeDialogEventType.REMOVE, (data)=>this.onRemoveNode(data));
        EventBus.addEventListener(NodeDialogEventType.UPDATE, (data)=>this.onUpdateNode(data));

        this.$j('#createRootQuestionButton').click(()=>this.newQuestionRequest());
        this.$j('#createSubQuestionButton').click(()=>this.newQuestionRequest());
        this.$j('#createAnswerButton').click(()=>this.newAnswerRequest());

        this.$j('#searchButton').click(()=>this.searchQuestions());

        this.updateUI();
    }

    private searchQuestions():void{
        var searchText:string = this.$j('#input-search').val();
        if(searchText.length > 3){
            console.log("search for ",searchText);
            var node:any = this.manualTreeView.search(searchText);
            this.manualTreeView.select(node);
        }
    }

    protected onDataLoaded(data:string):void {
        super.onDataLoaded(data);

        this.questions = QuestionCollectionParser.parse(this.map, this.questionViewType);

        this.collectionChangeOrderListener = new CollectionChangeOrderListener(this.questions);

        this.onQuestionCollectionChanged();
        this.selectDefaultNode();
    }

    private onNodeSelected(node:any):void{
        this.currentNode = {nodeId:node.nodeId, parentNodeId:node.parentNodeId, text:node.text, object:node.object};

        var type:string = ObjectUtil.getObjectType(this.currentNode.object);
        this.currentNode.type = type;

        this.updateUI();
    }

    private updateUI():void{
        //console.log("update UI this.currentNode.type="+this.currentNode.type);
        if(this.currentNode.type == ObjectType.ANSWER_VARIATION){
            this.disableRootQuestionButton();
            this.disableAnswerButton();
            this.enableSubQuestionButton();
        }
        else if(this.currentNode.type == ObjectType.QUESTION){
            var answer:any = this.currentNode.object.answer;

            if(answer instanceof TextInputAnswer){
                this.disableRootQuestionButton();
                this.enableSubQuestionButton();
            }
            else{
                if(answer instanceof BooleanAnswer || answer instanceof DateSelectionAnswer){
                    this.disableNodeCreationUI();
                }
                else {
                    this.enableAnswerButton();
                    this.disableRootQuestionButton();
                    this.disableSubQuestionButton();
                }
            }
        }
        else if(this.currentNode.type == ObjectType.QUESTION_COLLECTION){
            this.enableRootQuestionButton();
            this.disableSubQuestionButton();
            this.disableAnswerButton();
        }
    }

    // ui
    private disableRootQuestionButton():void{
        this.$j('#createRootQuestionButton').addClass("disabled");
        this.$j('#createRootQuestionButton').prop("disabled", true);
    }
    private enableRootQuestionButton():void{
        this.$j('#createRootQuestionButton').removeClass("disabled");
        this.$j('#createRootQuestionButton').prop("disabled", false);
    }

    private disableSubQuestionButton():void{
        this.$j('#createSubQuestionButton').addClass("disabled");
        this.$j('#createSubQuestionButton').prop("disabled", true);
    }
    private enableSubQuestionButton():void{
        this.$j('#createSubQuestionButton').removeClass("disabled");
        this.$j('#createSubQuestionButton').prop("disabled", false);
    }

    private disableAnswerButton():void{
        this.$j('#createAnswerButton').addClass("disabled");
        this.$j('#createAnswerButton').prop("disabled", true);
    }
    private enableAnswerButton():void{
        this.$j('#createAnswerButton').removeClass("disabled");
        this.$j('#createAnswerButton').prop("disabled", false);
    }
    
    private disableNodeCreationUI():void{
        this.disableAnswerButton();
        this.disableRootQuestionButton();
        this.disableSubQuestionButton();
    }

    private onNodeUnselected():void{
        this.selectDefaultNode();
        this.updateUI();
    }

    private onNodeRemoveRequest(node:any):void{
        if(node){
            var dialog:RemoveNodeConfirmationDialog = new RemoveNodeConfirmationDialog(node);
        }
    }

    private onNodeEditRequest(node:any):void{
        if(node){
            var dialog:EditNodeDialog = new EditNodeDialog(node);
        }
    }

    private selectDefaultNode():void{
        this.currentNode = {text:"questions", object:this.questions, type:ObjectType.QUESTION_COLLECTION};
    }

    private newQuestionRequest():void{
        var createQuestionDialog:CreateQuestionDialog = new CreateQuestionDialog(this.currentNode.text);
    }
    private newAnswerRequest():void{
        var createAnswerDialog:CreateAnswerDialog = new CreateAnswerDialog(this.currentNode.text);
    }

    private onUpdateNode(data:any):void{
        new EditNode(data);
        this.onQuestionCollectionChanged();
    }
    private onRemoveNode(data:any):void{
        new RemoveNode(data, this.questions);

        this.onQuestionCollectionChanged();
        if(this.currentNode.parentNodeId && this.currentNode.parentNodeId!=-1){
            this.manualTreeView.select(this.currentNode.parentNodeId);
        }
    }

    private onCreateNode(data:any):void{
        console.log("create new node");
        console.log("this.currentNode=",this.currentNode);
        var createNode:CreateNode = new CreateNode();
        var newNode:ICompositeNode = createNode.execute(data, this.currentNode, this.questionViewType);

        this.onNodeCreated();
        this.onQuestionCollectionChanged();

        if(newNode){
            this.selectNode(newNode.getText(), newNode.getId());
        }
    }

    private selectNode(nodeText:string, objectId:any):void{
        console.log("selectNode text="+nodeText+"  id="+objectId);
        var node:any = this.manualTreeView.search(nodeText, objectId);

        console.log("found node=",node);

        if(node){
            this.manualTreeView.select(node);
            this.onNodeSelected(node);
        }
    }

    private onQuestionCollectionChanged():void{
        this.updateTreeView();
        this.collectionChangeOrderListener.updateCollection(this.questions);
        this.updateData();
    }
    
    private updateTreeView():void{
        var questionsData:Array<any> = this.questions.getData();
        this.manualTreeView.setData(questionsData);
    }

    private onNodeCreated():void {
        this.disableNodeCreationUI();
    }

    private updateData():void {
        this.$j("#questionaryEditor").val(this.questions.getEncoder().encode());
    }
}
