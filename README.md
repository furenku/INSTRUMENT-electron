# INSTRUMENT

INSTRUMENT es un sistema pensado para músicos o bandas que quieran integrar
herramientas electrónicas a sus actos en vivo. INSTRUMENT es una extensión de los músicos y de los ensambles, ofreciendo control de sintetizadores y procesamiento de señal, a la vez que herramientas de audio para sampleo, live-looping y mezcla.

La idea principal es que todos los sonidos electrónicos que podamos escuchar en un concierto provengan de acciones físicas de los músicos.

Es una aplicación multiplataforma construida con HTML y Javascript, utilizando electron, supercolliderjs y node-midi. SuperCollider es el motor de audio.


El enfoque de la investigación está en encontrar los modos y momentos en los que un músico puede interactuar, contemplando que simultáneamente podría estar tocando algún instrumento y/o cantando.


###Algunas características actualmente en desarrollo:
- Tocar instrumentos electrónicos con controladores MIDI, y modificar sus parámetros.
- Introducir sus propios SynthDefs, y ejecutarlos con un controlador MIDI.
- Grabar patrones MIDI y reproducirlos en loop.
- Samplear en vivo y hacer composiciones basadas en loops.
- Controlar la dirección de la señal de audio.
- Rutear tus sonidos por efectos y mezclarlos.
- Utilizar cualquier cantidad de entradas y salidas de audio.
- Interfaz para Live Coding.
- Conectar interfaces directamente con Arduino.



###Instalación
```
git clone --recursive https://github.com/kernspaltung/INSTRUMENT.git
cd INSTRUMENT
npm install
bower install
```

En este punto debemos inicializar jack


```
npm start
```







###Herramientas

electron (http://electron.atom.io)
node.js (http://nodejs.org)
SuperCollider.js (https://github.com/crucialfelix/supercolliderjs)
