/* Get Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
let mouseDownRange = false;
let mouseDownProgress = false;

/* Build Funcs */
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(seconds) {
    video.currentTime += seconds;
}

function handleRangeUpdate() {
    if (mouseDownRange) {
        video[this.name] = this.value;
    }
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function moveTime(e) {
    if (mouseDownProgress) {
        const newTime = (e.offsetX / this.offsetWidth) * video.duration;
        video.currentTime = newTime;
    }
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', () => skip(parseFloat(button.dataset.skip))));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousedown', () => mouseDownRange = true));
ranges.forEach(range => range.addEventListener('mouseup', () => mouseDownRange = false));
progress.addEventListener('mousemove', moveTime)
progress.addEventListener('mousedown', () => mouseDownProgress = true);
progress.addEventListener('mouseup', () => mouseDownProgress = false);