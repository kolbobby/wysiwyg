var electron = require('electron'),
    app = electron.app,
    BrowserWindow = electron.BrowserWindow;

var path = require('path'),
    url = require('url');

var mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'public/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if(mainWindow === null) {
    createWindow();
  }
});
