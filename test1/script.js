window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const parse = () => {
    document.getElementById("preview").innerHTML = "";
    let str = document.getElementById("editor").value.split("\n");
    const arr = [];
    str.forEach((value) => {
      if (value !== "") {
        // document.getElementById("preview").append(marked.parse(value));
        arr.push(marked.parse(value));
      }
    });
    arr.forEach((value) => {
      document.getElementById("preview").innerHTML += value;
    });
  };

  document.querySelector("#btn").addEventListener("click", () => {
    parse();
  });

  parse();
});
