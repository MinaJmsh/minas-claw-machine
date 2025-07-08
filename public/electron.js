// /public/electron.js
const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");

let mainWindow; // keep a global reference

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 852,
    height: 573,
    frame: false, // remove native title bar
    transparent: false,
    resizable: false,
    fullscreenable: false,
    titleBarStyle: "hidden",
    webPreferences: {
      contextIsolation: true, // <‑‑ secure
      preload: path.join(__dirname, "preload.js"), // <‑‑ same folder
    },
  });

  /* ------------------ load the correct URL ------------------ */
  if (!app.isPackaged) {
    // Development: React dev‑server must be running
    mainWindow.loadURL("http://localhost:3000");
  } else {
    // Production: after `npm run build`
    mainWindow.loadFile(path.join(__dirname, "..", "build", "index.html"));
  }
}

/* ------------------ window‑control IPC ------------------ */
ipcMain.on("window:minimize", () => mainWindow?.minimize());
ipcMain.on("window:close", () => mainWindow?.close());

/* ------------------ life‑cycle boilerplate ------------------ */
app.whenReady().then(createWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
