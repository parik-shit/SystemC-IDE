import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  files: [],  // Your file/folder structure goes here
  activeFile: null,
};

const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    addFile: (state, action) => {
      const { parentPath, newItem } = action.payload;
      const addFileToStructure = (structure, path, item) => {
        if (path.length === 0) {
          structure.push(item);
          return;
        }
        const index = path[0];
        if (structure[index].type === 'folder') {
          addFileToStructure(structure[index].children, path.slice(1), item);
        }
      };
      addFileToStructure(state.files, parentPath, newItem);
    },
    addFolder: (state, action) => {
      const { parentPath, newItem } = action.payload;
      const addFolderToStructure = (structure, path, item) => {
        if (path.length === 0) {
          structure.push(item);
          return;
        }
        const index = path[0];
        if (structure[index].type === 'folder') {
          addFolderToStructure(structure[index].children, path.slice(1), item);
        }
      };
      addFolderToStructure(state.files, parentPath, newItem);
    },
    deleteFile: (state, action) => {
      const path = action.payload;
      const deleteFromStructure = (structure, path) => {
        if (path.length === 1) {
          structure.splice(path[0], 1);
          return;
        }
        const index = path[0];
        if (structure[index].type === 'folder') {
          deleteFromStructure(structure[index].children, path.slice(1));
        }
      };
      deleteFromStructure(state.files, path);
    },
    toggleFolder: (state, action) => {
      const path = action.payload;
      const toggleFolder = (structure, path) => {
        if (path.length === 0) return;
        const index = path[0];
        if (structure[index].type === 'folder') {
          if (path.length === 1) {
            structure[index].isOpen = !structure[index].isOpen;
          } else {
            toggleFolder(structure[index].children, path.slice(1));
          }
        }
      };
      toggleFolder(state.files, path);
    },
    updateFileContent: (state, action) => {
      const { fileName, content } = action.payload;
      const fileToUpdate = findFileByName(state.files, fileName);
      if (fileToUpdate) {
        fileToUpdate.content = content;
      }
    },
    setActiveFile: (state, action) => {
      state.activeFile = action.payload;
    },
  }
});

// Recursive function to find a file by name
const findFileByName = (files, fileName) => {
  for (let file of files) {
    if (file.type === 'file' && file.name === fileName) {
      return file;
    } else if (file.type === 'folder' && file.children) {
      const result = findFileByName(file.children, fileName);
      if (result) return result;
    }
  }
  return null;
};

export const { addFile, addFolder, deleteFile, toggleFolder, updateFileContent, setActiveFile } = fileSlice.actions;
export default fileSlice.reducer;

