const audio = new Audio("/assets/song.mp3");
audio.loop = true;

const audioCtx = new AudioContext();
const analyser = audioCtx.createAnalyser();
const source = audioCtx.createMediaElementSource(audio);

source.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize = 128;
const dataArray = new Uint8Array(analyser.frequencyBinCount);

const canvas = document.getElementById("bars");
const ctx = canvas.getContext("2d");

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const radius = parseFloat(
  getComputedStyle(document.documentElement).getPropertyValue(
    "--border-radius",
  ),
);
function draw() {
  requestAnimationFrame(draw);
  analyser.getByteFrequencyData(dataArray);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const count = dataArray.length;
  const gap = 4;
  const barWidth = ((canvas.width - (count - 1) * gap) / count) * 1;

  dataArray.forEach((value, i) => {
    const h = (value / 1920) * canvas.height;
    if (h < 1) return;

    const x = i * (barWidth + gap);
    const y = canvas.height - h;

    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.beginPath();
    ctx.roundRect(x, y, barWidth, h, radius);
    ctx.fill();
  });
}
draw();

document.getElementById("play").addEventListener("click", () => {
  audioCtx.resume();
  if (audio.paused) {
    audio.play();
    document.getElementById("play-icon").classList.add("hidden");
    document.getElementById("pause-icon").classList.remove("hidden");
    // document.getElementById("image-background").classList.remove("opacity-0");
    // document.getElementById("image-background").classList.add("opacity-5");
  } else {
    audio.pause();
    document.getElementById("play-icon").classList.remove("hidden");
    document.getElementById("pause-icon").classList.add("hidden");
    // document.getElementById("image-background").classList.remove("opacity-5");
    // document.getElementById("image-background").classList.add("opacity-0");
  }
});
