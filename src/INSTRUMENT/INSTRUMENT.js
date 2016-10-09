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

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function start() {
   createWindow();
   createSCconnection();
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

var s;
function createSCconnection() {



   sc.server.boot()
   .then(function(server) {

      // raw send message
   //   server.send.msg(['/g_new', 1, 0, 0]);

      // using sc.msg to format them
//      server.send.msg(sc.msg.groupNew(1));
      
      server.send.msg(['/s_new', 'i_test1', (Math.floor(Math.random()*300))]);


      // call async messages with callAndResponse
      // and receive replies with a Promise
      server.callAndResponse(sc.msg.status())
      .then(function(reply) {
         console.log(reply);
      });

   });

   //
   // supercolliderjs.resolveOptions().then(function(options) {
   //
   //    var SCLang = supercolliderjs.sclang;
   // console.log( SCLang );
   //    var lang = new SCLang(options);
   //    lang.boot();
   //
   //    var Server = supercolliderjs.scsynth;
   //    s = new Server(options);
   //    console.log("Server", s);
   //    s.boot().then(function(server) {
   //       console.log("Server booted.");
   //       s.msg(['/s_new', 'default', 440]);
   //    });
   //
   //
   //
   //    var SCapi = scapi;
   //    var api = new SCapi(options);
   //    api.connect();
   //
   // });

}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', start )

// Quit when all windows are closed.
app.on('window-all-closed', () => {
   // On macOS it is common for applications and their menu bar
   // to stay active until the user quits explicitly with Cmd + Q
   if (process.platform !== 'darwin') {
      app.quit()
   }
})

app.on('activate', () => {
   // On macOS it's common to re-create a window in the app when the
   // dock icon is clicked and there are no other windows open.
   if (win === null) {
      createWindow()
   }
})
