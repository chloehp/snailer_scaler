
import './keyboard.scss';
import WKey from "./key-w";
import BKey from "./key-b";

export default function Keyboard(props) {       

    return (      
        <div ref={props.kbRef} className='keyboard'>
            <OctGroup octave={"1"}/>
            <OctGroup octave={"2"}/>
            <OctGroup octave={"3"}/>
            <OctGroup octave={"4"}/>
            <OctGroup octave={"5"}/>
            <OctGroup octave={"6"}/>
            <OctGroup octave={"7"}/>
            <OctGroup octave={"8"}/>
        </div>
    );
}

function OctGroup(props) {    

    return (      
        <div ref={props.octRef} className='keyboard--oct-group'>
            <WKey note={"C" + props.octave}/>
            <BKey note={"C#" + props.octave}/>
            <WKey note={"D" + props.octave}/>
            <BKey note={"D#" + props.octave}/>
            <WKey note={"E" + props.octave}/>
            <WKey note={"F" + props.octave}/>
            <BKey note={"F#" + props.octave}/>
            <WKey note={"G" + props.octave}/>
            <BKey note={"G#" + props.octave}/>
            <WKey note={"A" + props.octave}/>
            <BKey note={"A#" + props.octave}/>
            <WKey note={"B" + props.octave}/>
        </div>
    );
}