import React, { useState, useEffect, useRef } from 'react';
import MacWindow from './MacWindow';
import MatrixRain from './MatrixRain';
import './Terminal.scss';

const Terminal = ({ onClose, onMinimize, onMaximize, isMaximized, zIndex, onFocus }) => {
    const [input, setInput] = useState('');
    const [showMatrix, setShowMatrix] = useState(false);
    const [history, setHistory] = useState([
        { type: 'output', content: 'Welcome to Harshit-OS Terminal (v1.0.0)' },
        { type: 'output', content: 'Type "help" to see available commands.' },
    ]);

    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        if (!trimmedInput) return;

        // Split input into command and arguments
        const args = trimmedInput.split(' ');
        const cmd = args[0].toLowerCase();
        const query = args.slice(1).join(' '); // Rejoin the rest for the search query

        const newHistory = [...history, { type: 'input', content: trimmedInput }];

        switch (cmd) {
            case 'help':
                newHistory.push({ type: 'output', content: 'Available: about, ls, projects, matrix, music-search [query], clear, whoami, exit' });
                break;
            
            case 'music-search':
                if (!query) {
                    newHistory.push({ type: 'output', content: 'Usage: music-search <song or artist name>' });
                } else {
                    newHistory.push({ type: 'output', content: `Searching YouTube Music for: ${query}...` });
                    const searchUrl = `https://music.youtube.com/search?q=${encodeURIComponent(query)}`;
                    window.open(searchUrl, '_blank');
                }
                break;

            case 'matrix':
                setShowMatrix(true);
                setInput('');
                return; 

            case 'ls':
                newHistory.push({ type: 'output', content: 'documents/  projects/  resume.pdf  notes.md' });
                break;

            case 'whoami':
                newHistory.push({ type: 'output', content: 'harshit_chauhan: student & software_engineer' });
                break;

            case 'about':
                newHistory.push({ type: 'output', content: 'Full-stack dev focused on C++, React, and Systems Programming.' });
                break;

            case 'projects':
                newHistory.push({ type: 'output', content: '1. DocsLite (WebSockets)\n2. BankSystem (C++)\n3. MacOS-Portfolio (React)' });
                break;

            case 'clear':
                setHistory([]);
                setInput('');
                return;

            case 'exit':
                newHistory.push({ type: 'output', content: 'logout' });
                setHistory(newHistory);
                setInput('');
                setTimeout(() => {
                    onClose();
                }, 300);
                return;

            default:
                newHistory.push({ type: 'output', content: `zsh: command not found: ${cmd}` });
        }

        setHistory(newHistory);
        setInput('');
    };

    return (
        <MacWindow
            title="harshit — zsh"
            onClose={onClose}
            onMinimize={onMinimize}
            onMaximize={onMaximize}
            onFocus={onFocus}
            isMaximized={isMaximized}
            zIndex={zIndex}
        >
            <div 
                className="terminal-container" 
                style={{ position: 'relative', overflow: 'hidden' }}
                onClick={() => document.getElementById('term-input').focus()}
            >
                {showMatrix && <MatrixRain onFinished={() => setShowMatrix(false)} />}

                <div className="terminal-content" ref={scrollRef}>
                    {history.map((line, i) => (
                        <div key={i} className={`line ${line.type}`}>
                            {line.type === 'input' && <span className="prompt">➜ ~ </span>}
                            <span className="text">{line.content}</span>
                        </div>
                    ))}

                    <form onSubmit={handleCommand} className="input-line">
                        <span className="prompt">➜ ~ </span>
                        <input
                            id="term-input"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            autoFocus
                            autoComplete="off"
                        />
                    </form>
                </div>
            </div>
        </MacWindow>
    );
};

export default Terminal;