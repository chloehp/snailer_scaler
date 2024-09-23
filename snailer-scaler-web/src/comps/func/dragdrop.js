import tr from "./tracks";
import options from "./options";
import trackFill from "./track-fill";
//taken from w3schools, modded to add height and touch

function dragElement(elmnt, lenChange = false) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const originalX = elmnt.offsetLeft;
    const originalY = elmnt.offsetTop;
    const originalH = parseInt(elmnt.style.height);
    //const trackerEl = document.querySelector(".tracker");
    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = dragTouchDown;

    const trackSelLen = tr.tracks[options.trackSelection].length;
    let thisPointInArray;
    for (let i = 0; i < trackSelLen; i++) {
        if (elmnt.id === tr.tracks[options.trackSelection][i].id) {thisPointInArray = tr.tracks[options.trackSelection][i]}
    }

    function dragMouseDown(e) {
        e = e || window.event;
        //e.preventDefault();
        if (e.target.classList.contains("track--track--column--point--input")) {return}
        else if (e.target.classList.contains("track--track--column--point--btm")) {lenChange = true}
        // get the mouse cursor position at startup:
        pos3 = e.clientX; pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }
    function dragTouchDown(e) {
        //trackerEl.style.touchAction = "none";
        e = e || window.event;        
        if (e.target.classList.contains("track--track--column--point--input")) {return}
        else if (e.target.classList.contains("track--track--column--point--btm")) {lenChange = true}
        // get the mouse cursor position at startup:
        pos3 = e.clientX; pos4 = e.clientY;
        document.ontouchend = closeTouchElement;
        // call a function whenever the cursor moves:
        document.ontouchmove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        //e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - (e.clientX || e.targetTouches[0].pageX);
        pos2 = pos4 - (e.clientY || e.targetTouches[0].pageY);
        pos3 = e.clientX || e.targetTouches[0].pageX;
        pos4 = e.clientY || e.targetTouches[0].pageY;
        // set the element's new position:
        if (lenChange === false) {
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
        else {
            const chHeight = parseInt(elmnt.style.height) - pos2;
            elmnt.style.height = chHeight + "px";
        }
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        changePosition();
        trackFill();
    }
    function closeTouchElement() {
        // stop moving when mouse button is released:
        document.ontouchend = null;
        document.ontouchmove = null;
        changePosition();
        trackFill();
    }
    function changePosition() {        
        try {
            const movedPosX = Math.trunc((elmnt.offsetLeft - originalX) / 54);
            const movedPosY = elmnt.offsetTop - originalY;
            const changedH = parseInt(elmnt.style.height) - originalH;
            thisPointInArray.pos += movedPosX;
            
            if ((movedPosX === 0) && (movedPosY === 0) && (lenChange === false)) {
                console.log(elmnt.id)
            }
            else if (lenChange === true) {thisPointInArray.len += (changedH / 15);}
            else {thisPointInArray.start += (movedPosY / 15)}
        }
        catch {console.warn("Length drag on unselected track")}
    }
}

export default dragElement;