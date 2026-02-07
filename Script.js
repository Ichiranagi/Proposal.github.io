const arena = document.getElementById("arena");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const toast = document.getElementById("toast");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");
const planText = document.getElementById("planText");

let attempts = 0;

const frases = [
  "¿Segura? 😳",
  "Ese botón no funciona hoy 😅",
  "Inténtalo otra vez 👀",
  "No tan rápido 😏",
  "La respuesta correcta es Sí 💖"
];

function mostrarToast(texto){
  toast.textContent = texto;
  toast.style.display = "block";
  clearTimeout(mostrarToast.timeout);
  mostrarToast.timeout = setTimeout(() => {
    toast.style.display = "none";
  }, 1300);
}

function moverBoton(){
  const area = arena.getBoundingClientRect();
  const boton = noBtn.getBoundingClientRect();

  const maxX = area.width - boton.width;
  const maxY = area.height - boton.height;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function escapar(){
  attempts++;
  moverBoton();
  mostrarToast(frases[attempts % frases.length]);

  const escala = Math.min(1.25, 1 + attempts * 0.03);
  yesBtn.style.transform = `scale(${escala})`;
}

noBtn.addEventListener("mouseenter", escapar);
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  escapar();
});
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  escapar();
}, { passive: false });

yesBtn.addEventListener("click", () => {
  planText.textContent = "Vamos a tener un lindo pinic en el jardin botanico :3 🍰";
  overlay.style.display = "flex";
  lanzarCorazones();
});

closeBtn.addEventListener("click", () => {
  overlay.style.display = "none";
});

function lanzarCorazones(){
  for(let i = 0; i < 25; i++){
    const h = document.createElement("div");
    h.textContent = "💖";
    h.style.position = "fixed";
    h.style.left = Math.random() * 100 + "vw";
    h.style.top = "-20px";
    h.style.fontSize = "20px";
    h.style.transition = "transform 1.8s linear, opacity 1.8s";
    document.body.appendChild(h);

    requestAnimationFrame(() => {
      h.style.transform = "translateY(110vh)";
      h.style.opacity = "0";
    });

    setTimeout(() => h.remove(), 1800);
  }
}