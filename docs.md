#Documentation

This documentation is barely starting. Here you will find a list of all developed classes and modules.

##Nodes


###Node

The basic concept: in its most basic form it has a number of inputs and outputs.


###Audio Node

The basic audio unit: is a representation of a SuperCollider Node running.





##Controllers


###NodeController

Creates Nodes and connects them together. Creates Audio and Control Inputs and Outputs.

Comunicates with SuperCollider's NodeWatcher

###SessionController

Saves and Loads sessions' data.










#SuperCollider

##Audio Outputs

SynthDef Name: '\INSTRUMENToutput'

- inBus (default: 0)
- outBus (default: 0)
- amp (default: 1)
- pan (default: 0)


SynthDef Name: '\INSTRUMENTmixerChannel'

- Checks and Cleans Bad Values.
- Code taken from ddwMixerChannel
··* ( https://github.com/supercollider-quarks/ddwMixerChannel/blob/master/MixerChannelDef.sc )
