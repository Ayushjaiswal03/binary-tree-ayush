import React from 'react';
import './index.css';
import treeData from './data.json'; 

// Static tree data for Phase 1 layout rendering.
// Will be replaced with dynamic import from data.json in Phase 2.
// const treeData = {
//   name: 'mammals',
//   children: [
//     { name: 'cheetah', children: [] },
//     {
//       name: 'bear',
//       children: [
//         { name: 'lion', children: [] },
//         {
//           name: 'dog',
//           children: [
//             { name: 'elephant', children: [] }
//           ]
//         }
//       ]
//     },
//     { name: 'ape', children: [] }
//   ]
// };

// Recursive component to render tree nodes.
// Uses ARIA roles for accessibility and semantic structure.
function TreeNode({ node, level }) {
  return (
    <li
      className={`tree-item item-level-${level}`}
      role="treeitem"
      aria-level={level + 1}
      aria-selected={false} // Required for accessibility compliance
    >
      {node.name}
      {node.children?.length > 0 && (
        <ul className="tree-list" role="group">
          {node.children.map((child, idx) => (
            <TreeNode key={idx} node={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

// Root component rendering the full tree.
// Will later be enhanced with dynamic data and interactions.
export default function Tree() {
  return (
    <div className="tree">
      <ul className="tree-list" role="tree">
        <TreeNode node={treeData} level={0} />
      </ul>
    </div>
  );
}
