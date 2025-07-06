const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 852,
    height: 573,
    webPreferences: {
      contextIsolation: true,
    },
    frame: false, // ❌ No window frame
    transparent: false, // You can set true if you want full transparency
    resizable: false, // Optional: disable resizing
    fullscreenable: false, // Optional
    titleBarStyle: "hidden", // Optional for macOS
  });

  // Load React dev server
  win.loadURL("http://localhost:3000");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
