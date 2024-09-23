
import options from "./options";
const tr = {    
    tracks : [[]],      // array for track storage
    trackEls : [[]],    // array for track elements

    //
    newTrack(){
        const a = [];
        tr.tracks.push(a);
        tr.trackEls.push(a);
        options.trackSelection = tr.tracks.length - 1;
        console.log(tr.tracks);
        console.log(tr.trackEls);
    },
    //
    deleteTrack(index){
        tr.tracks[index] = [];
        tr.trackEls[index] = [];
        if (options.trackSelection < 1) {options.trackSelection = 0}
        else {options.trackSelection--}
        console.log(tr.tracks);
        console.log(tr.trackEls);
    },
    //
    evalTrackForDisplay(thisTrack){
        let han = 0;    // highest active notes
        let len = 0;
        let instr = thisTrack[0].ins;
        for (let i = 0; i < thisTrack.length; i++) {
            if (thisTrack[i].pos > han) {han = thisTrack[i].pos} // find max active notes in track for width
            const timeOfLastNote = thisTrack[i].start + thisTrack[i].len;
            if (timeOfLastNote > len) {len = timeOfLastNote}
        }
        return {highActiveNotes : han + 1, trackLen : len, trackInstr : instr}
    }
}
export default tr;