const playBtn = document.getElementById("play-btn");
const video = document.querySelector("video");

playBtn.addEventListener("click", togglePlay);

function togglePlay() {
  if (video.paused) {
    console.log(playBtn);
    playBtn.querySelector("img").src = "../icons/play.png";
    // video.play();
  } else {
    // video.pause();
    playBtn.querySelector("img").src = "../icons/pause.png";
  }
}
