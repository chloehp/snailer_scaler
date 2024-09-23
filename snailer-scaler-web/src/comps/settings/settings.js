import './settings.scss'
import options from '../func/options';
import trackFill from '../func/track-fill';
import { useRef } from 'react';
import { useState } from 'react';

export default function Settings(props) {
   return (
      <div id='settings' className='snackground' aria-hidden='true'>
         <h1>Settings</h1>
         <div className='gridcon'>
            <GridThemeSelect title={"Theme"} opt={options.changeTheme}/>
            <GridItemBool title={"Beat rounding"} id={"settings-beat"} opt={options.changeBeatRounding}/>
            <GridItemBool title={"Musical QWERTY"} id={"settings-qwerty"} opt={options.changeMusicalQwerty}/>        
            <GridItemBool title={"Visible notes"} id={"settings-visnotes"} opt={options.changeVisNotes}/>
            <GridItemHit />
            <GridItemBPM />
            <GridTrackLength />
            <GridSigSelect title={"Time Signature"}/>            
            <div className='gridcon--g'>
               <button className='gridcon--g--ico pressed' style={{fontSize: "4.5em"}}>?</button>
               <p>About</p>
            </div>     
         </div>
         <button className='closeX' onClick={props.displaySettings}>+</button>
      </div>
   )
}
//
function GridItemHit(props) {
   const input = useRef();
   function changeHit() {
      const val = input.current.value;
      options.hitLatency = val; 
   }

   return (
      <div className='gridcon--g'>
         <div className='gridcon--g--ico pressed'>
            <input type='text' aria-label="Hit latency input" defaultValue={options.hitLatency} ref={input} onChange={changeHit}/>
         </div>
         <p>Hit latency</p>
      </div>
   )
}
//
function GridItemBPM(props) {   
   const input = useRef();
   const defaultValue = options.getBPM();
   function changeBPM() { options.beatFLen = options.getNewBeatFLenFromNewBPM(input.current.value) }
   let oldBPM = options.getBPM();
   setInterval(function(){         
      if ((input.current) && (options.getBPM() !== oldBPM)) { 
         input.current.value = options.getBPM() 
      }
   }, 1500); 

   return (
      <div className='gridcon--g'>
         <div className='gridcon--g--ico pressed'>
            <input type='text' aria-label="BPM input" defaultValue={defaultValue} ref={input} onChange={changeBPM}/>
         </div>
         <p>BPM</p>
      </div>
   )
}
//
function GridTrackLength(props) {   
   const input = useRef();
   function changeTrackLength() { options.trackLength = input.current.value }
   let oldTrackLength = options.trackLength;
   setInterval(function(){         
      if ((input.current) && (options.trackLength !== oldTrackLength)) {
          input.current.value = options.trackLength 
      }
   }, 1500); 

   return (
      <div className='gridcon--g'>
         <div className='gridcon--g--ico pressed'>
            <input type='text' aria-label="Track length input" defaultValue={options.trackLength} ref={input} onChange={changeTrackLength}/>
         </div>
         <p>Track length</p>
      </div>
   )
}
//
function GridItemBool(props) {
   const btn = useRef();

   function action() {
      if (props.opt() === true) {
         btn.current.classList.add("pressed");
         btn.current.setAttribute("aria-pressed", "true");
      }
      else {
         btn.current.classList.remove("pressed");
         btn.current.setAttribute("aria-pressed", "false");
      }
   }

   return (
      <div className='gridcon--g'>
         <button className='gridcon--g--ico pressed' id={props.id} ref={btn} aria-pressed='true' onClick={action} ></button>
         <p>{props.title}</p>
      </div>
   )
}
let themeSelection = 0;
function GridThemeSelect(props) {
   const themeAr = ["Mono \nGreen"]; //, "Multi \nDark", "High \nContrast
   const maxSel = themeAr.length - 1;
   const [theme, setTheme] = useState(themeAr[themeSelection]);
   function prev() {
      themeSelection--;
      if (themeSelection < 0) {themeSelection = maxSel}
      setTheme(themeAr[themeSelection]);
   }
   function next() {
      themeSelection++;
      if (themeSelection > maxSel) {themeSelection = 0}
      setTheme(themeAr[themeSelection]);
   }

   return (
      <div className='gridcon--g'>
         <div className='gridcon--g--ico'>
            <p className='gridcon--g--ico--txt'>{theme}</p>
            <button className='gridcon--g--ico--prev-ar' aria-label={"Previous " + props.title} onClick={prev}><div></div></button>
            <button className='gridcon--g--ico--next-ar' aria-label={"Next " + props.title} onClick={next}><div></div></button>
         </div>
         <p>{props.title}</p>
      </div>
   )
}
let sigSelection = 2;
function GridSigSelect(props) {
   const sigAr = ["2\n4", "3\n4", "4\n4", "5\n4", "6\n4", "7\n4", "8\n4", "9\n4"];
   const maxSel = sigAr.length - 1;
   const [signature, setSignature] = useState(sigAr[sigSelection]);
   function prev() {
      sigSelection--;
      if (sigSelection < 0) {sigSelection = maxSel}
      setSignature(sigAr[sigSelection]);
      set();
   }
   function next() {
      sigSelection++;
      if (sigSelection > maxSel) {sigSelection = 0}
      setSignature(sigAr[sigSelection]);
      set();
   }
   function set() {
      const sigNum = Number(sigAr[sigSelection].charAt(0));
      options.timeSigTop = sigNum;
      console.log("time signature:\n" + sigAr[sigSelection]);
      try{ trackFill() }
      catch { console.log("no current track") }
   }

   return (
      <div className='gridcon--g'>
         <div className='gridcon--g--ico pressed'>
            <p className='gridcon--g--ico--txt' style={{fontSize: "4.5em", lineHeight: "0.66em"}}>{signature}</p>
            <button className='gridcon--g--ico--prev-ar' aria-label={"Previous " + props.title} onClick={prev}><div></div></button>
            <button className='gridcon--g--ico--next-ar' aria-label={"Next " + props.title} onClick={next}><div></div></button>
         </div>
         <p>{props.title}</p>
      </div>
   )
}