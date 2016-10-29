SynthDef('INSTRUMENTdistortion', {|inBus,outBus,amp=1,params=#[0.5]|

   var sig = In.ar( inBus );

   sig = ( sig * (( params[0] * 30 ) + 1 ) ).tanh;
   /*var sig = ReplaceOut.ar( inBus, sig )*/
   ReplaceOut.ar( inBus, sig * amp );
   Out.ar( outBus, sig * amp );

}).store;



SynthDef('INSTRUMENTfreeverb', {|inBus,outBus,amp=1,params=#[0.5,0.5,0.5]|

   var sig = In.ar( inBus );

   sig = FreeVerb.ar( sig, params[0], params[1], params[2]);
   /*var sig = ReplaceOut.ar( inBus, sig )*/
   ReplaceOut.ar( inBus, sig * amp );
   Out.ar( outBus, sig * amp );

}).store;




/*
quick test:
(
b = 19;
i=Group.new;
f=Group.after(i);
x=Synth.head(i,\INSTRUMENTtestTone1,[\outBus,b]);
z=Synth.tail(f,\INSTRUMENTdistortion,[\inBus,b,\outBus,0,\params,[1]]);
y=Synth.tail(f,\INSTRUMENTfreeverb,[\inBus,b,\outBus,0,\params,[1,1,1]]);
)
*/
