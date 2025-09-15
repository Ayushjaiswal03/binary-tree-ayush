// Helper: Deep clone the tree safely
const cloneTree = (tree) => JSON.parse(JSON.stringify(tree));

// Reducer function to handle tree actions
export function treeReducer(state, action) {
  switch (action.type) {
    case 'ADD_CHILD':
      return addChild(state, action.payload.parentName, action.payload.childName);
    default:
      return state;
  }
}

// Action handler: Add a child to a specific node
function addChild(tree, parentName, childName) {
  const clonedTree = cloneTree(tree);

  const insertChild = (node) => {
    if (node.name === parentName) {
      node.children.push({ name: childName, children: [] });
      return;
    }
    node.children.forEach(insertChild);
  };

  insertChild(clonedTree);
  return clonedTree;
}
