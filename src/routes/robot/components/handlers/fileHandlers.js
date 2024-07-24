import { addFile, deleteFile } from '../../../../features/files/fileSlice'; // Adjust the path if needed

export const handleAddFile = (dispatch, parentPath) => {
  const fileName = prompt("Enter the new file name:");
  if (fileName) {
    dispatch(addFile({ parentPath, newItem: { name: fileName, type: "file", content: "" } }));
  }
};

export const handleDeleteFile = (dispatch, path) => {
  dispatch(deleteFile(path));
};

