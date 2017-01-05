(
   SynthDef(\pianotest, {|freq=440,amp=0.25,gate=1,params=#[0,0.15,0.1]|

      var sig,env;

      // tmp
      var param1, param2, param3;

      param1 = params[0] + 0.01;
      param2 = params[1] * 2;
      param3 = params[2]*200;//MouseX.kr(0.1,200);
      env = EnvGen.kr( Env.perc(param1,param2), gate, doneAction: 2 );
      sig = SinOsc.ar( freq + SinOsc.ar(freq,0,param3-freq*((env*param3)+0.3),freq) );


      Out.ar(0,Pan2.ar( sig * env * amp ));

   }).store;

)


(

var waittimes = [1/8,2,1.5,1,1/3,1/16];

Tdef(\pianosim,{
   loop {

      Synth(\pianotest, [\freq, ([42,61].choose+[0,3,2,7,9,12,15].choose).midicps]);

      (waittimes.choose*1.5).wait;

      Synth(\pianotest, [\freq, ([42,61].choose+[0,3,2,8,7,12,15].choose).midicps]);

      waittimes.choose.wait;

   }

}).play;

)
