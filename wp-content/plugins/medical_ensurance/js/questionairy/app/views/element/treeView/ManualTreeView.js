var ManualTreeView = function(){

    var _data;
    var $ = jQuery.noConflict();

    function findNodeBySubObjectId(nodes, searchId){
        var returnNode;
        for(var i = 0; i<nodes.length; i++){
            var currentNode = nodes[i];
            var nodeSubObject = currentNode.object;
            if(nodeSubObject && nodeSubObject.id == searchId){
                returnNode = currentNode;
                break;
            }
        }
        return returnNode;
    }

    function detectIsRemoveButtonClicked(elementId){
        return elementId == "removeItemButton";
    }
    function detectIsEditButtonClicked(elementId){
        return elementId == "editItemButton";
    }
    
    function detectIsUpArrowButton(elementId){
        return elementId == "upArrow";
    }
    function detectIsDownArrowButton(elementId){
        return elementId == "downArrow";
    }

    function onRemoveButtonClicked(node){
        EventBus.dispatchEvent(TreeViewEventType.NODE_REMOVE_REQUEST, node);
    }
    function onEditButtonClicked(node){
        EventBus.dispatchEvent(TreeViewEventType.NODE_EDIT_REQUEST, node);
    }
    function onUpArrowButtonClicked(node){
        var parentNodeId = node.parentId;
        var parentNode = getNodeById(parentNodeId);
        
        var parentNodePayload = parentNode.object;

        console.log("parentNode:",parentNode);

        EventBus.dispatchEvent(TreeViewEventType.NODE_MOVE_UP_REQUEST, {node:node, parentNodePayload:parentNodePayload});
    }
    function onDownArrowButtonClicked(node){
        var parentNodeId = node.parentId;
        var parentNode = getNodeById(parentNodeId);
        var parentNodePayload = parentNode.object;
        EventBus.dispatchEvent(TreeViewEventType.NODE_MOVE_DOWN_REQUEST, {node:node, parentNodePayload:parentNodePayload});
    }

    function getNodeById(id){
        return $('#tree').treeview('getNode', id);
    }

    function onNodeSelected(node){
        console.log("Node selected: ",node);
        var parentNode = $('#tree').treeview('getParent', node);
        var parentNodeId = -1;
        if(parentNode){
            parentNodeId = parentNode.nodeId;
        }
        EventBus.dispatchEvent(TreeViewEventType.NODE_SELECTED, {id:node.id,text:node.text, object:node.object, nodeId:node.nodeId, parentNodeId:parentNodeId});
    }

    function onNodeUnselected(){
        EventBus.dispatchEvent(TreeViewEventType.NODE_UNSELECTED, null);
    }

    return{
        setData:function(data){
            _data = data;
            $('#tree').treeview({data: data});
            //console.log("setData... ",data);
            //$('#tree').treeview('expandAll', { silent: true });

            $('#tree').on('nodeSelected', function(event, node) {
                onNodeSelected(node);
            });

            $('#tree').on('nodeUnselected', function(event, node) {
                onNodeUnselected();
            });

            $('#tree').on('click', function(event) {
                var element = $(event.target);

                var nodeId = element.data("nodeid");
                var elementId = element.attr("id");

                var isRemoveItemButton = detectIsRemoveButtonClicked(elementId);
                var isEditItemButton = detectIsEditButtonClicked(elementId);
                var isUpArrowButton = detectIsUpArrowButton(elementId);
                var isDownArrowButton = detectIsDownArrowButton(elementId);

                var node = getNodeById(nodeId);

                if(isRemoveItemButton){
                    onRemoveButtonClicked(node);
                }
                if(isEditItemButton){
                    onEditButtonClicked(node);
                }
                if(isUpArrowButton){
                    onUpArrowButtonClicked(node);
                }
                if(isDownArrowButton){
                    onDownArrowButtonClicked(node);
                }
            });
        },
        search:function(text, objectId){
            console.log("TreeView search text="+text+"  id="+objectId);
            var nodes = $('#tree').treeview('search', [ text, { ignoreCase: false, exactMatch: false } ]);
            console.log("nodes:",nodes);
            if(nodes.length>0){
                if(objectId){
                    return findNodeBySubObjectId(nodes, objectId);
                }
                else{
                    return nodes[0];
                }
            }
        },
        select:function(node){
            console.log("TreeView select ",node);
            $('#tree').treeview('selectNode', [ node, { silent: true } ]);
            onNodeSelected(node);
        }
    }
};
