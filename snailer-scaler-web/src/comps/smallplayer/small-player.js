import './smallplayer.scss';
//func
import note from '../func/note';
import options from '../func/options';
import calcs from '../func/calcs';
import { useRef } from 'react';
import { useState } from 'react';
import PlayButtons from './play-buttons';
//import options from './func/options';

let smallPlayerRenders = 0;
export default function SmallPlayer(props) {     
    smallPlayerRenders++;
    const thisRender = smallPlayerRenders;

    const [newBPM, setBPM] = useState(options.getBPM());
    const [chooseMeasure, setMeasure] = useState(0);    //0: small beats //1: beats //2: milliseconds //3: minutes and seconds
    const [measureLabel, setMeasureLabel] = useState("b" + options.beatFraction);
    const [trackLength, setTrackLength] = useState(calcs.timeToDifferentMeasures());

    const timeNowEl = useRef(); 
    const trackHead = useRef();


    function changeBPM(x) {
        let xBPM = options.getBPM() + x;
        if (xBPM < 30) {xBPM = 30}
        if (xBPM > 900) {xBPM = 900}
        setBPM(xBPM);
        options.beatFLen = options.getNewBeatFLenFromNewBPM(xBPM);
        console.log("BPM updated. BeatFLen is now:\n" + options.beatFLen);
    }
    function nextMeasure() {
        const labels = ["b" + options.beatFraction, "B", "ms", "M:S"];
        let meas = chooseMeasure + 1;
        if (meas > labels.length - 1) {meas = 0}
        setMeasure(meas);
        setMeasureLabel(labels[meas]);
        setTrackLength(calcs.timeToDifferentMeasures(meas));
        console.log("new time measure type " + meas + ": " + labels[meas]);
    }
    function prevMeasure() {
        const labels = ["b" + options.beatFraction, "B", "ms", "M:S"];
        let meas = chooseMeasure - 1;
        if (meas < 0) {meas = labels.length - 1}
        setMeasure(meas);
        setMeasureLabel(labels[meas]);
        setTrackLength(calcs.timeToDifferentMeasures(meas));
        console.log("new time measure type " + meas + ": " + labels[meas]);
    }
        
    function seek(event) {
        const seekPos = event.nativeEvent.offsetX / event.target.offsetWidth;   // returns decimal
        note.trackSet(options.trackLength * seekPos);
    }

    let tNow = 0;
    const trackInterval = setInterval(function () {
        if (smallPlayerRenders > thisRender + 1) {      // if higher re-renders exist
            clearInterval(trackInterval);           // clear interval to prevent multiple instances
            return
        }
        tNow = calcs.timeToDifferentMeasures(chooseMeasure, options.trackhead);
        if (chooseMeasure === 1) {tNow = Math.trunc(tNow) + 1}
        try {
            trackHead.current.style.left = ((options.trackhead / options.trackLength) * 100) + "%";     // set visual trackhead left %
            timeNowEl.current.value = tNow;
        } catch {}
    }, 90);

    function submitTrackLen() {
        calcs.differentMeasuresToTime(chooseMeasure, changeTrackLenTo);
        setTrackLength(changeTrackLenTo);
    }

    let oldTrackLength = options.trackLength;
    setInterval(function(){                                 // every 1.5 secs
        setBPM(options.getBPM());                           // update BPM (BPM could be changed in settings)
        if (options.trackLength !== oldTrackLength) {       // check if tracklength has changed (tracklength can be changed in settings)
            setMeasure(0);
            setMeasureLabel("b" + options.beatFraction);
            setTrackLength(options.trackLength);
            oldTrackLength = options.trackLength;
        }
    }, 1500); 

    return (      
        <div className='smallplayer'>
            <div className='smallplayer--buttons'>
                <div className='smallplayer--optionSelect' id='sp-bpm' title='BPM'>
                    <button className='smallplayer--optionSelect--arrow sp-b-up' aria-label='Raise BPM' onClick={() => changeBPM(5)}></button>
                    <p className='smallplayer--optionSelect--p'>{newBPM}</p>
                    <button className='smallplayer--optionSelect--arrow sp-b-down' aria-label='Lower BPM' onClick={() => changeBPM(-5)}></button>
                </div>
                <PlayButtons type={"back"}/>
                <PlayButtons type={"play"}/>
                <PlayButtons type={"record"}/>
                <div className='smallplayer--optionSelect' id='sp-meas' title='Time measure'>
                    <button className='smallplayer--optionSelect--arrow sp-b-up' aria-label='Previous time measure' onClick={prevMeasure}></button>
                    <p className='smallplayer--optionSelect--p'>{measureLabel}</p>
                    <button className='smallplayer--optionSelect--arrow sp-b-down' aria-label='Next time measure' onClick={nextMeasure}></button>
                </div>
            </div>

            <div className='smallplayer--seeker'>
                <div className='smallplayer--seeker--t' title='Current track time'>
                    <input className='smallplayer--seeker--t--text' type='text' aria-label='Current track time' ref={timeNowEl} ></input>
                </div>
                <div className='smallplayer--seeker--track' onMouseDown={(e) => seek(e, true)} onMouseUp={(e) => seek(e, false)}>
                    <div className='smallplayer--seeker--track--line'></div>
                    <div className='smallplayer--seeker--track--head' ref={trackHead}></div>
                </div>
                <TrackLenForm trackLen={trackLength} submitFun={submitTrackLen}/>
            </div>
        </div>
    );
}

let changeTrackLenTo = options.trackLength;
function TrackLenForm(props) {    
    const submit = useRef();
    const input = useRef();
    if (input.current) {input.current.value = props.trackLen}
    
    function changeTrackLen() { 
        submit.current.style.right = "90%";
        changeTrackLenTo = input.current.value;
    }
    function formSubmit(event) {
        event.preventDefault();
        submit.current.style.right = "0";
    }

    return (
        <form onSubmit={(e) => formSubmit(e)} className='smallplayer--seeker--t' title='Track length'>
            <input 
                className='smallplayer--seeker--t--submit'
                type='submit' 
                aria-label='New track length enter' 
                onClick={props.submitFun}
                ref={submit}
            ></input>
            <input 
                className='smallplayer--seeker--t--text'
                id='sp-tracklen'
                type='text' 
                aria-label='Track length' 
                onChange={changeTrackLen} 
                onClick={props.submitFun}
                defaultValue={props.trackLen}
                ref={input}
            ></input>
        </form>
    )
}