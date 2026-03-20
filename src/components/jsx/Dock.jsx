import githubLogo from "../../assets/doc-icons/github.svg";
import noteLogo from "../../assets/doc-icons/note.svg";
import calenderLogo from "../../assets/doc-icons/calender.svg";
import cliLogo from "../../assets/doc-icons/cli.svg";
import pdfLogo from "../../assets/doc-icons/pdf.svg";
import youtubelogo from "../../assets/doc-icons/youtube.svg"
import "../dock.scss";

const Dock = ({ toggleWindow, activeApps }) => {
  return (
    <footer className='dock'>
      {/* GitHub App */}
      <div
        className={`icon github ${activeApps.github?.isOpen ? 'is-open' : ''}`}
        onClick={() => toggleWindow("github")}
      >
        <img src={githubLogo} alt="GitHub Logo" />
        {activeApps.github?.isOpen && <div className="app-indicator" />}
      </div>

      {/* Notes App */}
      <div
        className={`icon note ${activeApps.notes?.isOpen ? 'is-open' : ''}`}
        onClick={() => toggleWindow("notes")}
      >
        <img src={noteLogo} alt="Note Logo" />
        {activeApps.notes?.isOpen && <div className="app-indicator" />}
      </div>

      <div
        className={`icon calender ${activeApps.calender?.isOpen ? 'is-open' : ''}`}
        onClick={() => toggleWindow("calender")}
      >
        <img src={calenderLogo} alt="Calender Logo" />
        {activeApps.calender?.isOpen && <div className="app-indicator" />}
      </div>

      <div
        className={`icon youtube ${activeApps.youtube?.isOpen ? 'is-open' : ''}`}
        onClick={() => toggleWindow("youtube")}
      >
        <img src={youtubelogo} alt="YouTube Music Logo" />
        {activeApps.youtube?.isOpen && <div className="app-indicator" />}
      </div>

      <div
        className={`icon terminal ${activeApps.terminal?.isOpen ? 'is-open' : ''}`}
        onClick={() => toggleWindow("terminal")}
      >
        <img src={cliLogo} alt="CLI Logo" />
        {activeApps.terminal?.isOpen && <div className="app-indicator" />}
      </div>

      <div
        className={`icon pdf ${activeApps.pdf?.isOpen ? 'is-open' : ''}`}
        onClick={() => toggleWindow("pdf")}
      >
        <img src={pdfLogo} alt="PDF Logo" />
        {activeApps.pdf?.isOpen && <div className="app-indicator" />}
      </div>
    </footer>
  );
};

export default Dock;