//react
import { useState } from 'react'; 
import { useRef } from 'react';
import './track.scss';
//func
import options from '../func/options';
import tr from '../func/tracks';

export default function Tracker(props) {    
    const firstTrackObject = { trackno : 0 }
    const [trCompsAr, setTracks] = useState([firstTrackObject])

    function addTrack() {
        tr.newTrack();                                                  // adds new track array, changes trackSelection to new track
        const newTrackObject = { trackno : options.trackSelection };    //
        setTracks([...trCompsAr, newTrackObject]);

        const trackerEl = document.getElementById("wholeTracker");
        trackerEl.scrollTop = 0;
        setTimeout(function(){trackerEl.scrollLeft = trackerEl.scrollWidth}, 210);
        console.log("track " + options.trackSelection +" added");
    }
    function rmvTrack(x) {
        tr.deleteTrack(x);
        trCompsAr.splice(x, 1);
        setTracks([...trCompsAr]);
        console.log("track " + x +" removed");
    }

    function addScroll() {document.getElementById("addNew").style.top = document.getElementById("wholeTracker").scrollTop + "px"}    

    return (      
        <div ref={props.trackRef} onScroll={addScroll} id={"wholeTracker"} className='tracker hide' aria-hidden='true'>
            <div className='fill' style={{display: "flex"}}>
                {trCompsAr.map((x, key) => ( <Track trackno={x.trackno} removeFunc={rmvTrack} key={key}/>))}
                <div className='add-new' id={"addNew"}>
                    <div className='add-new--a clicker' onClick={addTrack}><p className='add-new--a--plus center'>+</p></div>
                </div>
            </div>
        </div>
    );
}

function Track(props) {    
    const trRef = useRef();
    //const trackH = useRef();        
    
    //printTrack();
    setTimeout(function(){
        if (trRef.current) {trRef.current.classList.add("track-rend")}
        else {console.log("track trref false"); return}
    }, 150);  
    
    /*
    setInterval(function () { // move to trackfill
        try {trackH.current.style.top = (24 + (options.trackhead * 15)) + "px"}
        catch {}
    }, options.beatFLen);
    */

    function changeTrack() {options.trackSelection = props.trackno}

    return (      
        <div ref={trRef} className='track' onMouseDown={changeTrack} id={"track" + props.trackno}>
            <div className='track--details'>
                <div className='track--details--x' onClick={() => props.removeFunc(props.trackno)}>+</div>
            </div>
            <div className='track--track'>    
                {/*<div ref={trackH} className='track--track--head'></div>*/}
                <div className='track--track--tofill'></div>
            </div>
        </div>
    );
}