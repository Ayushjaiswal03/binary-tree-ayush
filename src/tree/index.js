import React, { useReducer, useState, useCallback } from 'react';
import './index.css';
import initialTreeData from './data.json';
import { treeReducer } from './treeReducer';
// import { FixedSizeList as List } from 'react-window';

// Recursive component to render each node
const TreeNode = React.memo(function TreeNode({ node, level, onAddChild, onRemove, onToggleExpand}) {
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
      <button
      className='remove-btn'
          onClick={() => onRemove(node.name)}
          aria-label = {`Remove ${node.name}`}
        >
          X
          </button>
      <button 
        className='expand-btn'
        onClick={() => onToggleExpand(node.name)}
        aria-label= {`Toggle ${node.name}`}
       >
        {node.isExpanded ? '>' : '<'}
        </button>  
         
      {node.isExpanded && node.children.length > 0 && (
        <ul className="tree-list" role="group">
          {node.children.map((child, idx) => (
            <TreeNode
              key={`${child.name}-${idx}`}
              node={child}
              level={level + 1}
              onAddChild={onAddChild}
              onRemove={onRemove}
              onToggleExpand={onToggleExpand}
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

  const handleRemoveChild = useCallback((targetName) => {
    dispatch({ type: 'REMOVE_CHILD', payload: { targetName }});
  }, []);

  const handleToggleExpand = useCallback((targetName) => {
    dispatch({ type: 'TOGGLE_EXPAND', payload: { targetName }});
  }, []);

  return (
    <div className="tree">
      <ul className="tree-list" role="tree">
        <TreeNode node={treeData} level={0} onAddChild={handleAddChild} onRemove={handleRemoveChild} onToggleExpand={handleToggleExpand} />
      </ul>
    </div>
  );
}
