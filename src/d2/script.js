import { D2 } from "../node_modules/@terrastruct/d2/dist/browser/index.js";

const d2Input = document.getElementById("d2-input");
const svgWrapper = document.getElementById("svg-wrapper");
const loading = document.getElementById("diagram-loading");
const themeToggle = document.getElementById("theme-toggle");
const exportSVG = document.getElementById("export-svg");
const exportPNG = document.getElementById("export-png");
const dpiSelector = document.getElementById("png-dpi");
const clearBtn = document.getElementById("clear-btn");
const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("file-input");
const dropMsg = document.getElementById("drop-msg");
const htmlRoot = document.documentElement;

const defaultD2 = `D2 Diagram Example:
a: Start
b: Process
c: Decision
d: End

a -> b: "Step 1"
b -> c: "Step 2"
c -> d: "Step 3"
c: yes -> d
c: no -> b
`;

let lastSVGCode = "";
d2Input.value = localStorage.getItem("d2code") || defaultD2;

function setTheme(theme) {
  htmlRoot.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}
themeToggle.addEventListener("click", () => {
  const t = htmlRoot.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setTheme(t);
  renderD2();
});
(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) setTheme(saved);
  else
    setTheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
})();

let renderTimeout;
let d2;
async function renderD2() {
  loading.style.display = "block";
  svgWrapper.innerHTML = "";
  if (!d2) d2 = new D2();
  const code = d2Input.value;
  localStorage.setItem("d2code", code);

  try {
    const theme =
      htmlRoot.getAttribute("data-theme") === "dark" ? "dark" : "default";
    const result = await d2.compile(code, {
      theme,
      layout: "elk",
      sketch: false,
    });
    const svg = await d2.render(result.diagram, result.renderOptions);
    lastSVGCode = svg;
    svgWrapper.innerHTML = svg;
    const svgEl = svgWrapper.querySelector("svg");
    if (svgEl) {
      svgEl.removeAttribute("width");
      svgEl.removeAttribute("height");
      svgEl.style.width = "";
      svgEl.style.height = "";
      svgEl.style.display = "block";
      svgEl.style.margin = "auto";
    }
    loading.style.display = "none";
  } catch (e) {
    svgWrapper.innerHTML = "";
    loading.textContent = "Error rendering D2 diagram";
    loading.style.display = "block";
  }
}
d2Input.addEventListener("input", () => {
  clearTimeout(renderTimeout);
  renderTimeout = setTimeout(renderD2, 300);
});

window.addEventListener("DOMContentLoaded", renderD2);

clearBtn.addEventListener("click", () => {
  d2Input.value = "";
  svgWrapper.innerHTML = "";
  lastSVGCode = "";
  localStorage.removeItem("d2code");
});

exportSVG.addEventListener("click", () => {
  if (!lastSVGCode || lastSVGCode.length < 100) {
    alert("Nothing to export. Make sure the diagram is rendered.");
    return;
  }
  const url =
    "data:image/svg+xml;charset=utf-8," + encodeURIComponent(lastSVGCode);
  const a = document.createElement("a");
  a.href = url;
  a.download = "diagram.svg";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

exportPNG.addEventListener("click", () => {
  if (!lastSVGCode || lastSVGCode.length < 100) {
    alert("Nothing to export. Make sure the diagram is rendered.");
    return;
  }
  const dpi = parseInt(dpiSelector.value, 10) || 300;
  const svg64 = btoa(unescape(encodeURIComponent(lastSVGCode)));
  const imgSrc = "data:image/svg+xml;base64," + svg64;

  const image = new Image();
  image.onload = function () {
    let width = 800,
      height = 600;
    let vbMatch = lastSVGCode.match(/viewBox="([\d\.\- ]+)"/);
    if (vbMatch) {
      let vbVals = vbMatch[1].split(" ").map(Number);
      if (vbVals.length === 4) {
        width = vbVals[2];
        height = vbVals[3];
      }
    }
    const scale = dpi / 96;
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(width * scale);
    canvas.height = Math.ceil(height * scale);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `diagram-${dpi}dpi.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        alert("Export failed: PNG generation error.");
      }
    }, "image/png");
  };
  image.onerror = function () {
    alert("Export failed: Could not load SVG as image.");
  };
  image.src = imgSrc;
});

// Drag & Drop for .d2 files
dropArea.addEventListener("click", () => {
  fileInput.value = "";
  fileInput.click();
});
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("dragover");
});
dropArea.addEventListener("dragleave", (e) => {
  dropArea.classList.remove("dragover");
});
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("dragover");
  const file = e.dataTransfer.files[0];
  if (file && file.name.endsWith(".d2")) {
    readD2File(file);
  } else {
    alert("Only .d2 files are supported.");
  }
});
fileInput.addEventListener("change", (e) => {
  const file = fileInput.files[0];
  if (file && file.name.endsWith(".d2")) {
    readD2File(file);
  } else {
    alert("Only .d2 files are supported.");
  }
});
function readD2File(file) {
  const reader = new FileReader();
  reader.onload = function (evt) {
    d2Input.value = evt.target.result;
    renderD2();
  };
  reader.readAsText(file);
}
