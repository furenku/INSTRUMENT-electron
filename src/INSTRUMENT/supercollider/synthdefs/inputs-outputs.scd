SynthDef(\INSTRUMENTtestTone1, {|outBus=0, amp=1, freq=330|

	var sig = SinOsc.ar(freq) * EnvGen.kr( Env.perc, doneAction: 2 );

	Out.ar( outBus, sig * amp );

}).store;



SynthDef(\INSTRUMENTinput, {|inBus, outBus, amp=1|

	var sig = AudioIn.ar(inBus, amp );

	Out.ar( outBus, sig );

}).store;


SynthDef(\INSTRUMENTmixerChannel, {|inBus, outBus, amp=1, pan=0|

   var in, out, bad, badEG;
	in = In.ar(inBus, 1);
	bad = CheckBadValues.ar(in, post: 0) + (in.abs > 2);

   badEG = EnvGen.ar(Env(#[1, 0, 1], #[0, 0.05], releaseNode: 1), bad);
	in = Select.ar(bad > 0, [in * badEG, DC.ar(0)]);

	out = Pan2.ar(in, pan);
	// so that mixerchan bus can be used as postsendbus
	/*ReplaceOut.ar(inBus, out);*/

   Out.ar(outBus, out * amp );

}).store;


SynthDef(\INSTRUMENTmixer, {|inBus, outBus, amp=1|

	var sig = In.ar(inBus,16);

	Out.ar( outBus, sig * amp );

}).store;



SynthDef(\INSTRUMENToutput, {|inBus, outBus, amp=1|

	var sig = In.ar( inBus );

	ReplaceOut.ar( outBus, sig * amp );

}).store;
