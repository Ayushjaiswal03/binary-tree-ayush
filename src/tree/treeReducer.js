// Helper: Deep clone the tree safely
const cloneTree = (tree) => JSON.parse(JSON.stringify(tree));

// Reducer function to handle tree actions
export function treeReducer(state, action) {
  switch (action.type) {
    case 'ADD_CHILD':
      return addChild(state, action.payload.parentName, action.payload.childName);
    case 'REMOVE_CHILD':
        return removeChild(state, action.payload.targetName);
    case 'TOGGLE_EXPAND' :
        return toggleExpand(state, action.payload.targetName);      
    default:
      return state;
  }
}

// Action handler: Add a child to a specific node
function addChild(tree, parentName, childName) {
  const clonedTree = cloneTree(tree);

  const insertChild = (node) => {
    if (node.name === parentName) {
      node.children.push({ name: childName, children: [], isExpanded: true });
      return;
    }
    node.children.forEach(insertChild);
  };

  insertChild(clonedTree);
  return clonedTree;
}

// remove action handler 
function removeChild(tree, targetName) {
    const clonedTree = cloneTree(tree);

    const filterChildren = (node) => {
        node.children = node.children.filter(child => child.name !== targetName);
        node.children.forEach(filterChildren);
    };

    filterChildren(clonedTree);
    return clonedTree;
}

//toggle expand action handler
function toggleExpand(tree, targetName) {
    const clonedTree = cloneTree(tree);

    const toggleNode = (node) => {
        if (node.name === targetName) {
                node.isExpanded =! node.isExpanded;
                return;
            }
            node.children.forEach(toggleNode);
    }
    toggleNode(clonedTree);
    return clonedTree;
};
