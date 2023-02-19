import "./App.css";
import { marked } from "marked";
import React, { useState, useEffect } from "react";

const parse = (text) => {
  document.getElementById("preview").innerHTML = "";
  let str = document.getElementById("editor").value.split("\n");
  const arr = [];
  str.forEach((value) => {
    if (value !== "") {
      arr.push(marked.parse(value));
    }
  });
  arr.forEach((value) => {
    document.getElementById("preview").innerHTML += value;
  });
};

function App() {
  const [text] = useState(`# Welcome to my React Markdown Previewer!`);

  useEffect(() => {
    parse(text);
  });

  return (
    <div className="App">
      <div className="block-editor">
        <div className="top-panel">
          Editor
          <button>развернуть</button>
        </div>
        <textarea onChange={parse} id="editor">
          {text}
        </textarea>
      </div>

      <div className="block-preview">
        <div className="top-panel">
          Preview
          <button>развернуть</button>
        </div>
        <div id="preview"></div>
      </div>
    </div>
  );
}

export default App;
