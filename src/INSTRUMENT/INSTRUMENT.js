/*

_____ _   _  _____ _______ _____  _    _ __  __ ______ _   _ _______
|_   _| \ | |/ ____|__   __|  __ \| |  | |  \/  |  ____| \ | |__   __|
| | |  \| | (___    | |  | |__) | |  | | \  / | |__  |  \| |  | |
| | | . ` |\___ \   | |  |  _  /| |  | | |\/| |  __| | . ` |  | |
_| |_| |\  |____) |  | |  | | \ \| |__| | |  | | |____| |\  |  | |
|_____|_| \_|_____/   |_|  |_|  \_\\____/|_|  |_|______|_| \_|  |_|


*/


const {app, BrowserWindow} = require('electron')
var sc = require('supercolliderjs');
var midi = require('midi');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function start() {
   createWindow();
   startSC();
   startMIDI();
}

function createWindow () {
   // Create the browser window.
   win = new BrowserWindow({width: 1600, height: 800})

   // and load the index.html of the app.
   win.loadURL(`file://${__dirname}/INSTRUMENT.html`)

   // Open the DevTools.
   win.webContents.openDevTools()

   // Emitted when the window is closed.
   win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
   })

}

function startMIDI() {
   var input = new midi.input();
   var output = new midi.output();

   // Count the available input ports.
   input.getPortCount();

   // Get the name of a specified input port.
   input.getPortName(0);

   // Configure a callback.
   input.on('message', function(deltaTime, message) {
     // The message is an array of numbers corresponding to the MIDI bytes:
     //   [status, data1, data2]
     // https://www.cs.cf.ac.uk/Dave/Multimedia/node158.html has some helpful
     // information interpreting the messages.
     console.log('m:' + message + ' d:' + deltaTime);
   });

   input.openPort(0);


   output.getPortCount();
   output.getPortName(0);
   output.openPort(0);

   output.sendMessage([176,22,1]);

   output.closePort();
}

function startSC() {



   sc.server.boot()
   .then(function(server) {

      server.send.msg(['/s_new', 'i_test1', (Math.floor(Math.random()*300))]);


      server.callAndResponse(sc.msg.status())
      .then(function(reply) {
         console.log(reply);
      });

   });

}


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
