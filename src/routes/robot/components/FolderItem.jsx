import React from 'react';
import { Folder, CaretRight, CaretDown, Download } from "@phosphor-icons/react";

const FolderItem = ({ item, onToggle, onDownload }) => (
  <div key={item.name} className="flex flex-col ml-4">
    <div
      className="flex justify-between items-center text-gray-700 dark:text-gray-300 p-2 rounded cursor-pointer relative"
      onClick={() => onToggle(item)}
    >
      <div className="flex items-center">
        {item.isOpen ? <CaretDown className="mr-2" /> : <CaretRight className="mr-2" />}
        <Folder className="mr-2" />
        <span>{item.name}</span>
        <button
          className="ml-2 text-gray-500"
          onClick={(e) => {
            e.stopPropagation();
            onDownload(item);
          }}
        >
          <Download size={20} />
        </button>
      </div>
    </div>
  </div>
);

export default FolderItem;

