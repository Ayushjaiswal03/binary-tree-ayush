import React, { useReducer, useState, useCallback } from 'react';
import './index.css';
import initialTreeData from './data.json';
import { treeReducer } from './treeReducer';

// Recursive component to render each node
const TreeNode = React.memo(function TreeNode({ node, level, onAddChild }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onAddChild(node.name, inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <li
      className={`tree-item item-level-${level}`}
      role="treeitem"
      aria-level={level + 1}
      aria-selected={false}
      aria-expanded={node.children.length > 0}
      aria-label={`Tree node: ${node.name}`}
    >
      <span>{node.name}</span>
      <input
        type="text"
        placeholder="Add child"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="tree-input"
      />
      {node.children.length > 0 && (
        <ul className="tree-list" role="group">
          {node.children.map((child, idx) => (
            <TreeNode
              key={`${child.name}-${idx}`}
              node={child}
              level={level + 1}
              onAddChild={onAddChild}
            />
          ))}
        </ul>
      )}
    </li>
  );
});

// Root component
export default function Tree() {
  const [treeData, dispatch] = useReducer(treeReducer, initialTreeData);

  const handleAddChild = useCallback((parentName, childName) => {
    dispatch({ type: 'ADD_CHILD', payload: { parentName, childName } });
  }, []);

  return (
    <div className="tree">
      <ul className="tree-list" role="tree">
        <TreeNode node={treeData} level={0} onAddChild={handleAddChild} />
      </ul>
    </div>
  );
}
