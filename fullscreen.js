const BUTTON = document.querySelector('button')
const IFRAME = document.querySelector('.game')

const toggleFullscreen = () => {
    IFRAME.requestFullscreen()
}

BUTTON.addEventListener('click', toggleFullscreen)

document.onkeydown = function(e){
    e = e || window.event;
    var key = e.which || e.keyCode;
    if(key===70){
            if(!document.fullscreen){
        toggleFullscreen(
            document.querySelector('.game')
        );
        }else{
        document.exitFullscreen()
        }
    }
};