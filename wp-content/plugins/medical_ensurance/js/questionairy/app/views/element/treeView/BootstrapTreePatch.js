var treeViewTemplate = {
    list: '<ul class="list-group"></ul>',
    item: '<li class="list-group-item"></li>',
    indent: '<span class="indent"></span>',
    icon: '<span class="icon"></span>',
    link: '<a href="#" style="color:inherit;"></a>',
    badge: '<span class="badge"></span>',
    editIcon: '<span class="indent glyphicon glyphicon-edit" style="float: right;"></span>',
    removeIcon: '<span class="indent glyphicon glyphicon-remove" style="float: right;"></span>'
};

function getItemTemplate(){
    return '<li class="list-group-item"></li>';
}

function removeHtmlTags(source){
    return HtmlUtil.strip(source);
}

function iRemovable(object){
    if(object.removable != undefined && object.removable != null){
        return object.removable;
    }
    else{
        return false;
    }
}

function createRemoveButtonHtml(id){
    return '<span id="removeItemButton" data-nodeid="'+id+'" class="indent glyphicon glyphicon-remove" style="float: right; color: red;"></span>';
}
function createEditButtonHtml(id){
    return '<span id="editItemButton" data-nodeid="'+id+'" class="indent glyphicon glyphicon-edit" style="float: right;"></span>';
}

function createDownArrow(id){
    var downArrow = '<span id="downArrow" data-nodeid="'+id+'" class="indent glyphicon glyphicon-arrow-down" style="float: right;"></span>';
    return downArrow;
}

function createUpArrow(id){
    var upArrow = '<span id="upArrow" data-nodeid="'+id+'" class="indent glyphicon glyphicon-arrow-up" style="float: right;"></span>';
    return upArrow;
}

function buildTree(wrapper, nodes, level, parent){
    var $ = jQuery.noConflict();
    if (!nodes) return;
    level += 1;

    $.each(nodes, function addNodes(id, node) {

        var editEnabled = true;
        var removeEnabled = true;
        var isAnswerVariation = false;

        if(node.object.type == ObjectType.ANSWER_VARIATION){
            isAnswerVariation = true;
        }

        if(isAnswerVariation){
            removeEnabled = editEnabled = iRemovable(node.object);
        }

        var treeItem = $(treeViewTemplate.item)
            .addClass('node-' + node.nodeId)
            .addClass(node.state.checked ? 'node-checked' : '')
            .addClass(node.state.disabled ? 'node-disabled': '')
            .addClass(node.state.selected ? 'node-selected' : '')
            .addClass(node.searchResult ? 'search-result' : '')
            .attr('data-nodeid', node.nodeId)
            .attr('style', parent.buildStyleOverride(node));

        
        // Add indent/spacer to mimic tree structure
        for (var i = 0; i < (level - 1); i++) {
            treeItem.append(treeViewTemplate.indent);
        }

        // Add expand, collapse or empty spacer icons
        var classList = [];
        if (node.nodes) {
            classList.push('expand-icon');
            if (node.state.expanded) {
                classList.push(parent.options.collapseIcon);
            }
            else {
                classList.push(parent.options.expandIcon);
            }
        }
        else {
            classList.push(parent.options.emptyIcon);
        }

        treeItem
            .append($(treeViewTemplate.icon)
                .addClass(classList.join(' '))
            );

        // Add text
        if (parent.options.enableLinks) {
            // Add hyperlink
            treeItem
                .append($(treeViewTemplate.link)
                    .attr('href', node.href)
                    .append(node.text)
                );
        }
        else {
            var textContainer = $("<span id='textContainer' style='display: inline-block; width: 800px;'></span>");
            treeItem.append(textContainer);

            var nodeText = removeHtmlTags(node.text);
            textContainer.append(nodeText);

            var controls = $("<span style='display: inline-block; width: 160px; float: right;'></span>");
            if(removeEnabled){
                controls.append(createRemoveButtonHtml(node.nodeId));
            }
            if(editEnabled){
                controls.append(createEditButtonHtml(node.nodeId));
                controls.append(createUpArrow(node.nodeId));
                controls.append(createDownArrow(node.nodeId));
            }

            treeItem.append(controls);
        }


        // Add item to the tree
        wrapper.append(treeItem);

        // Recursively add child ndoes
        if (node.nodes && node.state.expanded && !node.state.disabled) {
            return buildTree(wrapper, node.nodes, level, parent);
        }
    });
}
