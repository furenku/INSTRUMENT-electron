SynthDef(\i_sin_note, {|note=60, velocity = 0 |
	var z, e, a;
	z = SinOsc.ar( note.midicps );
	e = EnvGen.kr( Env.perc, doneAction: 2 );
	a = velocity / 127;

	z = z * e;
	z= z * amp;

	Out.ar(0, z );
}).store;
