import './smallplayer.scss';
import note from '../func/note';
import animation from '../func/animation';

export default function PlayButtons(props) {
    
    function clickBackButton(event){
        note.trackSet();
        animation.bobble(event.target);
    }
    function clickPlayButton(event){
        note.playGo();
        animation.bobble(event.target);
    }
    function clickRecButton(event){
        note.recordGo();
        animation.bobble(event.target);
    }

    if (props.type === "back") {return (        
        <button className='smallplayer--buttons--btn' id='back-button' onClick={(e) => clickBackButton(e)} aria-label='Restart track'>
            <div id='restart-spot' className='smallplayer--buttons--btn--icon'></div>
        </button>
    )}
    else if (props.type === "play") {return (        
        <button className='smallplayer--buttons--btn' id='play-button' onClick={(e) => clickPlayButton(e)} aria-label='Play track'>
            <div id='play-spot' className='smallplayer--buttons--btn--icon'></div>
            <div id='pause-spot' className='smallplayer--buttons--btn--icon'></div>
        </button>
    )}
    else /*(props.type === "record")*/ {return (     
        <button className='smallplayer--buttons--btn' id='rec-button'  onClick={(e) => clickRecButton(e)} aria-label='Record track'>
            <div id='red-spot' className='smallplayer--buttons--btn--icon'></div>
        </button>
    )}
}