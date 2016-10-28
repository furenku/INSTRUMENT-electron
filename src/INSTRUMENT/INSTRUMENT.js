/*

   _____ _   _  _____ _______ _____  _    _ __  __ ______ _   _ _______
   |_   _| \ | |/ ____|__   __|  __ \| |  | |  \/  |  ____| \ | |__   __|
   | | |  \| | (___    | |  | |__) | |  | | \  / | |__  |  \| |  | |
   | | | . ` |\___ \   | |  |  _  /| |  | | |\/| |  __| | . ` |  | |
   _| |_| |\  |____) |  | |  | | \ \| |__| | |  | | |____| |\  |  | |
   |_____|_| \_|_____/   |_|  |_|  \_\\____/|_|  |_|______|_| \_|  |_|


*/


const electron = require('electron');

const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

// const ipcMain = electron.ipcMain;
//

// var sc = require('supercolliderjs');
// var midi = require('midi');
// var osc = require('osc');

// var scsynth;
// var synths;
//
// var lastNodeID;
//
// var testVar = 18;




// App Architecture:
require('./controllers/NodeController.js');
require('./controllers/SessionController.js');


var nodeController;
var sessionController;

let win





app.on('ready', start )

app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      app.quit()
   }
})

app.on('activate', () => {
   if (win === null) {
      start()
   }
})


function start() {

   // require('electron').remote.getGlobal('sharedObject').currentNote = note;


   // App Architecture:

   nodeController = new NodeController();
   sessionController = new SessionController();

   sessionController.loadSession('default')

   createWindow();


//    startSC();
//    startMIDI();
//    startSynths();
//    startOSC();

}


function createWindow () {
   // Create the browser window.
   win = new BrowserWindow({width: 1600, height: 800})

   // and load the index.html of the app.

   win.loadURL(`file://${__dirname}/test.html`)

   // Open the DevTools.
   // win.webContents.openDevTools()

   // Emitted when the window is closed.
   win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
   })


   // console.log("contents", win)


}
