// FileContext.js
import React, { createContext, useState } from 'react';

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([
    { name: "File1.txt", type: "file", content: "Content of File1" },
    { name: "File2.txt", type: "file", content: "Content of File2" },
    {
      name: "Folder1",
      type: "folder",
      children: [{ name: "File3.txt", type: "file", content: "Content of File3" }],
      isOpen: true,
    },
  ]);

  const updateFilesState = (newFiles) => {
    setFiles(newFiles);
  };

  const updateFileContent = (fileName, content) => {
    const updateFileContentRecursive = (structure) => {
      return structure.map(file => {
        if (file.type === 'file' && file.name === fileName) {
          return { ...file, content };
        } else if (file.type === 'folder') {
          return { ...file, children: updateFileContentRecursive(file.children) };
        }
        return file;
      });
    };

    setFiles(updateFileContentRecursive(files));
  };

  return (
    <FileContext.Provider value={{ files, updateFilesState, updateFileContent }}>
      {children}
    </FileContext.Provider>
  );
};

