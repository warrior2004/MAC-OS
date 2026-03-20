import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import MacWindow from './MacWindow';
import './note.scss'

const Notes = ({ onClose, onMinimize, onMaximize, isMaximized }) => {
    const [markdown, setMarkdown] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/note.txt")
            .then(res => res.text())
            .then(text => {
                setMarkdown(text);
                setLoading(false);
            })
            .catch(() => {
                setMarkdown("# Error\nFailed to load note content.");
                setLoading(false);
            });
    }, []);

    return (
        <MacWindow 
            title="Notes — note.md" 
            onClose={onClose}
            onMinimize={onMinimize}
            onMaximize={onMaximize}
            isMaximized={isMaximized}
            // Overriding defaultPos here if needed, 
            // but MacWindow uses 'default' internal prop
        >
            <div className="note-content">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            // This replaces standard <code> blocks with highlighted ones
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        style={vscDarkPlus}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            }
                        }}
                    >
                        {markdown}
                    </Markdown>
                )}
            </div>
        </MacWindow>
    );
};

export default Notes;