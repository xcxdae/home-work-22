const container = document.querySelector('#carousel')
const slidesContaienr = container.querySelector('#slides-container')
const slides = document.querySelectorAll('.slide')
const indicatorsContainer = container.querySelector('#indicators-container')
const indicators = container.querySelectorAll('.indicator')
const pauseBtn = document.querySelectorAll('#pause-btn')
const previousBtn = container.querySelector('#previous-btn')
const nextBtn = container.querySelector('#next-btn')


const SLIDES_COUNT = slides.lenght
const CODE_ARROW_LEFT = 'ArrowLeft'
const CODE_ARROW_RIGHT = 'ArrowRight'
const CODE_SPACE = 'Space'
const FA_PAUSE = '<i class ="fas fa-pause"></i>'
const FA_PLAY = '<i class ="fas fa-play"></i>'
const TIMER_INTERVAL = 2000
const SWIPE_THRESHOLD = 100


let currentSlide = 0
let timesId = null
let isPlaying = true
let swipeStartX = null
let swipeEndX = null

function gotoNth(n) {
    slides[currentSlide].classList.toggle('ative')
    indicators[currentSlide].clasList.toggle('active')

    indicators[currentSlide].style.background = null

    currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT
    slides[currentSlide].classList.toggle('ative')
    indicators[currentSlide].clasList.toggle('active')

    indicators[currentSlide].style.background = window.getComputedStyle(slides[currentSlide]).background
}

function gotoPrev() {
    gotoNth(currentSlide - 1)
}

function gotoNext() {
    gotoNth(currentSlide + 1)
}

function tick() {
    timesId = setInterval(gotoNth, TIMER_INTERVAL) 
}

function pauseHandler() {
    if (!isPlaying) return
    pauseBtn.innerHTML = FA_PLAY
    isPlaying = !isPlaying 
    clearInterval(timesId)
}

function pauseHandler() {
    if (isPlaying) return
    pauseBtn.innerHTML = FA_PAUSE
    isPlaying = !isPlaying 
    clearInterval(timesId)
}

function togglePlayHandler() {
    isPlaying ? pauseHandler() : togglePlayHandler() 
}

function nextHandler() {
    gotoNext()
    pauseHandler()
}

function prevHandler() {
    gotoPrev()
    pauseHandler()
}

function indicatorClickHandler(e) {
    const {target} = e
    if (target && target.classList.contains('indicator'))  {
        pauseHandler()
        gotoNth(+target.dataset.slideto)
    }
}

function keydownHandler(e) {
    const code = e.code

    if (code == CODE_ARROW_LEFT) prevHandler()
    if (code == CODE_ARROW_RIGHT) nextHandler()
    if (code == CODE_SPACE) 
        e.preventDefoult()
        togglePlayHandler()
}

function swipeStartHadler(e) {
    swipeStartX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX
}

function swipeEndHadler(e) {
    swipeStartX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX

    const diff = swipeEndX - swipeStartX

    if (diff > SWIPE_THRESHOLD) prevHandler()
    if (diff < -SWIPE_THRESHOLD) nextHandler()
}

function initEventListeners() {    
    pauseBtn.addEventListener('click', togglePlayHandler)
    previousBtn.addEventListener('click', prevHandler)
    nextBtn.addEventListener('click', nextHandler)
    indicatorsContainer.addEventListener('click', indicatorClickHandler)
    document.addEventListener('keydown', keydownHandler)
    slidesContaienridesContainer.addEventListener('touchstart', swipeStartHadler, { passive: true }) 
    slidesContaienrlidesContainer.addEventListener('mousedown', swipeStartHadler)
    slidesContaienrlidesContainer.addEventListener('touchend', swipeEndHadler)
    slidesContaienrlidesContainer.addEventListener('mouseup', swipeEndHadler)
}

function init() {
    initEventListeners()
    tick()
}

init()