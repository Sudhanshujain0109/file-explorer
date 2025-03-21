import {useState} from 'react';
import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native';

import {ExplorerData} from '../types/exploreData';

interface FileExplorerProps {
  folderData: ExplorerData;
  handleAddNode: (id: string | number, text: string, isFolder: boolean) => void;
  handleDeleteNode: (id: string | number) => void;
  handleUpdateNode: (id: string | number, text: string) => void;
}

const FileExplorer = ({
  folderData,
  handleAddNode,
  handleDeleteNode,
  handleUpdateNode,
}: FileExplorerProps) => {
  const [inputType, setInputType] = useState({
    isInputOpen: false,
    isFolder: false,
  });
  const [inputText, setInputText] = useState('');

  const handleAddOperation = (type: boolean) => {
    setInputType({
      isInputOpen: true,
      isFolder: type,
    });
  };

  const handleAddFolder = () => {
    handleAddNode(folderData.id, inputText, inputType.isFolder);
    setInputType({
      isInputOpen: false,
      isFolder: false,
    });
    setInputText('');
  };

  const handleDeleteFolder = () => {
    handleDeleteNode(folderData.id);
  };

  const handleUpdateTree = (text: string) => {
    handleUpdateNode(folderData.id, text);
  };

  if (folderData.isFolder) {
    return (
      <>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TextInput
            style={styles.folderContainer}
            value={folderData.name}
            onChangeText={text => handleUpdateTree(text)}
          />
          <Pressable
            onPress={() => handleAddOperation(true)}
            style={styles.operation}>
            <Text>Folder+</Text>
          </Pressable>
          <Pressable
            onPress={() => handleAddOperation(false)}
            style={styles.operation}>
            <Text>File+</Text>
          </Pressable>
          <Pressable style={styles.operation} onPress={handleDeleteFolder}>
            <Text>Delete-</Text>
          </Pressable>
        </View>
        {inputType.isInputOpen && (
          <TextInput
            onChangeText={setInputText}
            onBlur={() => handleAddFolder()}
            value={inputText}
            style={{borderWidth: 1, width: 150, marginLeft: 20}}
          />
        )}
        <View style={{marginLeft: 20, marginTop: 5}}>
          {folderData.child.length > 0 &&
            folderData.child.map(node => {
              return (
                <FileExplorer
                  folderData={node}
                  handleAddNode={handleAddNode}
                  handleDeleteNode={handleDeleteNode}
                  handleUpdateNode={handleUpdateNode}
                />
              );
            })}
        </View>
      </>
    );
  }
  return (
    <>
      <View style={styles.fileContainer}>
        <Text>🧾{folderData.name}</Text>
        <Pressable style={{marginLeft: 10}} onPress={handleDeleteFolder}>
          <Text>Delete-</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  folderContainer: {
    borderWidth: 1,
    marginLeft: 20,
    width: 150,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  fileContainer: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  operation: {
    marginLeft: 10,
  },
});
export default FileExplorer;
