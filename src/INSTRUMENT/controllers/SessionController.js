SessionController = function() {

   var sm = this;

   this.activeSession = null;

   this.loadSession = function( name ) {

      if( name === 'default' ) {

         sm.activeSession = require('../sessions/default.js');

         console.log( "Load Default:", sm.activeSession );
      }

      if( name === 'test' ) {

         sm.activeSession = require('../sessions/default.js');

         console.log( sm.activeSession );
      }

   }

   console.log("Session Manager loaded");

}
