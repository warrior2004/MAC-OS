import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import MacWindow from './MacWindow';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDFWindow = ({ onClose, onMinimize, onMaximize, isMaximized, zIndex, onFocus }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <MacWindow 
      title="Preview — Resume.pdf" 
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onFocus={onFocus}
      isMaximized={isMaximized}
      zIndex={zIndex}
    >
      <div className="pdf-container" style={{ height: '100%', overflow: 'hidden' }}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer 
            fileUrl="/resume.pdf" // Ensure your PDF is in the /public folder
            plugins={[defaultLayoutPluginInstance]} 
            theme="dark"
          />
        </Worker>
      </div>
    </MacWindow>
  );
};

export default PDFWindow;