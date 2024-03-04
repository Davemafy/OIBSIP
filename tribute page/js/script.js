const playBtn = document.getElementById("play-btn");
const video = document.querySelector("video");

playBtn.addEventListener("click", playPause);

function playPause() {
  if (video.paused) {
    playBtn.querySelector("img").src = "../icons/pause.png";
    video.play();
  } else {
    video.pause();
    playBtn.querySelector("img").src = "../icons/play.png";
  }
}
