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

    child_process.exec('df -Hl | awk \'{print $1}\'', function(error_ids, stdout_ids, stderr_ids){
        let ids = stdout_ids;
        child_process.exec('df -Hl | awk \'{print $2}\'', function(error_size, stdout_size, stderr_size){
            let size = stdout_size;
            child_process.exec('df -Hl | awk \'{print $9}\'', function(error_mount1, stdout_mount1, stderr_mount1){
                let mount1 = stdout_mount1;
                child_process.exec('df -Hl | awk \'{print $10}\'', function(error_mount2, stdout_mount2, stderr_mount2){
                    let mount2 = stdout_mount2;

                    // Split the variables into arrays
                    ids = ids.split("\n");
                    size = size.split("\n");
                    mount1 = mount1.split("\n");
                    mount2 = mount2.split("\n");

                    // Remove the headings from the arrays
                    ids = ids.slice(1);
                    size = size.slice(1);
                    mount1 = mount1.slice(1);
                    mount2 = mount2.slice(1);

                    let send = [];
                    for (i = 0; i < ids.length - 1; i++) {
                        let device = {};
                        device.id = ids[i];
                        device.size = size[i];
                        if (mount2[i] !== '') {
                            device.mount = mount1[i] + ' ' + mount2[i];
                        } else {
                            device.mount = mount1[i];
                        }
                        send.push(device);
                    }
                    res.send(send);
                });
            });
        });
    });
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
      height: 500,
      frame: false,
      minWidth: 800,
      maxWidth: 800,
      minHeight: 500,
      maxHeight: 500,
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
