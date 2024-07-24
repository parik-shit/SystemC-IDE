import React from 'react';
import { PlusCircle } from "@phosphor-icons/react";

const SidebarActions = ({ onAddFile, onAddFolder }) => (
  <div className="flex text-sm font-bold justify-between items-center w-full mb-4">
    <button
      className="flex border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg items-center text-gray-700 dark:text-gray-300 p-2 mr-2"
      onClick={onAddFile}
    >
      <PlusCircle className="mr-2" />
      Add File
    </button>
    <button
      className="flex border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg items-center text-gray-700 dark:text-gray-300 p-2"
      onClick={onAddFolder}
    >
      <PlusCircle className="mr-2" />
      Add Folder
    </button>
  </div>
);

export default SidebarActions;

