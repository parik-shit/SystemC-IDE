import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { File, Folder, CaretRight, CaretDown, PlusCircle, Trash, FileCpp, Download } from "@phosphor-icons/react";
import { addFile, addFolder, deleteFile, toggleFolder } from '../../../features/files/fileSlice';

function FilesSidebar({ isOpen, onOpenFile }) {
  const fileStructure = useSelector((state) => state.files.files); // Ensure this matches your Redux state
  const dispatch = useDispatch();
  const [contextMenu, setContextMenu] = useState(null);

  // Function to add a file to the structure
  const handleAddFile = (parentPath = []) => {
    const fileName = prompt("Enter the new file name:");
    if (fileName) {
      dispatch(addFile({ parentPath, newItem: { name: fileName, type: "file", content: "" } }));
    }
  };

  // Function to add a folder to the structure
  const handleAddFolder = (parentPath = []) => {
    const folderName = prompt("Enter the new folder name:");
    if (folderName) {
      dispatch(addFolder({ parentPath, newItem: { name: folderName, type: "folder", children: [], isOpen: true } }));
    }
  };

  // Function to delete an item from the structure
  const handleDelete = (path) => {
    dispatch(deleteFile(path));
  };

  // Function to toggle folder open/close state
  const handleToggle = (path) => {
    dispatch(toggleFolder(path));
  };

  // Function to download a file
  const handleDownloadFile = async (file) => {
    const content = file.content || 'No content available'; // Get file content from state
    const blob = new Blob([content], { type: 'text/plain' });
    saveAs(blob, file.name);
  };

  // Function to download a folder as a ZIP file
  const handleDownloadFolder = async (folder, parentPath = '') => {
    const zip = new JSZip();

    // Recursive function to add files and folders to the ZIP
    const addToZip = (folder, currentPath) => {
      folder.children.forEach((item) => {
        if (item.type === 'folder') {
          // Create a new folder in the ZIP
          const folderPath = `${currentPath}${item.name}/`;
          addToZip(item, folderPath);
        } else {
          // Add file to the ZIP
          zip.file(`${currentPath}${item.name}`, item.content || 'No content available');
        }
      });
    };

    // Start adding items to the ZIP from the root folder
    addToZip(folder, parentPath);

    // Generate ZIP and trigger download
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, `${folder.name}.zip`);
    });
  };

  // Render files and folders recursively
  const renderFiles = (structure, path = []) => {
    if (!Array.isArray(structure)) {
      console.error("Expected 'structure' to be an array but got:", structure);
      return null;
    }

    return structure.map((item, index) => {
      const currentPath = [...path, index];
      if (item.type === 'folder') {
        return (
          <div key={index} className="flex flex-col ml-4">
            <div
              className="flex justify-between items-center text-gray-700 dark:text-gray-300 p-2 rounded cursor-pointer relative"
              onClick={() => handleToggle(currentPath)}
              onContextMenu={(e) => {
                e.preventDefault();
                setContextMenu({
                  visible: true,
                  x: e.clientX,
                  y: e.clientY,
                  path: currentPath,
                  item: item,
                });
              }}
            >
              <div className="flex items-center">
                {item.isOpen ? <CaretDown className="mr-2" /> : <CaretRight className="mr-2" />}
                <Folder className="mr-2" />
                <span>{item.name}</span>
                <button
                  className="ml-2 text-gray-500"
                  onClick={() => handleDownloadFolder(item)}
                >
                  <Download size={20} />
                </button>
              </div>
            </div>
            {item.isOpen && renderFiles(item.children, currentPath)}
          </div>
        );
      }
      return (
        <div
          key={index}
          className="flex justify-between items-center text-gray-700 dark:text-gray-300 p-2 rounded ml-4 cursor-pointer"
          onClick={() => onOpenFile(item)}
          onContextMenu={(e) => {
            e.preventDefault();
            setContextMenu({
              visible: true,
              x: e.clientX,
              y: e.clientY,
              path: currentPath,
              item: item,
            });
          }}
        >
          <div className="flex items-center">
            {item.name.endsWith(".cpp") ? <FileCpp className="mr-2" /> : <File className="mr-2" weight="fill" />}
            <span>{item.name}</span>
            <button
              className="ml-2 text-gray-500"
              onClick={() => handleDownloadFile(item)}
            >
              <Download size={20} />
            </button>
          </div>
        </div>
      );
    });
  };

  // Handle context menu actions
  const handleContextMenuClick = (action) => {
    if (contextMenu) {
      if (action === "Add File") handleAddFile(contextMenu.path);
      if (action === "Add Folder") handleAddFolder(contextMenu.path);
      if (action === "Delete") handleDelete(contextMenu.path);
      setContextMenu(null);
    }
  };

  return (
    <div
      className={`fixed rounded top-0 left-16 w-64 h-full bg-white dark:bg-gray-900 shadow-lg z-10 flex flex-col items-center p-4 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-[calc(100%+4rem)]"
      }`}
      style={{ transformOrigin: "left center" }}
      onClick={() => setContextMenu(null)} // Hide context menu on click outside
    >
      <div className="flex text-sm font-bold justify-between items-center w-full mb-4">
        <button
          className="flex border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg items-center text-gray-700 dark:text-gray-300 p-2 mr-2"
          onClick={() => handleAddFile()}
        >
          <PlusCircle className="mr-2" />
          Add File
        </button>
        <button
          className="flex border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg items-center text-gray-700 dark:text-gray-300 p-2"
          onClick={() => handleAddFolder()}
        >
          <PlusCircle className="mr-2" />
          Add Folder
        </button>
      </div>
      <div className="flex flex-col space-y-2 w-full overflow-y-auto">
        {renderFiles(fileStructure)}
      </div>

      {contextMenu && contextMenu.visible && (
        <ul
          className="fixed bg-white dark:bg-gray-800 shadow-md rounded z-20"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <li
            className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => handleContextMenuClick("Add File")}
          >
            Add File
          </li>
          <li
            className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => handleContextMenuClick("Add Folder")}
          >
            Add Folder
          </li>
          <li
            className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => handleContextMenuClick("Delete")}
          >
            <Trash className="mr-2 inline" />
            Delete
          </li>
        </ul>
      )}
    </div>
  );
}

export default FilesSidebar;

