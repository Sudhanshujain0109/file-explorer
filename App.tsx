/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import FileExplorer from './src/components/FileExplorer';
import {explorerData} from './src/data/exploreData';
import {addNode, deleteNode, updateNode} from './src/helpers/treeOperations';
import {ExplorerData} from './src/types/exploreData';

function App(): React.JSX.Element {
  const [folderData, setFolderData] = useState<ExplorerData>(explorerData);

  const handleAddNode = (
    targetId: string | number,
    text: string,
    isFolder: boolean,
  ) => {
    const updatedTree = addNode(folderData, targetId, text, isFolder);
    setFolderData(updatedTree);
  };

  const handleDeleteNode = (targetId: string | number) => {
    const updatedTree = deleteNode({...folderData}, targetId);
    setFolderData(updatedTree as ExplorerData);
  };

  const handleUpdateNodes = (targetId: string | number, text: string) => {
    const updatedTree = updateNode(folderData, targetId, text);
    setFolderData(updatedTree);
  };

  return (
    <FileExplorer
      folderData={folderData}
      handleAddNode={handleAddNode}
      handleDeleteNode={handleDeleteNode}
      handleUpdateNode={handleUpdateNodes}
    />
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
