const {app, BrowserWindow,ipcMain} = require('electron');
const path = require('path')
function createWindow() {
    win = new BrowserWindow({
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    });
    win.webContents.openDevTools();
    win.loadFile('index.html')
    win.on('closed', () => {
      win = null;
    });
    ipcMain.on('set-title', (event, title) => {
      const webContents = event.sender
      const win = BrowserWindow.fromWebContents(webContents)
      win.setTitle(title)
      win.webContents.send('show_update_dialog',true)
    })
    return win;
  }
  try {
    app.on('ready', () => setTimeout(createWindow, 400));
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });
    app.on('activate', () => {
      if (win === null) {
        createWindow();
      }
    });
  } catch (e) {
  }