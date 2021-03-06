
const electron = require('electron');
// Module to control application life.
const ipcRenderer = electron.ipcRenderer;

var os = require('os');



var u = new Utils();

jQuery(document).ready(function($){

   u.addWindowResizeFunction( u.verticalCenter );
   u.addWindowResizeFunction( u.shareW );
   u.addWindowResizeFunction( u.shareH );




   console.log( "to do: must refactor! this is a quick test")
   var instrument = new INSTRUMENT();
   instrument.createKeyboard();



   // ipcRenderer.on('asynchronous-reply', (event, arg) => {
   //   console.log(arg) // prints "pong"
   // })
   // ipcRenderer.send('asynchronous-message', 'ping')
   //

   console.log("INSTRUMENT: Front End");
   console.log('Cpu cores: ', os.cpus().length );
})

function INSTRUMENT() {

      // var prettyBytes = require('pretty-bytes');


   this.createKeyboard = function() {

      var keyboard = $('.keyboard');
      keyboard.addClass('op0');
      var scaleKeys = [0,1,0,1,0,0,1,0,1,0,1,0];
      var numKeys = 48;
      keyWidth = parseInt(keyboard.width())/ (numKeys-(5*4));

      for (var i = 0; i < numKeys; i++) {
         if( scaleKeys[ i % 12 ] ) {
            color = '.black';
         } else {
            color = '.white';
         }

         var mL =  $('.keyboard .note.white').not('.hidden').length * keyWidth;

         var note = $('.keyboard .note.hidden'+color).clone().appendTo('.keyboard').removeClass('hidden');

         note.attr('data-note',i);

         note.width(keyWidth);
         note.css({ marginLeft: mL });

         if(note.hasClass('black')) {
            note.css({ marginLeft: mL - keyWidth/2 });
            note.width(keyWidth/1.5);
            // note.css({paddingLeft:(keyWidth*4)});
         }

         note.click(function(){

            var note_num = $(this).data('note');

            $(this).addClass('active');

            console.log('gui-note-on',note_num);
            ipcRenderer.send('gui-note-on', {note:note_num+35,velocity: 127});

         })

      }
      $('.keyboard .note.hidden').remove();

      keyboard.removeClass('op0');

      ipcRenderer.on('midi-note-on', (event, arg) => {
        console.log("note",arg) // prints "pong"
            // $('.keyboard .note').removeClass('active');
            $('.keyboard .note').eq( arg.note-35 ).addClass('active');

//          var img = $('<img>').attr('src','http://fakeimg.pl/400x200/');
//       img.appendTo('body')
// img.css({position:'absolute', top: Math.random()*400,left: Math.random()*400, width: 100, height:50})

      })
      ipcRenderer.on('midi-note-off', (event, arg) => {
         console.log("note",arg) // prints "pong"
         $('.keyboard .note').eq( arg.note-35 ).removeClass('active');
      })

   }

}
