/*
var treeViewTemplate = {
    list: '<ul class="list-group"></ul>',
    item: getItemTemplate(),
    indent: getIndentTemplate(),
    icon: '<span class="icon"></span>',
    link: '<a href="#" style="color:inherit;"></a>',
    badge: '<span class="badge"></span>',
    editIcon: '<span class="indent glyphicon glyphicon-edit" style="float: right;"></span>',
    removeIcon: '<span class="indent glyphicon glyphicon-remove" style="float: right;"></span>'
};

function getItemControlsTemplate(id){
    return '<span id="itemControls_'+id+'" style="float: right;"></span>';
}
function getItemContentTemplate(id){
    return '<span id="itemContent_'+id+'" style="display: inline-block;"></span>';
}

function getItemTemplate(){
    return '<li class="list-group-item"></li>';
}

function getItemTextTemplate(node){
    var text = node.text;
    
    text = removeHtmlTags(text);

    var helperText = node.helperText;
    if(helperText == undefined){
        helperText = "";
    }
    return '<span class="content">'+text+helperText+'</span>';
}

function removeHtmlTags(source){
    return HtmlUtil.strip(source);
}

function getIndentTemplate(){
    return '<span class="indent" style="display: inline-block;"></span>';
}
function getEditIcon(id){
    return '<span data-nodeid="'+id+'" class="indent glyphicon glyphicon-edit editItemButton" style="float: right;"></span>';
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

function createControls(node, container){
    var editEnabled = true;
    var removeEnabled = true;
    var isAnswerVariation = false;

    if(node.object.type == ObjectType.ANSWER_VARIATION){
        isAnswerVariation = true;
    }

    if(isAnswerVariation){
        removeEnabled = editEnabled = iRemovable(node.object);
    }

    if(removeEnabled){
        // add remove icon
        var removeButtonHtml = createRemoveButtonHtml(node.nodeId);
        container.append(removeButtonHtml);
    }
    if(editEnabled){
        // add remove icon
        var editButtonHtml = createEditButtonHtml(node.nodeId);
        container.append(editButtonHtml);
    }
}

function buildTree(wrapper, nodes, level, parent){
    if (!nodes) return;
    level += 1;

    var _this = this;
    $.each(nodes, function addNodes(id, node) {

        var treeItem = $(treeViewTemplate.item);

        var itemContent = $(getItemContentTemplate(node.nodeId));
        var itemControls = $(getItemControlsTemplate(node.nodeId));

        treeItem.append(itemContent);
        treeItem.append(itemControls);

        treeItem
            .addClass('node-' + parent.elementId)
            .addClass(node.state.checked ? 'node-checked' : '')
            .addClass(node.state.disabled ? 'node-disabled': '')
            .addClass(node.state.selected ? 'node-selected' : '')
            .addClass(node.searchResult ? 'search-result' : '')
            .attr('data-nodeid', node.nodeId)
            .attr('style', parent.buildStyleOverride(node));

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

        itemContent
            .append($(treeViewTemplate.icon)
                .addClass(classList.join(' '))
            );


        // Add node icon
        if (parent.options.showIcon) {

            var classList = ['node-icon'];

            classList.push(node.icon || parent.options.nodeIcon);
            if (node.state.selected) {
                classList.pop();
                classList.push(node.selectedIcon || parent.options.selectedIcon ||
                    node.icon || parent.options.nodeIcon);
            }

            itemContent
                .append($(treeViewTemplate.icon)
                    .addClass(classList.join(' '))
                );
        }

        // Add check / unchecked icon
        if (parent.options.showCheckbox) {

            var classList = ['check-icon'];
            if (node.state.checked) {
                classList.push(parent.options.checkedIcon);
            }
            else {
                classList.push(parent.options.uncheckedIcon);
            }

            itemContent
                .append($(treeViewTemplate.icon)
                    .addClass(classList.join(' '))
                );
        }

        // Add indent/spacer to mimic tree structure
        for (var i = 0; i < (level - 1); i++) {
            itemContent.append(treeViewTemplate.indent);
        }

        // Add text
        if (parent.options.enableLinks) {
            // Add hyperlink
            itemContent
                .append($(treeViewTemplate.link)
                    .attr('href', node.href)
                    .append(node.text)
                );
        }
        else {
            // otherwise just text
            itemContent.append(getItemTextTemplate(node));
        }

        createControls(node, itemControls);

        // Add item to the tree
        wrapper.append(treeItem);

        // Recursively addQuestion child ndoes
        if (node.nodes && node.state.expanded && !node.state.disabled) {
            return buildTree(wrapper, node.nodes, level, parent);
        }
    });
}
*/
