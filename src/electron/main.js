const electron = require('electron');
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const url = require('url');

var expressApp = express();
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: false }));

// to serve our JavaScript, CSS and index.html
expressApp.use(express.static('./'));

expressApp.get('/devices', function (req, res) {
    const child_process = require('child_process');
    const plist_method = require('plist');
    child_process.exec('diskutil list -plist', function(error_plist, stdout_plist, stderr_plist){
        const send = plist_method.parse(stdout_plist);
        res.send(send);
    });

});

expressApp.post('/create', function (req, res) {
    const child_process = require('child_process');
    res.send(JSON.stringify(req.parameters));
    // child_process.exec('diskutil list -plist', function(error_plist, stdout_plist, stderr_plist){
    //     const send = plist_method.parse(stdout_plist);
    //     res.send(send);
    // });
});

var port = process.env.PORT || 5000
expressApp.listen(port, () => console.log('Listening at http://localhost:5000'))


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow(
    {
      width: 800,
      height: 400,
      frame: false,
      minWidth: 800,
      maxWidth: 800,
      minHeight: 400,
      maxHeight: 400,
      icon: path.join(__dirname, 'assets/pngs/icon.png')
    })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    process.exit()
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
