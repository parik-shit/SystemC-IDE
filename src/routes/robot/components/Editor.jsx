import React from 'react';
import { useDispatch } from 'react-redux';
import { Editor } from '@monaco-editor/react';
import { updateFileContent } from '../../../features/files/fileSlice';

const MyEditor = ({ file }) => {
  const dispatch = useDispatch();

  const handleEditorChange = (newValue) => {
    if (file) {
      dispatch(updateFileContent({ fileName: file.name, content: newValue }));
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    console.log('Editor mounted');
    monaco.editor.defineTheme('blackTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6a9955' },
        { token: 'string', foreground: 'ce9178' },
        { token: 'keyword', foreground: '569cd6' },
        { token: 'variable', foreground: '9cdcfe' },
      ],
      colors: {
        'editor.background': '#000000',
        'editor.foreground': '#d4d4d4',
        'editorCursor.foreground': '#aeafad',
        'editor.lineHighlightBackground': '#333333',
        'editor.selectionBackground': '#264f78',
      }
    });
    monaco.editor.setTheme('blackTheme');
  };

  return (
    <div className="h-screen w-full p-6">
      <Editor
        height="100%"
        language="cpp"
        value={file ? file.content : ""}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        theme="blackTheme"
      />
    </div>
  );
};

export default MyEditor;

