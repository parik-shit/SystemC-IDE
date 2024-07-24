import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const handleDownloadFile = async (file) => {
  const content = file.content || 'No content available';
  const blob = new Blob([content], { type: 'text/plain' });
  saveAs(blob, file.name);
};

export const handleDownloadFolder = async (folder, parentPath = '') => {
  const zip = new JSZip();

  const addToZip = (folder, currentPath) => {
    folder.children.forEach((item) => {
      if (item.type === 'folder') {
        const folderPath = `${currentPath}${item.name}/`;
        addToZip(item, folderPath);
      } else {
        zip.file(`${currentPath}${item.name}`, item.content || 'No content available');
      }
    });
  };

  addToZip(folder, parentPath);
  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, `${folder.name}.zip`);
  });
};

