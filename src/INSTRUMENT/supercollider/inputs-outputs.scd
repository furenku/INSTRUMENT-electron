s.quit;

(

s.boot;

s.doWhenBooted({

      ().play;

      z=();

      z.i = ();
      z.m = ();
      z.o = ();

      i = z.i;
      m = z.m;
      o = z.o;


      i.channels = Array.fill(16);


      m.inBus = 32;
      m.mixerBus = 48;
      m.outBus = 0;
      m.channels = Array.fill(4);


      o.mainOutBus = 10;
      o.channels = Array.fill(2);

      i.synths = Group.new;
      m.synths = Group.after(i.synths);
      o.synths = Group.after(m.synths);
      // Groups:



      i.channels.put(0, Synth.head( i.synths, 'INSTRUMENTinput', [\inBus,1,\outBus,m.inBus]));
      i.channels.put(1, Synth.head( i.synths, 'INSTRUMENTinput', [\inBus,2,\outBus,m.inBus+1]));


      o.channels.put(0, Synth.tail( o.synths, 'INSTRUMENToutput', [\inBus,m.mixerBus,\amp,1]  ));

      4.do{|h|
         m.channels.put(h, Synth.tail( m.synths, 'INSTRUMENTmixerChannel', [\inBus,m.inBus+h,\outBus,m.mixerBus ]));
      };

      m.channels[0].set(\pan,1);
      m.channels[1].set(\pan, -1);





});

)

/*
m.channels.collect({|chan| chan.free });
i.channels.collect({|chan| chan.free });
o.channels.collect({|chan| chan.free });
*/

m.channels.collect({|chan| chan.set(\amp,0) });
m.channels.collect({|chan| chan.set(\amp,1) });


o.channels[0].set(\amp,0);
o.channels[0].set(\amp,1);


m.channels[0].set(\pan,-1);
m.channels[1].set(\pan, -1);




Synth(\INSTRUMENTtestTone1,[\outBus,48])
