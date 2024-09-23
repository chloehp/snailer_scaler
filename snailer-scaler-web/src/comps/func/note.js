
//plugins
import * as Tone from "tone";
//functions
import options from "./options";
import tr from "./tracks";
import instrumentSwitch from "./instrument-switch";
import trackFill from "./track-fill";
//import animation from "./animation";
//import { Time } from "tone";
    
// func vars
const everyNote = ["Ab", "A", "A#", "Bb", "B", "C", "C#", "Db", "D", "D#", "Eb", "E", "F", "F#", "Gb", "G", "G#"];
const activeNotes = [];
let track = tr.tracks[options.trackSelection];
const now = Tone.now();
let recordStartTime = new Date();

let playInsts = [];                                          // instruments used in playback
let effect = null;                                           // effect choice
let pausePoint = 0;

// display active notes (the array) // fix to be more efficient
function displayNote(){
  let notesBeingPlayed = "";
  for (let i = 0; i < activeNotes.length; i++) {notesBeingPlayed += activeNotes[i].n + " "}
  document.getElementById("note-displayer").innerHTML = notesBeingPlayed;
}

const note = {
  //
  validate(n) {
    if (
       ((n.length === 3) || (n.length === 2)) 
    && (everyNote.includes(n.slice(0, -1)) === true)
    && (isNaN(n.charAt(n.length - 1)) === false)
    ) {
      const ins = instrumentSwitch[0].x;
      try {
        ins.triggerAttack(n, now + 0.15);
        setTimeout(function(){
          ins.triggerRelease(n, now + 0.15)   
        }, 300);
        return true
      }
      catch {console.error("No validate"); return false}      
    }
    else {
      return false
    }
  },
  //
  attackNote(playNote, hL = options.hitLatency){ 
    for (let i = 0; i < activeNotes.length; i++) {if (activeNotes[i].n === playNote) {return}}  // check if note is already being played, return if true
    const startTime = ((new Date()) - recordStartTime);                                         // start time
    const key = document.getElementById("kk-" + playNote);
    instrumentSwitch[options.instruSelect].x.triggerAttack(playNote, now + hL);                 // attack note
    activeNotes.push({n : playNote, t : startTime, p : activeNotes.length, k : key});           // push to array
    key.classList.add("press");                                                                 // visual press key
    //console.log("attack note");
    displayNote();
  },
  //
  releaseNote(playNote, hL = options.hitLatency){ 
    for (let i = 0; i < activeNotes.length; i++) {
      if (activeNotes[i].n === playNote) {
        instrumentSwitch[options.instruSelect].x.triggerRelease(playNote, now + hL);    // release note 
        activeNotes[i].k.classList.remove("press");                                     // visual unpress key
        if (options.record === true) {                                                  // if recording
          const nowTime = (new Date()) - recordStartTime;                               //
          const identifier = track.length + "-id-" + Math.floor(Math.random() * 9000);  // make new id
          const startTime = (activeNotes[i].t / options.beatFLen) + pausePoint;         // get start time
          const noteLength = (nowTime - activeNotes[i].t) / options.beatFLen;           // note length is difference between now and when note was pressed, divided by 1/64th note
          const newPoint = {id : identifier, n : playNote, start : startTime, len : noteLength, ins : options.instruSelect, eff : effect, on : false, pos : activeNotes[i].p};  // create object to be recorded
          track.push(newPoint);                                                         // push object to array     
          if ((nowTime / options.beatFLen) > options.trackLength) {note.recordGo()}     // if reached track length, stop recording
        }
        activeNotes.splice(i, 1);                                                       // remove from array
        //document.getElementById("kk-" + playNote).style.filter = "contrast(1)" 
        displayNote(); 
      }
    }
  },
  
  //
  recordGo() {
    if (options.play === true) {console.log("cannot record while playing track"); return}    
    if (options.record === true) {options.record = false; return} 
    else {
      options.record = true;
      track = tr.tracks[options.trackSelection];                    // set selected track as track to record to
      recordStartTime = new Date();                                 // record starts from now
      //animation.beatCountInit();                                    // turn on beat counter
      document.getElementById("red-spot").classList.add("r-s-on");  // change red spot 
      console.log("record go");
    }    
    const recordInterval = setInterval(function(){                                    //set interval
      if ((options.trackhead > options.trackLength) || (options.record === false)) {  // if record reaches end of track or recording is turned off
        clearInterval(recordInterval);                                                // stop interval
        options.record = false;                                                       //
        note.trackSet()                                                               // reset track
        document.getElementById("red-spot").classList.remove("r-s-on");               // change red spot
        if (track[0]) {trackFill()}                                                   // if something was recorded, fix and display
        console.log("record stop");
        return
      }
      else {
        const timeNow = (((new Date()) - recordStartTime) / options.beatFLen) + pausePoint;   // get time now compared to when the recording started
        options.trackhead = timeNow;                                                          // move trackhead
      }
    }, 75); 
  },
  
  //
  playGo() {
    const playSpot1 = document.getElementById("play-spot");
    const playSpot2 = document.getElementById("tracker-play-btn");
    if (options.play === true) {
      playInsts = [];
      options.play = false;
      playSpot1.classList.remove("pause");
      playSpot2.classList.remove("pause");
      return
    } 
    else {
      options.play = true;
      recordStartTime = (new Date() - 60) + 180;
      for (let i = 0; i < tr.tracks.length; i++) {
        if (tr.tracks[i][0]) {
          const instruFromTrck = tr.tracks[i][0].ins;               // get instrument used to play this track
          playInsts.push(instrumentSwitch[instruFromTrck].x);       // push to array 
        }
      }
      //animation.beatCountInit();                                  // turn on beat counter
      playSpot1.classList.add("pause");                             // pause symbol
      playSpot2.classList.add("pause");                             // pause symbol
      console.log(playInsts);
    }

    setTimeout(function(){
      const playInterval = setInterval(function(){
        if (options.play === false) {                     // paused
          clearInterval(playInterval);                    // stop interval
          pausePoint = options.trackhead;                 // set point at which track is paused
          console.log("paused at " + options.trackhead);
          return
        }
        else {
          for (let i = 0; i < tr.tracks.length; i++) {note.playTrack(tr.tracks[i], i)}   // play all tracks
        }
      }, options.beatFLen);   
    }, 60);
  },
  //  
  playTrack(track, ti) {
    const timeNow = (((new Date()) - recordStartTime) / options.beatFLen) + pausePoint;
    if (timeNow > options.trackLength) {note.trackSet(); return}  // if reached track length, reset
    options.trackhead = timeNow;                                  // set trackhead
    //console.log(timeNow);
    const trackLen = track.length;
    for (let y = 0; y < trackLen; y++) {
      if (
        (timeNow > track[y].start) && (timeNow < track[y].start + track[y].len) // if timenow is between the start and end of a note
        &&  (track[y].on === false)                                             // if note is not already being played
      ) {               
        track[y].on = true;                                 // note is being played
        const useInstr = playInsts[ti];                     // get instrument
        const noteLen = (track[y].len * options.beatFLen);            // multiplied by 1/32nd note
        useInstr.triggerAttack(track[y].n, now + 0.15);     // attack note
        // eslint-disable-next-line
        setTimeout(function(){
          useInstr.triggerRelease(track[y].n, now + 0.15)   // after notelength, release note
          track[y].on = false;                              // note is no longer being played
        }, noteLen);
      }
    }
  },
  //
  trackSet(x = 0) {  // set track to 
    recordStartTime = new Date();
    options.trackhead = x;
    pausePoint = x;
  },

}

export default note;