import {ExplorerData} from '../types/exploreData';

const addNode = (
  tree: ExplorerData,
  targetId: string | number,
  text: string,
  isFolder: boolean,
): ExplorerData => {
  if (tree.id === targetId) {
    tree.child.unshift({
      id: new Date().getTime(),
      name: text,
      isFolder: isFolder,
      child: [],
    });

    return {...tree};
  }
  if (tree.child.length > 0) {
    return {
      ...tree,
      child: tree.child.map(node => addNode(node, targetId, text, isFolder)),
    };
  }
  return tree;
};

const deleteNode = (
  tree: ExplorerData,
  targetId: string | number,
): ExplorerData | null => {
  if (targetId === 'root') {
    return tree;
  }

  if (tree.id === targetId) {
    return null;
  }

  if (tree.child.length > 0) {
    const updatedData = tree.child
      .map(node => deleteNode(node, targetId))
      .filter(node => node !== null);
    return {...tree, child: updatedData};
  }
  return tree;
};

const updateNode = (
  tree: ExplorerData,
  targetId: string | number,
  text: string,
): ExplorerData => {
  if (targetId === tree.id) {
    return {
      ...tree,
      name: text,
    };
  }
  if (tree.child.length > 0) {
    return {
      ...tree,
      child: tree.child.map(node => updateNode(node, targetId, text)),
    };
  }
  return tree;
};

export {addNode, deleteNode, updateNode};
