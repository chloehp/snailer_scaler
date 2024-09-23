
import './instrus-effects.scss';
import animation from '../func/animation';
import options from '../func/options';
import instrumentSwitch from '../func/instrument-switch';

import { useState } from 'react';

export default function InstrusAndEffects(props) {
    const maxInsLen = instrumentSwitch.length - 1;
    const [inString, setInString] = useState(instrumentSwitch[options.instruSelect].t)

    function nextInst(event) {
        animation.bobble(event.target);
        options.instruSelect++;
        if (options.instruSelect > maxInsLen) { options.instruSelect = 0 }
        setInString(instrumentSwitch[options.instruSelect].t);
        console.log("Instrument switched: " + options.instruSelect);
    }
    function prevInst(event) {
        animation.bobble(event.target);
        options.instruSelect--;
        if (options.instruSelect < 0) { options.instruSelect = maxInsLen }
        setInString(instrumentSwitch[options.instruSelect].t);
        console.log("Instrument switched: " + options.instruSelect);
    }

    return (
        <div className='instrs-efcts fill'>
            <div className='instrs-efcts--instruments'>
                <h1 className='instrs-efcts--instruments--t'>{inString}</h1>
                <div className='instrs-efcts--instruments--pic' role='img' aria-label='Keyboard picture'></div>
            </div>
            <button className='instrs-efcts--upbtn' onClick={(e) => nextInst(e)}></button>
            <button className='instrs-efcts--dnbtn' onClick={(e) => prevInst(e)}></button>
        </div>
    );
}