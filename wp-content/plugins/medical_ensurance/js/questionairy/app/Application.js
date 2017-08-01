var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var Application = (function (_super) {
    __extends(Application, _super);
    function Application() {
        var _this = this;
        _super.call(this);
        this.questionViewType = QuestionViewFactory.QUESTION_ADMIN_VIEW;
        EventBus.addEventListener(CollectionEventType.COLLECTION_CHANGED, function () { return _this.onQuestionCollectionChanged(); });
    }
    Application.prototype.init = function () {
        var _this = this;
        this.manualTreeView = new ManualTreeView();
        var data = this.$j("#questionaryEditor").val();
        this.onDataLoaded(data);
        this.selectDefaultNode();
        EventBus.addEventListener(TreeViewEventType.NODE_SELECTED, function (node) { return _this.onNodeSelected(node); });
        EventBus.addEventListener(TreeViewEventType.NODE_UNSELECTED, function () { return _this.onNodeUnselected(); });
        EventBus.addEventListener(TreeViewEventType.NODE_REMOVE_REQUEST, function (node) { return _this.onNodeRemoveRequest(node); });
        EventBus.addEventListener(TreeViewEventType.NODE_EDIT_REQUEST, function (node) { return _this.onNodeEditRequest(node); });
        EventBus.addEventListener(NodeDialogEventType.CREATE, function (data) { return _this.onCreateNode(data); });
        EventBus.addEventListener(NodeDialogEventType.REMOVE, function (data) { return _this.onRemoveNode(data); });
        EventBus.addEventListener(NodeDialogEventType.UPDATE, function (data) { return _this.onUpdateNode(data); });
        this.$j('#createRootQuestionButton').click(function () { return _this.newQuestionRequest(); });
        this.$j('#createSubQuestionButton').click(function () { return _this.newQuestionRequest(); });
        this.$j('#createAnswerButton').click(function () { return _this.newAnswerRequest(); });
        this.$j('#searchButton').click(function () { return _this.searchQuestions(); });
        this.updateUI();
    };
    Application.prototype.searchQuestions = function () {
        var searchText = this.$j('#input-search').val();
        if (searchText.length > 3) {
            console.log("search for ", searchText);
            var node = this.manualTreeView.search(searchText);
            this.manualTreeView.select(node);
        }
    };
    Application.prototype.onDataLoaded = function (data) {
        _super.prototype.onDataLoaded.call(this, data);
        this.questions = QuestionCollectionParser.parse(this.map, this.questionViewType);
        this.collectionChangeOrderListener = new CollectionChangeOrderListener(this.questions);
        this.onQuestionCollectionChanged();
        this.selectDefaultNode();
    };
    Application.prototype.onNodeSelected = function (node) {
        this.currentNode = { nodeId: node.nodeId, parentNodeId: node.parentNodeId, text: node.text, object: node.object };
        var type = ObjectUtil.getObjectType(this.currentNode.object);
        this.currentNode.type = type;
        this.updateUI();
    };
    Application.prototype.updateUI = function () {
        //console.log("update UI this.currentNode.type="+this.currentNode.type);
        if (this.currentNode.type == ObjectType.ANSWER_VARIATION) {
            this.disableRootQuestionButton();
            this.disableAnswerButton();
            this.enableSubQuestionButton();
        }
        else if (this.currentNode.type == ObjectType.QUESTION) {
            var answer = this.currentNode.object.answer;
            if (answer instanceof TextInputAnswer) {
                this.disableRootQuestionButton();
                this.enableSubQuestionButton();
            }
            else {
                if (answer instanceof BooleanAnswer || answer instanceof DateSelectionAnswer) {
                    this.disableNodeCreationUI();
                }
                else {
                    this.enableAnswerButton();
                    this.disableRootQuestionButton();
                    this.disableSubQuestionButton();
                }
            }
        }
        else if (this.currentNode.type == ObjectType.QUESTION_COLLECTION) {
            this.enableRootQuestionButton();
            this.disableSubQuestionButton();
            this.disableAnswerButton();
        }
    };
    // ui
    Application.prototype.disableRootQuestionButton = function () {
        this.$j('#createRootQuestionButton').addClass("disabled");
        this.$j('#createRootQuestionButton').prop("disabled", true);
    };
    Application.prototype.enableRootQuestionButton = function () {
        this.$j('#createRootQuestionButton').removeClass("disabled");
        this.$j('#createRootQuestionButton').prop("disabled", false);
    };
    Application.prototype.disableSubQuestionButton = function () {
        this.$j('#createSubQuestionButton').addClass("disabled");
        this.$j('#createSubQuestionButton').prop("disabled", true);
    };
    Application.prototype.enableSubQuestionButton = function () {
        this.$j('#createSubQuestionButton').removeClass("disabled");
        this.$j('#createSubQuestionButton').prop("disabled", false);
    };
    Application.prototype.disableAnswerButton = function () {
        this.$j('#createAnswerButton').addClass("disabled");
        this.$j('#createAnswerButton').prop("disabled", true);
    };
    Application.prototype.enableAnswerButton = function () {
        this.$j('#createAnswerButton').removeClass("disabled");
        this.$j('#createAnswerButton').prop("disabled", false);
    };
    Application.prototype.disableNodeCreationUI = function () {
        this.disableAnswerButton();
        this.disableRootQuestionButton();
        this.disableSubQuestionButton();
    };
    Application.prototype.onNodeUnselected = function () {
        this.selectDefaultNode();
        this.updateUI();
    };
    Application.prototype.onNodeRemoveRequest = function (node) {
        if (node) {
            var dialog = new RemoveNodeConfirmationDialog(node);
        }
    };
    Application.prototype.onNodeEditRequest = function (node) {
        if (node) {
            var dialog = new EditNodeDialog(node);
        }
    };
    Application.prototype.selectDefaultNode = function () {
        this.currentNode = { text: "questions", object: this.questions, type: ObjectType.QUESTION_COLLECTION };
    };
    Application.prototype.newQuestionRequest = function () {
        var createQuestionDialog = new CreateQuestionDialog(this.currentNode.text);
    };
    Application.prototype.newAnswerRequest = function () {
        var createAnswerDialog = new CreateAnswerDialog(this.currentNode.text);
    };
    Application.prototype.onUpdateNode = function (data) {
        new EditNode(data);
        this.onQuestionCollectionChanged();
    };
    Application.prototype.onRemoveNode = function (data) {
        new RemoveNode(data, this.questions);
        this.onQuestionCollectionChanged();
        if (this.currentNode.parentNodeId && this.currentNode.parentNodeId != -1) {
            this.manualTreeView.select(this.currentNode.parentNodeId);
        }
    };
    Application.prototype.onCreateNode = function (data) {
        console.log("create new node");
        console.log("this.currentNode=", this.currentNode);
        var createNode = new CreateNode();
        var newNode = createNode.execute(data, this.currentNode, this.questionViewType);
        this.onNodeCreated();
        this.onQuestionCollectionChanged();
        if (newNode) {
            this.selectNode(newNode.getText(), newNode.getId());
        }
    };
    Application.prototype.selectNode = function (nodeText, objectId) {
        console.log("selectNode text=" + nodeText + "  id=" + objectId);
        var node = this.manualTreeView.search(nodeText, objectId);
        console.log("found node=", node);
        if (node) {
            this.manualTreeView.select(node);
            this.onNodeSelected(node);
        }
    };
    Application.prototype.onQuestionCollectionChanged = function () {
        this.updateTreeView();
        this.collectionChangeOrderListener.updateCollection(this.questions);
        this.updateData();
    };
    Application.prototype.updateTreeView = function () {
        var questionsData = this.questions.getData();
        this.manualTreeView.setData(questionsData);
    };
    Application.prototype.onNodeCreated = function () {
        this.disableNodeCreationUI();
    };
    Application.prototype.updateData = function () {
        this.$j("#questionaryEditor").val(this.questions.getEncoder().encode());
    };
    return Application;
}(BaseApplication));
//# sourceMappingURL=Application.js.map