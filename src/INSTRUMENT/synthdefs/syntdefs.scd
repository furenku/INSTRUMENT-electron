SynthDef(\i_sin_note, {|note=60, velocity = 127 |

	var z, e, a;
	z = SinOsc.ar( note.midicps );
	e = EnvGen.kr( Env.perc, doneAction: 2 );
	a = (velocity)/100.asFloat;
	z = ( z *  e ) * a ;
	z = z / 4;
	Out.ar(0, z );

}).store;
