import React from 'react';
import { File, FileCpp, Download } from "@phosphor-icons/react";

const FileItem = ({ item, onOpenFile, onDownload }) => (
  <div
    className="flex justify-between items-center text-gray-700 dark:text-gray-300 p-2 rounded ml-4 cursor-pointer"
    onClick={() => onOpenFile(item)}
    onContextMenu={(e) => {
      e.preventDefault();
      onDownload(item, e.clientX, e.clientY);
    }}
  >
    <div className="flex items-center">
      {item.name.endsWith(".cpp") ? <FileCpp className="mr-2" /> : <File className="mr-2" weight="fill" />}
      <span>{item.name}</span>
      <button className="ml-2 text-gray-500" onClick={(e) => { e.stopPropagation(); onDownload(item); }}>
        <Download size={20} />
      </button>
    </div>
  </div>
);

export default FileItem;

