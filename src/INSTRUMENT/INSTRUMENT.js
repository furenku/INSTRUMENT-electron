/*

_____ _   _  _____ _______ _____  _    _ __  __ ______ _   _ _______
|_   _| \ | |/ ____|__   __|  __ \| |  | |  \/  |  ____| \ | |__   __|
| | |  \| | (___    | |  | |__) | |  | | \  / | |__  |  \| |  | |
| | | . ` |\___ \   | |  |  _  /| |  | | |\/| |  __| | . ` |  | |
_| |_| |\  |____) |  | |  | | \ \| |__| | |  | | |____| |\  |  | |
|_____|_| \_|_____/   |_|  |_|  \_\\____/|_|  |_|______|_| \_|  |_|


*/


const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

// const {app, BrowserWindow} = require('electron')
// const {ipcMain} = require('electron').ipcMain;

var sc = require('supercolliderjs');
var midi = require('midi');

var scsynth;
var synths;
var lastNodeID;

var testVar = 18;

let win

function start() {

   // require('electron').remote.getGlobal('sharedObject').currentNote = note;

   createWindow();
   startSC();
   startMIDI();
   startSynths();


   // app.on('synchronous-message', (event, arg) => {
   //   console.log(arg)  // prints "ping"
   //   event.returnValue = 'pong'
   // })
}
function startSynths() {
   synths = {};
   lastNodeID = 0;
};

function createWindow () {
   // Create the browser window.
   win = new BrowserWindow({width: 1600, height: 800})

   // and load the index.html of the app.

   win.loadURL(`file://${__dirname}/INSTRUMENT.html`)

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

function startMIDI() {

   var input = new midi.input();
   var output = new midi.output();

   // Count the available input ports.
   input.getPortCount();

   // Get the name of a specified input port.
   input.getPortName(0);

   // Configure a callback.
   input.on('message', function(deltaTime, message) {

      var note = message[1];
      var velocity = parseInt(message[2]);

      if ( velocity > 0 ) {

         console.log('midi-note-on',note)

         playNote(note,velocity);
         synths[note] = 1;

         win.webContents.send('midi-note-on' , { note: note, velocity: velocity })
//         app.emit('midi-note-on',note)

      }



   });


   ipcMain.on('gui-note-on', (event, arg) => {
     console.log("gui-note-on", arg.note )  // prints "ping"
     playNote(arg.note,arg.velocity);

  // event.sender.send(...)
     //event.sender.send('midi-note-on', note)
   })

   // input.openPort(0);


   output.getPortCount();
   output.getPortName(0);
   // output.openPort(0);

   output.sendMessage([176,22,1]);

   input.openVirtualPort("INSTRUMENT");
   output.openVirtualPort("INSTRUMENT");

}

function startSC() {



   sc.server.boot()
   .then(function(server) {
      scsynth = server;
      server.send.msg(['/s_new', 'i_test1', (Math.floor(Math.random()*300))]);


      server.callAndResponse(sc.msg.status())
      .then(function(reply) {
         //console.log(reply.rcvosc);

      });

      server.on('OSC', function(msg) {
         if(msg[0]==='/n_end') {
            synths[ msg[1] ] = 0;
         }
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


function playNote(note, velocity) {

   scsynth.send.msg(['/s_new', 'i_sin_note', lastNodeID, 0, 0, [ 0, 0, note, 1, velocity ]]);

   lastNodeID++;

}
