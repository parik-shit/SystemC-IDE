import React from 'react';
import { Trash } from "@phosphor-icons/react";

const ContextMenu = ({ x, y, onClick, onClose }) => (
  <ul
    className="fixed bg-white dark:bg-gray-800 shadow-md rounded z-20"
    style={{ top: y, left: x }}
    onClick={onClose}
  >
    <li
      className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
      onClick={() => onClick("Add File")}
    >
      Add File
    </li>
    <li
      className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
      onClick={() => onClick("Add Folder")}
    >
      Add Folder
    </li>
    <li
      className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
      onClick={() => onClick("Delete")}
    >
      <Trash className="mr-2 inline" />
      Delete
    </li>
  </ul>
);

export default ContextMenu;

