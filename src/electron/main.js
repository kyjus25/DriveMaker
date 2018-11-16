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
            child_process.exec('df -Hl | awk \'{print $6}\'', function(error_mountlin1, stdout_mountlin1, stderr_mountlin1){
                let mountlin1 = stdout_mountlin1;
                child_process.exec('df -Hl | awk \'{print $7}\'', function(error_mountlin2, stdout_mountlin2, stderr_mountlin2){
                    let mountlin2 = stdout_mountlin2;
                    child_process.exec('df -Hl | awk \'{print $9}\'', function(error_mountmac1, stdout_mountmac1, stderr_mountmac1){
                        let mountmac1 = stdout_mountmac1;
                        child_process.exec('df -Hl | awk \'{print $10}\'', function(error_mountmac2, stdout_mountmac2, stderr_mountmac2){
                            let mountmac2 = stdout_mountmac2;

                            // Split the variables into arrays
                            ids = ids.split("\n");
                            size = size.split("\n");

                            mountlin1 = mountlin1.split("\n");
                            mountlin2 = mountlin2.split("\n");
                            mountmac1 = mountmac1.split("\n");
                            mountmac2 = mountmac2.split("\n");

                            // Remove the headings from the arrays
                            ids = ids.slice(1);
                            size = size.slice(1);
                            mountlin1 = mountlin1.slice(1);
                            mountlin2 = mountlin2.slice(1);
                            mountmac1 = mountmac1.slice(1);
                            mountmac2 = mountmac2.slice(1);

                            let send = [];
                            for (i = 0; i < ids.length - 1; i++) {
                                let device = {};
                                device.id = ids[i];
                                device.size = size[i];


                                if (mountmac1[i] !== '') {
                                    // we are on a Mac
                                    if (mountmac2[i] !== '') {
                                        device.mount = mountmac1[i] + ' ' + mountmac2[i];
                                    } else {
                                        device.mount = mountmac1[i];
                                    }
                                } else {
                                  // we are on linux
                                  if (mountlin2[i] !== '') {
                                      device.mount = mountlin1[i] + ' ' + mountlin2[i];
                                  } else {
                                      device.mount = mountlin1[i];
                                  }
                                }


                                send.push(device);
                            }
                            res.send(send);
                        });
                    });
                });
            });
        });
    });
});

expressApp.get('/devices_plist', function (req, res) {
    const child_process = require('child_process');
    const plist_method = require('plist');
    child_process.exec('diskutil list -plist', function(error_plist, stdout_plist, stderr_plist){
        const send = plist_method.parse(stdout_plist);
        res.send(send);
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
