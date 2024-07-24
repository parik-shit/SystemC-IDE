import React, { useState } from 'react';
import MyEditor from './components/Editor';
import FilesSidebar from './components/Sidebar';
import { Files, GearSix } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';

function RobotPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFile, setActiveFile] = useState(null);

  // Select the files from Redux state
  const fileStructure = useSelector((state) => state.files.files);

  // Toggle sidebar open/close
  const handleIconClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle opening a file
  const handleOpenFile = (file) => {
    setActiveFile(file);
  };

  // Retrieve the correct file from the state
  const getFileContent = (fileName) => {
    const findFile = (files, name) => {
      for (const file of files) {
        if (file.type === 'file' && file.name === name) {
          return file;
        } else if (file.type === 'folder') {
          const result = findFile(file.children, name);
          if (result) return result;
        }
      }
      return null;
    };
    return findFile(fileStructure, fileName);
  };

  // Get the file to edit based on activeFile
  const fileToEdit = activeFile ? getFileContent(activeFile.name) : null;

  return (
    <div className="bg-black flex min-h-screen overflow-hidden relative">
      {/* Sidebar for icons */}
      <div className="w-16 bg-gray-950 flex flex-col items-center p-4 relative z-20">
        {/* Top icon */}
        <span className="text-white mb-4 text-2xl cursor-pointer" onClick={handleIconClick}>
          <Files size={32} />
        </span>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Bottom icon */}
        <span className="text-white text-2xl">
          <GearSix size={32} />
        </span>
      </div>

      {/* FilesSidebar component */}
      <FilesSidebar isOpen={isSidebarOpen} onOpenFile={handleOpenFile} />

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center items-center p-0 max-h-screen overflow-auto">
        {fileToEdit ? (
          <MyEditor file={fileToEdit} />
        ) : (
          <div className="text-white">Select a file to edit</div>
        )}
      </div>
    </div>
  );
}

export default RobotPage;

