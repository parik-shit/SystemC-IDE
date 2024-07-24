import { addFolder, toggleFolder } from '../../../../features/files/fileSlice'; // Adjust the path if needed

export const handleAddFolder = (dispatch, parentPath) => {
  const folderName = prompt("Enter the new folder name:");
  if (folderName) {
    dispatch(addFolder({ parentPath, newItem: { name: folderName, type: "folder", children: [], isOpen: true } }));
  }
};

export const handleToggleFolder = (dispatch, path) => {
  dispatch(toggleFolder(path));
};

