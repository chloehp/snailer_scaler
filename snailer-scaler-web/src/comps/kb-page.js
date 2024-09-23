//scss
import '../App.scss';
import './cob.scss';
//react
import { useRef } from 'react';
//func
import note from './func/note';
import animation from './func/animation';
import options from './func/options';
//pages
import Keyboard from "./kb/keyboard";
import Tracker from './track/tracker';
import SmallPlayer from './smallplayer/small-player';
import ScalesList from './scales/scales-list';
import InstrusAndEffects from './instrus-effects/instrus-effects';
import Scales from './scales/scales';
import Settings from './settings/settings';
//import BeatCounter from './scales/beat-counter';

export default function KbPage(props) {    
    //refs   
    const cobs = useRef(); const scaleBack = useRef(); const logo = useRef(); 
    const mOctave = useRef(); const kbRef = useRef(); const trackRef = useRef(); 
    const trPlayBtn = useRef(); const trBackBtn = useRef(); const scalesListRef = useRef();

    let kbTrack = true;
    function kbPageChange(event) {
        if (kbTrack === true) { // display tracker
            kbRef.current.classList.add("hide");
            cobs.current.classList.add("hide");
            logo.current.classList.add("hide");
            mOctave.current.children[0].classList.add("hide");
            mOctave.current.children[1].classList.add("hide");
            mOctave.current.children[2].classList.add("hide");
            event.target.style.filter = "brightness(0.45)";
            setTimeout(function(){
                trPlayBtn.current.classList.add("trak");
                trBackBtn.current.classList.add("trak");
            }, 300);       
            setTimeout(function(){          
                trackRef.current.classList.remove("hide");
                trackRef.current.setAttribute("aria-hidden", "false");
            }, 600);      
            kbTrack = false;
        }
        else {  // display keyboard
            trackRef.current.classList.add("hide");        
            trackRef.current.setAttribute("aria-hidden", "true");
            trPlayBtn.current.classList.remove("trak");  
            trBackBtn.current.classList.remove("trak");  
            event.target.style.filter = "brightness(1)";
            setTimeout(function(){            
                kbRef.current.classList.remove("hide");
                mOctave.current.children[0].classList.remove("hide");
                mOctave.current.children[1].classList.remove("hide");
                mOctave.current.children[2].classList.remove("hide");
            }, 300);   
            setTimeout(function(){
                trackRef.current.setAttribute("aria-hidden", "true");
                cobs.current.classList.remove("hide");
                logo.current.classList.remove("hide");
            }, 600);    
            kbTrack = true;
        }
        animation.bobble(event.target);
    }
    
    let settingsOpen = false;
    function displaySettings(event) {
        const setEl = document.getElementById("settings");
        if (settingsOpen === false) {
            setEl.setAttribute("aria-hidden", "true");
            setEl.classList.add("open");
            event.target.style.filter = "brightness(0.45)";
            settingsOpen = true;
        }
        else {
            setEl.setAttribute("aria-hidden", "false");
            setEl.classList.remove("open");
            event.target.style.filter = "brightness(1)";
            settingsOpen = false
        }
        animation.bobble(event.target);
        console.log("settings open: " + settingsOpen);
    }

    let helpActive = false;
    function displayHelp(event) {
        if (helpActive === false) {
            event.target.style.filter = "brightness(0.45)";
            helpActive = true;
        }
        else {
            event.target.style.filter = "brightness(1)";
            helpActive = false
        }
        animation.bobble(event.target);
    }

    function changeOctave(changeTo = 3, behave = "smooth", event) {
        if ((changeTo > 6) || (changeTo < 1)) {return}                      // if above or below range, don't
        const octEls = document.querySelectorAll(".keyboard--oct-group");   //
        if (octEls[0]) {                                                    // if exists
            const kbToScrollTo = octEls[changeTo - 1].offsetLeft;
            document.querySelector(".keyboard").scrollTo({top: 0, left: kbToScrollTo, behavior: behave});   // scroll to
            options.octave = changeTo;                                      // change octave option
        }
        else {
            setTimeout(function(){
                console.log("try qselect again");
                changeOctave(changeTo, "instant");                              // if it didn't work, try again without smooth scroll
            }, 300)
        } 
        if (event) {animation.bobble(event.target)}
    }
    changeOctave(3, "instant");     // default start octave
    
    function clickBackButton(){
        note.trackSet();
        animation.bobble(trBackBtn.current);
    }
    function clickPlayButton(){
        note.playGo();
        animation.bobble(trPlayBtn.current);
    }
    
    let scaleExpanded = false;
    function scaleExpand() {
        const dropdownButton = scaleBack.current.children[scaleBack.current.childElementCount - 1];
        if (scaleExpanded === false) {
            scaleBack.current.classList.add("expanded");
            dropdownButton.style.rotate = "180deg";
            scaleExpanded = true;
            setTimeout(function(){
                scalesListRef.current.classList.add("open")
            }, 150)
        }
        else {
            scalesListRef.current.classList.remove("open");
            scaleExpanded = false;
            setTimeout(function(){
                scaleBack.current.classList.remove("expanded");
                dropdownButton.style.rotate = "0deg";
            }, 90)
        }
    } 

    return (      
        <div className='kb-page'>
            <Settings displaySettings={displaySettings}/>
            <Tracker trackRef={trackRef}/>
            <div id='title-logo' ref={logo} aria-label='Logo - Snailer Scaler'></div>
            <div>
                <div className='kb-page--cob' id='cob-menu'></div>
                <button className='kb-page--cob cobm' id='kbcob-m-tracker' title='Tracker' aria-label='Tracker' onClick={(e) => kbPageChange(e)}></button>
                <button className='kb-page--cob cobm' id='kbcob-m-settings' title='Settings' aria-label='Settings' onClick={(e) => displaySettings(e)}></button>
                <button className='kb-page--cob cobm' id='kbcob-m-help' title='Help' aria-label='Help' onClick={(e) => displayHelp(e)}>Help</button>

                <div ref={cobs} className='cobs'>
                    <InstrusAndEffects />
                    <SmallPlayer />
                    <div className='kb-page--cob cob-scales' ref={scaleBack}>
                        <ScalesList scalesListRef={scalesListRef}/>
                        <button className='cob-scales--dropdown' onClick={scaleExpand}></button>
                    </div>
                    <Scales scaleExpand={scaleExpand}/>
                </div>

                <div id='octaves' ref={mOctave}>
                    <button className='kb-page--cob cobm' id='kbcob-m-oct-up' onClick={(e) => changeOctave(options.octave + 1, "smooth", e)} aria-label='Octave: Up 1'></button>
                    <div className='kb-page--cob cobm' id='kbcob-m-oct'>
                        <p className='cobm--p'></p>
                    </div>
                    <button className='kb-page--cob cobm' id='kbcob-m-oct-down' onClick={(e) => changeOctave(options.octave - 1, "smooth", e)} aria-label='Octave: Down 1'></button>
                </div>

                <button ref={trBackBtn} id='tracker-back-btn' aria-label='Back' onMouseDown={clickBackButton}></button>
                <button ref={trPlayBtn} id='tracker-play-btn' aria-label='play' onMouseDown={clickPlayButton}></button>
            </div>
            
            <Keyboard kbRef={kbRef}/>
        </div>
    );
}