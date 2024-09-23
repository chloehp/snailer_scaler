
const animation = {
    bobble(element) {
        element.classList.remove("sp-bobble");    
        element.classList.add("sp-bobble");        
        setTimeout(function(){
            element.classList.remove("sp-bobble");    
        }, 1200)
    },
}

export default animation;