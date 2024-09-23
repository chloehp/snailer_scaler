import './App.scss';

//plugins
import * as Tone from "tone";
import { useRef } from 'react';
//import React, { useState } from 'react'; 

//pages
import KbPage from "./comps/kb-page";
import Start from './comps/start';

//functions
import keySwitch from "./comps/func/key-switch";
import options from "./comps/func/options";
import note from './comps/func/note';


export default function App() {  

  //PC keyboard -> musical keyboard
  window.addEventListener('keydown', function(event) {                              //keyboard keyboard attack
    if (event.repeat) {return}                                                      //prevent usual keydown continuous fire
    const hit = keySwitch(event.key, options.octave, true);                         //keyswitch
    if ((hit !== false) && (options.musicalQwerty === true)){note.attackNote(hit)}   //attack
  });
  window.addEventListener('keyup', function(event) {                                //keyboard keyboard release
    //console.log(event.key);
    const hit = keySwitch(event.key, options.octave, false);                        //keyswitch
    if ((hit !== false) && (options.musicalQwerty === true)){note.releaseNote(hit)}  //release
  });

  const startRef = useRef();
  function initiate() {
    Tone.start();
    startRef.current.classList.add("hide");    
    startRef.current.setAttribute("aria-hidden", "true");
    //const octEls = document.querySelectorAll(".keyboard--oct-group");    //get all octaves and keys
    //console.log(octEls[0].children[0].id);

    //

    //const distortion = new Tone.Volume(-999).toDestination();
    //
    //const sampler = new Tone.Sampler({
    //  urls: {
    //    "C4": "C4.mp3",
    //    "D#4": "Ds4.mp3",
    //    "F#4": "Fs4.mp3",
    //    "A4": "A4.mp3",
    //  },
    //  release: 1,
    //  baseUrl: "https://tonejs.github.io/audio/salamander/",
    //});    
    //sampler.connect(distortion);
    //
    //Tone.loaded().then(() => {
    //  sampler.triggerAttackRelease(["Eb4", "G4", "Bb4"], 4);
    //})
  }


  
  return (
    <div className="App snackground">
      <Start startRef={startRef} startInitFun={initiate}/>
      <KbPage />
      <p id='note-displayer'></p>
    </div>
  );
}

