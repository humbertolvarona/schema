document.addEventListener("DOMContentLoaded", () => {
  // Referencias a elementos del DOM
  const editor = document.getElementById("code-editor");
  const viewerOutput = document.getElementById("viewer-output");
  const viewerWrapper = document.getElementById("viewer-output-wrapper");
  const themeSwitcher = document.getElementById("theme-switcher");
  const examplesSelect = document.getElementById("examples-select");
  const copyBtn = document.getElementById("copy-code");
  const saveBtn = document.getElementById("save-code");
  const loadBtn = document.getElementById("load-code");
  const exportSvgBtn = document.getElementById("export-svg");
  const exportPngBtn = document.getElementById("export-png");
  const dpiInput = document.getElementById("png-dpi");
  const undoBtn = document.getElementById("undo-drag");
  const redrawDiagramBtn = document.getElementById("redraw-diagram");
  const graphDirectionSelect = document.getElementById(
    "graph-direction-select"
  );

  // Elementos de la ventana modal
  const errorModal = document.getElementById("error-modal");
  const errorMessageText = document.getElementById("error-message-text");
  const closeModalBtn = document.querySelector(".close-button");

  // Variables de estado
  let dragHistory = [];
  let isPanning = false;
  let panStart = { x: 0, y: 0 };
  let currentSVG = null;

  const getMermaidConfig = () => ({
    startOnLoad: false,
    securityLevel: "loose",
    theme:
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "default",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  });

  const updateUndoButton = () => {
    undoBtn.disabled = dragHistory.length === 0;
  };
  const clearHistoryAndState = () => {
    dragHistory = [];
    updateUndoButton();
    currentSVG = null;
  };

  let renderTimeout;
  const renderDiagram = async () => {
    const code = editor.value;
    clearHistoryAndState();

    if (!code.trim()) {
      viewerOutput.innerHTML = "<p>Write some Mermaid code to get started.</p>";
      return;
    }

    try {
      await mermaid.parse(code);

      mermaid.initialize(getMermaidConfig());
      const { svg } = await mermaid.render("mermaid-graph-" + Date.now(), code);
      viewerOutput.innerHTML = svg;
      currentSVG = viewerOutput.querySelector("svg");

      // ▼▼▼ LÓGICA PARA ASIGNAR EL TAMAÑO NATURAL Y ACTIVAR SCROLL ▼▼▼
      const bbox = currentSVG.getBBox();

      // Asignamos el ancho y alto calculados por Mermaid al propio elemento SVG.
      // Le añadimos un pequeño padding (40px) para que no se vea cortado.
      currentSVG.style.width = `${bbox.width + 40}px`;
      currentSVG.style.height = `${bbox.height + 40}px`;
      // ▲▲▲ FIN DE LA LÓGICA DE TAMAÑO ▲▲▲

      setupInteraction();
    } catch (error) {
      console.error("Caught Mermaid error:", error);
      errorMessageText.textContent = error.message;
      errorModal.style.display = "block";
    }
  };

  const debouncedRender = () => {
    clearTimeout(renderTimeout);
    renderTimeout = setTimeout(renderDiagram, 300);
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("mermaid-editor-theme", theme);
    renderDiagram();
  };

  // Lógica para cerrar la ventana modal
  const closeModal = () => {
    errorModal.style.display = "none";
  };

  closeModalBtn.addEventListener("click", closeModal);
  window.addEventListener("click", (event) => {
    if (event.target == errorModal) {
      closeModal();
    }
  });

  const screenToSVGCoords = (x, y) => {
    if (!currentSVG) return { x: 0, y: 0 };
    const pt = currentSVG.createSVGPoint();
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(currentSVG.getScreenCTM().inverse());
  };

  const setupInteraction = () => {
    let selectedElement = null;
    let offset = { x: 0, y: 0 };
    let originalTransform = "";

    const startDrag = (event) => {
      if (event.button !== 0) return;
      const pt = screenToSVGCoords(event.clientX, event.clientY);
      const target = event.target.closest(".node, .cluster");
      if (target) {
        selectedElement = target;
        originalTransform =
          selectedElement.getAttribute("transform") || "translate(0,0)";
        const transformMatrix = new DOMMatrix(originalTransform);
        offset.x = pt.x - transformMatrix.e;
        offset.y = pt.y - transformMatrix.f;
      } else {
        isPanning = true;
        panStart.x = viewerWrapper.scrollLeft;
        panStart.y = viewerWrapper.scrollTop;
        panStart.clientX = event.clientX;
        panStart.clientY = event.clientY;
      }
    };

    const drag = (event) => {
      if (selectedElement || isPanning) event.preventDefault();
      const pt = screenToSVGCoords(event.clientX, event.clientY);
      if (selectedElement) {
        const newX = pt.x - offset.x;
        const newY = pt.y - offset.y;
        selectedElement.setAttribute(
          "transform",
          `translate(${newX}, ${newY})`
        );
      } else if (isPanning) {
        const dx = event.clientX - panStart.clientX;
        const dy = event.clientY - panStart.clientY;
        viewerWrapper.scrollLeft = panStart.x - dx;
        viewerWrapper.scrollTop = panStart.y - dy;
      }
    };

    const endDrag = () => {
      if (selectedElement) {
        const finalTransform = selectedElement.getAttribute("transform");
        if (originalTransform !== finalTransform) {
          dragHistory.push({
            element: selectedElement,
            transform: originalTransform,
          });
          updateUndoButton();
        }
      }
      selectedElement = null;
      isPanning = false;
    };

    viewerWrapper.onmousedown = startDrag;
    viewerWrapper.onmousemove = drag;
    viewerWrapper.onmouseup = endDrag;
    viewerWrapper.onmouseleave = endDrag;
  };

  undoBtn.addEventListener("click", () => {
    if (dragHistory.length > 0) {
      const lastMove = dragHistory.pop();
      lastMove.element.setAttribute("transform", lastMove.transform);
      updateUndoButton();
    }
  });

  graphDirectionSelect.addEventListener("change", () => {
    const direction = graphDirectionSelect.value;
    const lines = editor.value.split("\n");
    if (lines.length > 0 && lines[0].trim().startsWith("graph")) {
      lines[0] = `graph ${direction}`;
      editor.value = lines.join("\n");
      renderDiagram();
    }
  });

  redrawDiagramBtn.addEventListener("click", renderDiagram);
  themeSwitcher.addEventListener("click", () =>
    applyTheme(
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark"
    )
  );

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(editor.value);
      copyBtn.textContent = "Copied!";
      setTimeout(() => {
        copyBtn.textContent = "Copy";
      }, 2000);
    } catch (err) {
      alert("Failed to copy to clipboard.");
      console.error("Copy failed:", err);
    }
  });

  saveBtn.addEventListener("click", () => {
    localStorage.setItem("mermaid-editor-code", editor.value);
    saveBtn.textContent = "Saved!";
    setTimeout(() => {
      saveBtn.textContent = "Save";
    }, 2000);
  });

  loadBtn.addEventListener("click", () => {
    const savedCode = localStorage.getItem("mermaid-editor-code");
    if (savedCode !== null) {
      editor.value = savedCode;
      renderDiagram();
    } else {
      alert("No saved diagram found.");
    }
  });

  Object.entries(mermaidExamples).forEach(([key, { name }]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = name;
    examplesSelect.appendChild(option);
  });

  examplesSelect.addEventListener("change", (e) => {
    const key = e.target.value;
    if (key && mermaidExamples[key]) {
      editor.value = mermaidExamples[key].code;
      renderDiagram();
    }
  });

  const downloadFile = (data, fileName) => {
    const a = document.createElement("a");
    a.href = data;
    a.download = fileName;
    a.click();
  };

  const getStyledSvg = () => {
    if (!currentSVG) return null;
    const svgClone = currentSVG.cloneNode(true);
    const styleEl = document.createElement("style");

    let fullCss = "";
    for (const sheet of document.styleSheets) {
      try {
        if (sheet.cssRules) {
          for (const rule of sheet.cssRules) {
            fullCss += rule.cssText;
          }
        }
      } catch (e) {
        console.warn("Cannot read cross-origin stylesheet", e.message);
      }
    }
    styleEl.textContent = fullCss;

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.appendChild(styleEl);
    svgClone.insertBefore(defs, svgClone.firstChild);

    const bbox = currentSVG.getBBox();
    svgClone.setAttribute("width", bbox.width);
    svgClone.setAttribute("height", bbox.height);
    svgClone.removeAttribute("viewBox");

    return new XMLSerializer().serializeToString(svgClone);
  };

  exportSvgBtn.addEventListener("click", () => {
    const svgContent = getStyledSvg();
    if (svgContent) {
      const blob = new Blob([svgContent], {
        type: "image/svg+xml;charset=utf-8",
      });
      downloadFile(URL.createObjectURL(blob), "diagram.svg");
    } else {
      alert("No diagram available to export.");
    }
  });

  exportPngBtn.addEventListener("click", () => {
    const svgData = getStyledSvg();
    if (!svgData) {
      alert("No diagram to export.");
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    const dpi = parseInt(dpiInput.value, 10) || 300;
    const scale = dpi / 96;

    const bbox = currentSVG.getBBox();
    canvas.width = bbox.width * scale;
    canvas.height = bbox.height * scale;

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      downloadFile(canvas.toDataURL("image/png"), `diagram-${dpi}dpi.png`);
    };

    img.onerror = (e) => {
      alert("Failed to load SVG. PNG export failed.");
    };

    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgData);
  });

  // --- INICIALIZACIÓN PRINCIPAL ---
  const initialTheme = localStorage.getItem("mermaid-editor-theme") || "light";
  document.documentElement.setAttribute("data-theme", initialTheme);
  mermaid.initialize(getMermaidConfig());
  editor.value =
    localStorage.getItem("mermaid-editor-code") ||
    mermaidExamples.flowchart.code;
  renderDiagram();
  editor.addEventListener("input", debouncedRender);
});
