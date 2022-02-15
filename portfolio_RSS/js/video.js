const video = document.querySelector('.video__player');
const controls = document.querySelector('.video__controls');
const poster = document.querySelector('.video__poster');
const videoContainer = document.querySelector('.video__container');
const videoDuration = document.querySelector('.controls__play__duration');
const videoCurrentTime = document.querySelector('.controls__play__currentTime');
const videoProgress = document.querySelector('.controls__progress');
const volumeProgress = document.querySelector('.controls__volume__progress');
const playButton = document.querySelector('.video__btn');
const muteButton = document.querySelector('.controls__mute');
const toggleButton = document.querySelector('.controls__play');
const fullscreenButton = document.querySelector('.controls__resize');

/* Start/Pause Video */

video.addEventListener('click', togglePlay)
playButton.addEventListener('click', startPlay)
toggleButton.addEventListener('click', togglePlay)

function startPlay() {
  video.play()
  poster.style.display = 'none'
  controls.style.display = 'flex'
  playButton.style.display = 'none'
  let durationMin = Math.floor(video.duration / 60)
  let durationSec = Math.floor(video.duration - durationMin * 60)
  if (durationSec < 10) {
    durationSec = '0' + durationSec;
  }
  if (durationMin < 10) {
    durationMin = '0' + durationMin;
  }
  videoDuration.innerHTML = durationMin + ':' + durationSec;
}

function togglePlay() {
  if (video.paused) {
    video.play()
    toggleButton.classList.remove('controls__pause__icon')
    toggleButton.classList.add('controls__play__icon')
    playButton.style.display = 'none'
  }
  else {
    video.pause()
    toggleButton.classList.remove('controls__play__icon')
    toggleButton.classList.add('controls__pause__icon')
    playButton.style.display = 'block'
  }
}

/* Progress video */

let mousedown = false
videoProgress.addEventListener('click', (e) => updateNewProgress(e))
videoProgress.addEventListener('mousemove', function (e) {
  if (mousedown) {
    updateNewProgress(e)
  }
})
videoProgress.addEventListener('mousedown', () => mousedown = true)
videoProgress.addEventListener('mouseup', () => mousedown = false)
video.addEventListener('timeupdate', progressUpdate)


function updateNewProgress(e) {
  let progression = (e.clientX - videoContainer.offsetLeft) / videoContainer.clientWidth;
  video.currentTime = progression * video.duration;
  videoProgress.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${progression}%, rgb(200, 200, 200) ${progression}%, rgb(200, 200, 200) 100%)`
}

function progressUpdate() {
  let progressBar = video.currentTime * (100 / video.duration);
  videoProgress.value = progressBar;
  let progressBarPercent = Math.round(progressBar);
  videoProgress.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${progressBarPercent}%, rgb(200, 200, 200) ${progressBarPercent}%, rgb(200, 200, 200) 100%)`

}

/* Display current time */

video.addEventListener('timeupdate', displayTime)

function displayTime() {
  let currentTimeMin = Math.floor(video.currentTime / 60)
  let currentTimeSec = Math.floor(video.currentTime - currentTimeMin * 60)
  if (currentTimeSec < 10) {
    currentTimeSec = '0' + currentTimeSec;
  }
  if (currentTimeMin < 10) {
    currentTimeMin = '0' + currentTimeMin;
  }
  videoCurrentTime.textContent = currentTimeMin + ':' + currentTimeSec;
}

/* Sound control */

let mousedownVolume = false;
volumeProgress.addEventListener('click', setVolume)
volumeProgress.addEventListener('mousemove', function () {
  if (mousedownVolume) {
    setVolume()
  }
})
volumeProgress.addEventListener('mousedown', () => mousedownVolume = true)
volumeProgress.addEventListener('mouseup', () => mousedownVolume = false)
muteButton.addEventListener('click', toggleVolumeFunction)

function toggleVolumeFunction() {
  if (video.muted) {
    unmuteVideo()
  }
  else {
    muteVideo()
  }
}

function muteVideo() {
  video.muted = true
  muteButton.classList.remove('controls__unmute__icon')
  muteButton.classList.add('controls__mute__icon')
}

function unmuteVideo() {
  video.muted = false
  muteButton.classList.remove('controls__mute__icon')
  muteButton.classList.add('controls__unmute__icon')
}

function setVolume() {
  let volumeLevel = volumeProgress.value / 100
  video.volume = volumeLevel
  volumeProgress.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${volumeProgress.value}%, rgb(200, 200, 200) ${volumeProgress.value}%, rgb(200, 200, 200) 100%)`
  if (volumeLevel === 0) {
    muteVideo()
  }
  else {
    unmuteVideo()
  }
}

/* Fullscreen */

fullscreenButton.addEventListener('click', fullscreenFn);

function fullscreenFn() {
  if (document.fullscreenElement === null) {
    videoContainer.requestFullscreen()
    fullscreenButton.classList.remove('controls__resize__increase')
    fullscreenButton.classList.add('controls__resize__decrease')
  }
  else {
    document.exitFullscreen()
    fullscreenButton.classList.remove('controls__resize__decrease')
    fullscreenButton.classList.add('controls__resize__increase')
  }
}