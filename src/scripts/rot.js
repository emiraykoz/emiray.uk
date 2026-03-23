const rotElements = document.querySelectorAll(".main");
rotElements.forEach((el) => {
  document.addEventListener("mousemove", (event) => {
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = event.clientX - rect.left - width / 2;
    const y = event.clientY - rect.top - height / 2;
    const xPercent = x / (width / 2);
    const yPercent = y / (height / 2);
    const maxTilt = 1;
    const xRotate = yPercent * maxTilt;
    const yRotate = xPercent * -maxTilt;
    el.style.transform = `perspective(500px) rotateX(${xRotate}deg) rotateY(${yRotate}deg)`;
  });
});
