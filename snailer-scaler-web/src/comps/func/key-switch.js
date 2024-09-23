import note from "./note";
//import trackFill from "./track-fill";

const keySwitch = function(key, oct, down){
    switch(key) {
      //case "Shift": return "C" + oct;
      case "a": return "C#" + oct;
      case "z": return "D" + oct;
      case "s": return "D#" + oct;
      case "x": return "E" + oct;
      case "c": return "F" + oct;
      case "f": return "F#" + oct;
      case "v": return "G" + oct;
      case "g": return "G#" + oct;
      case "b": return "A" + oct;
      case "h": return "A#" + oct;
      case "n": return "B" + oct;
      
      case "q": return "C" + (oct + 1);
      case "2": return "C#" + (oct + 1);
      case "w": return "D" + (oct + 1);
      case "3": return "D#" + (oct + 1);
      case "e": return "E" + (oct + 1);
      case "r": return "F" + (oct + 1);
      case "5": return "F#" + (oct + 1);
      case "t": return "G" + (oct + 1);
      case "6": return "G#" + (oct + 1);
      case "y": return "A" + (oct + 1);
      case "7": return "A#" + (oct + 1);
      case "u": return "B" + (oct + 1);
      
      case "i": return "C" + (oct + 2);
      case "9": return "C#" + (oct + 2);
      case "o": return "D" + (oct + 2);
      case "0": return "D#" + (oct + 2);
      case "p": return "E" + (oct + 2);
      case "[": return "F" + (oct + 2);
      case "=": return "F#" + (oct + 2);
      case "]": return "G" + (oct + 2);
      case "Backspace": return "G#" + (oct + 2);
      case "#": return "A" + (oct + 2);

      case "m": 
        if (down === false) { pressMute() }
        return false;
      case " ": 
        if (down === false) { pressPlay() }
        return false;

      default: return false;
    }
}
export default keySwitch;

let mutePressed = false;
function pressMute() {   
  if (mutePressed === false) {
    mutePressed = true;
    console.log("mute");
    setTimeout(function(){ mutePressed = false }, 60);
  }   
}

let playPressed = false;
function pressPlay() {   
  if (playPressed === false) {
    playPressed = true;
    note.playGo();
    setTimeout(function(){ playPressed = false }, 60);
  }   
}