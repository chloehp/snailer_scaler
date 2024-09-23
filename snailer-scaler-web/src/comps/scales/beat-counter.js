//import './scale-cob.scss';
//import options from '../func/options';

//setInterval(function () {
//    let x = options.trackhead;
//    let progressor = x * (32 / options.beatFraction);
//    while (progressor > 64) {progressor = progressor - 64}
//
//    //console.log(progressor)
//
//    if (x < 32) {
//        for (let i = 0; i < progressor; i++) {
//            
//        }
//    }
//}, 72);

export default function BeatCounter(props) {    
    return (
        <div className='beatCounter'>
            <div className='beatCounter--seg' style={{transform: 'rotate(0deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(11.25deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(22.5deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(33.75deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(45deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(56.25deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(67.5deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(78.75deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(90deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(101.25deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(112.5deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(123.75deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(135deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(146.25deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(157.5deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(168.75deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(180deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(191.25deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(202.5deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(213.75deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(225deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(236.25deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(247.5deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(258.75deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(270deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(281.25deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(292.5deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(303.75deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(315deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(326.25deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(337.5deg)'}}></div>
            <div className='beatCounter--seg' style={{transform: 'rotate(348.75deg)'}}></div>
        </div>
    )
}