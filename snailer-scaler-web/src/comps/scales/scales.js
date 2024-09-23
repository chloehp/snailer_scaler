import './scale-cob.scss';

export default function Scales(props) {   

    return (
        <div className='scales-area' title='Scales'>
            <div className='scales-area--scale'>
                <div className='scales-area--scale--type' id='scale-type' onClick={props.scaleExpand}>Scale</div>
                <p className='scales-area--scale--in'>in</p>
                <div className='scales-area--scale--note' id='scale-note' onClick={props.scaleExpand}>X</div>
            </div>
        </div>
    )
}