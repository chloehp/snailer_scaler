import options from "./options";
import note from "./note";

const calcs = {
    timeToDifferentMeasures(chooseMeasure = 0, t = options.trackLength) {        
        if      (chooseMeasure === 0) {return Math.trunc(t)}                        // beats / beatFraction
        else if (chooseMeasure === 1) {return t / options.beatFraction}             // beats
        else if (chooseMeasure === 2) {return Math.trunc(t * options.beatFLen)}     // milliseconds
        else    {//chooseMeasure === 3                                              // Minutes:Seconds
            const tSec = (t * options.beatFLen) / 1000;
            if (tSec > 60) {                  
                const mins = Math.floor(tSec / 60);
                const secs = Math.round(tSec % 60);
                if (secs < 10) {return mins + ":0" + secs}
                else {return mins + ":" + secs}                
            }
            else {return tSec.toFixed(2)}
        }
    },
    differentMeasuresToTime(chooseMeasure = 0, tLen) {
        note.trackSet();    // reset track to zero
        if (isNaN(tLen) === false) {
            if      (chooseMeasure === 0) {}                                    // small beats
            else if (chooseMeasure === 1) {tLen = tLen * options.beatFraction}        // beats
            else if (chooseMeasure === 2) {tLen = tLen / options.beatFLen}            // milliseconds
            else   /*chooseMeasure === 3*/{tLen = (tLen / options.beatFLen) * 1000}   // seconds
            options.trackLength = tLen;
            console.log("new tLen is " + tLen);
        }
        else {
            tLen = options.trackLength;
            console.log("new tLen is not a number");
        }
        return tLen;
    },
}

export default calcs;