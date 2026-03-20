import React, { useState } from "react";
import "./app.scss";
import Dock from "./components/jsx/Dock";
import Nav from "./components/jsx/Nav";
import Github from "./components/windows/Github";
import Notes from "./components/windows/Notes";
import PDFWindow from "./components/windows/PDFViewer";
import Terminal from "./components/windows/Terminal";
import YouTubeMusic from "./components/windows/YoutubeMusic";
import Calendar from "./components/windows/Calender";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const [windows, setWindows] = useState({
    github: { isOpen: false, isMaximized: false, isMinimized: false, zIndex: 1 },
    notes: { isOpen: false, isMaximized: false, isMinimized: false, zIndex: 1 },
    pdf: { isOpen: false, isMaximized: false, isMinimized: false, zIndex: 1 },
    terminal: { isOpen: false, isMaximized: false, isMinimized: false, zIndex: 1 },
    youtube: { isOpen: false, isMaximized: false, isMinimized: false, zIndex: 1 },
    calender: { isOpen: false, isMaximized: false, isMinimized: false, zIndex: 1 }
  });

  const [activeZ, setActiveZ] = useState(10);

  const handleWindowAction = (app, action) => {
    setWindows(prev => {
      const current = prev[app];
      if (!current) return prev; // Safety check

      let newState = { ...current };

      switch (action) {
        case 'close':
          newState = { ...current, isOpen: false, isMaximized: false, isMinimized: false };
          break;
        case 'minimize':
          newState.isMinimized = true;
          break;
        case 'maximize':
          newState.isMaximized = !current.isMaximized;
          break;
        case 'focus':
          const newZ = activeZ + 1;
          setActiveZ(newZ);
          newState.zIndex = newZ;
          break;
        case 'toggle':
          const nextZ = activeZ + 1;
          setActiveZ(nextZ);
          if (!current.isOpen) {
            newState = { isOpen: true, isMinimized: false, isMaximized: false, zIndex: nextZ };
          } else if (current.isMinimized) {
            newState.isMinimized = false;
            newState.zIndex = nextZ;
          } else {
            newState.isMinimized = true;
          }
          break;
        default:
          break;
      }

      return { ...prev, [app]: newState };
    });
  };

  return (
    <div className="desktop-container">
      <Nav />

      <div className="window-workspace">
        <AnimatePresence>
          {/* GitHub Window */}
          {windows.github.isOpen && !windows.github.isMinimized && (
            <Github
              key="github"
              isMaximized={windows.github.isMaximized}
              onClose={() => handleWindowAction("github", "close")}
              onMinimize={() => handleWindowAction("github", "minimize")}
              onMaximize={() => handleWindowAction("github", "maximize")}
              onFocus={() => handleWindowAction("github", "focus")}
              zIndex={windows.github.zIndex}
            />
          )}

          {/* Notes Window */}
          {windows.notes.isOpen && !windows.notes.isMinimized && (
            <Notes
              key="notes"
              isMaximized={windows.notes.isMaximized}
              onClose={() => handleWindowAction("notes", "close")}
              onMinimize={() => handleWindowAction("notes", "minimize")}
              onMaximize={() => handleWindowAction("notes", "maximize")}
              onFocus={() => handleWindowAction("notes", "focus")}
              zIndex={windows.notes.zIndex}
            />
          )}

          {/* PDF Window */}
          {windows.pdf.isOpen && !windows.pdf.isMinimized && (
            <PDFWindow
              key="pdf"
              isMaximized={windows.pdf.isMaximized}
              zIndex={windows.pdf.zIndex}
              onClose={() => handleWindowAction("pdf", "close")}
              onMinimize={() => handleWindowAction("pdf", "minimize")}
              onMaximize={() => handleWindowAction("pdf", "maximize")}
              onFocus={() => handleWindowAction("pdf", "focus")}
            />
          )}

          {/* Terminal Window */}
          {windows.terminal.isOpen && !windows.terminal.isMinimized && (
            <Terminal
              key="terminal"
              isMaximized={windows.terminal.isMaximized}
              zIndex={windows.terminal.zIndex}
              onClose={() => handleWindowAction("terminal", "close")}
              onMinimize={() => handleWindowAction("terminal", "minimize")}
              onMaximize={() => handleWindowAction("terminal", "maximize")}
              onFocus={() => handleWindowAction("terminal", "focus")}
            />
          )}

          {/* YouTube Music Window */}
          {windows.youtube.isOpen && !windows.youtube.isMinimized && (
            <YouTubeMusic
              key="youtube"
              isMaximized={windows.youtube.isMaximized}
              zIndex={windows.youtube.zIndex}
              onClose={() => handleWindowAction("youtube", "close")}
              onMinimize={() => handleWindowAction("youtube", "minimize")}
              onMaximize={() => handleWindowAction("youtube", "maximize")}
              onFocus={() => handleWindowAction("youtube", "focus")}
            />
          )}

          {windows.calender.isOpen && !windows.calender.isMinimized && (
            <Calendar
              key="calender"
              isMaximized={windows.calender.isMaximized}
              zIndex={windows.calender.zIndex}
              onClose={() => handleWindowAction("calender", "close")}
              onMinimize={() => handleWindowAction("calender", "minimize")}
              onMaximize={() => handleWindowAction("calender", "maximize")}
              onFocus={() => handleWindowAction("calender", "focus")}
            />
          )}

        </AnimatePresence>
      </div>

      <Dock
        toggleWindow={(app) => handleWindowAction(app, "toggle")}
        activeApps={windows}
      />
    </div>
  );
};

export default App;