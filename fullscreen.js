const BUTTON = document.querySelector('.fullscreen')
const IFRAME = document.querySelector('.game')

const toggleFullscreen = () => {
    IFRAME.requestFullscreen()
}

BUTTON.addEventListener('click', toggleFullscreen)