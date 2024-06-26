const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        },
        autoHideMenuBar: true,
        icon: path.join(__dirname, 'src', 'icon.png')
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src', 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', () => {
    createWindow();

    const mainMenu = Menu.buildFromTemplate([]);
    Menu.setApplicationMenu(mainMenu);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
