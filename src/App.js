import "./App.css";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faFileLines,
  faMaximize,
  faDownLeftAndUpRightToCenter,
} from "@fortawesome/free-solid-svg-icons";

import React, { useState, useEffect } from "react";

function getStorageValue(key) {
  // getting stored value
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || null;
}

function App() {
  const [text, setText] = useState(getStorageValue("text"));

  const [showEditor, setShowEditor] = useState(false);
  const [showPreviewer, setShowPreviewer] = useState(false);

  useEffect(() => {
    localStorage.setItem("text", JSON.stringify(text));
  }, [text]);

  return (
    <div className="App">
      <div
        className="block-editor"
        style={{ display: showPreviewer ? "none" : "block" }}
      >
        <div className="top-panel">
          <div>
            <FontAwesomeIcon className="icon" icon={faPen} />
            Editor
          </div>
          <FontAwesomeIcon
            className="deploy"
            onClick={() => setShowEditor(!showEditor)}
            icon={showEditor ? faDownLeftAndUpRightToCenter : faMaximize}
          />
        </div>
        <textarea
          style={{
            minHeight: showEditor ? "80vh" : "20vh",
            resize: showEditor ? "none" : "vertical",
          }}
          defaultValue={text}
          onChange={(e) => setText(e.target.value)}
          id="editor"
        />
      </div>

      <div
        className="block-preview"
        style={{ display: showEditor ? "none" : "block" }}
      >
        <div className="top-panel">
          <div>
            <FontAwesomeIcon className="icon" icon={faFileLines} />
            Previewer
          </div>
          <FontAwesomeIcon
            className="deploy"
            onClick={() => setShowPreviewer(!showPreviewer)}
            icon={faMaximize}
          />
        </div>
        <div id="preview">
          {
            <ReactMarkdown
              children={text}
              remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  return (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, "")}
                      style={dark}
                      language="javascript"
                      PreTag={inline ? "code" : "div"}
                      {...props}
                    />
                  );
                },
              }}
            ></ReactMarkdown>
          }
        </div>
      </div>
      <div class="author">
        Coded by{" "}
        <a
          target="_blank"
          href="https://github.com/denisgreshnyakov/markdown-previewer"
        >
          Denis
        </a>
      </div>
    </div>
  );
}

export default App;
