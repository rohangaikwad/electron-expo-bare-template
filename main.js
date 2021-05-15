const { BrowserWindow, app, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let createWindow = () => {
    const win = new BrowserWindow({
        width: 1200, height: 800, backgroundColor: 'white', webPreferences: {
            nodeIntegration: true,
            worldSafeExecuteJavaScript: false,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })


    win.webContents.openDevTools();

    let filePath = path.join(__dirname, './web-build/index.html')
    console.log(filePath)

    if (isDev) win.loadURL('http://localhost:19006')
    else win.loadFile(filePath);
}

// Event handler for asynchronous incoming messages
ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg)
})
// Event handler for asynchronous incoming messages
ipcMain.on('synchronous-message', (event, arg) => {
    console.log("sync")
})

app.whenReady().then(() => {
    console.log(app.getAppPath());
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})