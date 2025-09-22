var audio = document.getElementById("myAudio");
var playButton = document.getElementById("playButton");
var lyrics = document.getElementById("lyrics"); // Asegúrate de tener este elemento en tu HTML

let rafId; // Variable para el ID de requestAnimationFrame
let previousIndex = -1;
let currentType = -1;

// Función para reproducir la canción y aplicar el efecto de desvanecimiento
function playAudio() {
  audio.play();
  playButton.classList.add("clicked");

  // Después de la transición, oculta completamente el botón
  setTimeout(function() {
    playButton.style.display = "none";
  }, 1000); // Ajusta el tiempo según la duración de la transición
}

// Asigna la función al evento de clic en el botón
playButton.addEventListener("click", playAudio);

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
// Letras de "Día de Enero" de Shakira, con tiempos exactos y emojis integrados
var lyricsData = [
  { time: 10.62, text: "Te conocí un día de enero ❄️" },
  { time: 13.50, text: "Con la luna en mi nariz 🌙" },
  { time: 16.55, text: "Y como vi que eras sincera 😊" },
  { time: 19.21, text: "En tus ojos me perdí 👀" },
  { time: 22.27, text: "Qué torpe distracción 😅" },
  { time: 24.91, text: "Y qué dulce sensación 💖" },
  { time: 28.36, text: "Y ahora que andamos por el mundo 🌍" },
  { time: 30.58, text: "Como Eneas y Benitín 👥" },
  { time: 33.89, text: "Ya te encontré varios rasguños 🤕" },
  { time: 36.67, text: "Que te hicieron por ahí 😔" },
  { time: 39.60, text: "Pero mi loco amor 💘" },
  { time: 42.23, text: "Es tu mejor doctor 🩺" },
  { time: 45.21, text: "Voy a curarte el alma en duelo 🩹" },
  { time: 48.71, text: "Voy a dejarte como nueva ✨" },
  { time: 51.88, text: "Y todo va a pasar ⏳" },
  { time: 54.00, text: "Pronto verás el sol brillar ☀️" },
  { time: 56.95, text: "Tú, más que nadie, mereces ser feliz 🌟" },
  { time: 60.55, text: "Ya vas a ver 👀" },
  { time: 63.25, text: "Cómo van sanando poco a poco tus heridas 🩺" },
  { time: 66.45, text: "Ya vas a ver cómo va la misma vida 🌈" },
  { time: 71.89, text: "A decantar la sal que sobra en el mar 🌊" },
  { time: 95.42, text: "Y aunque hayas sido extranjera hasta en tu propio país 🧳" },
  { time: 101.92, text: "Si yo te digo, '¿cómo dices?' ❓" },
  { time: 104.63, text: "Tú aún dices, '¿qué decís?' 🤔" },
  { time: 107.98, text: "Y lloras de emoción 😢" },
  { time: 110.33, text: "Oyendo un bandoneón 🎶" },
  { time: 114.20, text: "Y aunque parezcas despistada 😶" },
  { time: 116.92, text: "Con ese caminar pausado 🚶" },
  { time: 119.93, text: "Conozco la razón que hace doler tu corazón 💔" },
  { time: 124.98, text: "Por eso quise hacerte esta canción 🎵" },
  { time: 128.67, text: "Ya vas a ver 👀" },
  { time: 131.25, text: "Cómo van sanando poco a poco tus heridas 🩺" },
  { time: 134.50, text: "Ya vas a ver cómo va la misma vida 🌈" },
  { time: 140.13, text: "A decantar la sal que sobra en el mar 🌊" },
  { time: 146.17, text: "Ya vas a ver 👀" },
  { time: 148.67, text: "Cómo van sanando poco a poco tus heridas 🩺" },
  { time: 152.55, text: "Ya vas a ver cómo va la misma vida 🌈" },
  { time: 157.63, text: "A decantar la sal que sobra en el mar 🌊" },
  { time: 161.01, text: "" } // Línea vacía para fade-out final
];

// Animar las letras de forma fluida
function animateLyrics() {
  updateLyrics();
  rafId = requestAnimationFrame(animateLyrics);
}

// Animar las letras
function updateLyrics() {
  var time = audio.currentTime; // Usar tiempo exacto en segundos
  // Encontrar la línea actual
  var currentLine = null;
  var i;
  for (i = 0; i < lyricsData.length; i++) {
    const current = lyricsData[i];
    const nextTime = i < lyricsData.length - 1 ? lyricsData[i + 1].time : current.time + 6;
    if (time >= current.time && time < nextTime) {
      currentLine = current;
      break;
    }
  }

  if (currentLine && currentLine.text.trim() !== "") {
    // Detectar si es una nueva línea y elegir tipo de transición aleatorio
    if (i !== previousIndex) {
      currentType = Math.floor(Math.random() * 3); // 0: vertical, 1: horizontal, 2: zoom
      previousIndex = i;
    }

    // Calcula la opacidad con fade-in y fade-out
    var fadeInDuration = 1.2; // Duración del efecto de aparición en segundos
    var duration = i < lyricsData.length - 1 ? lyricsData[i + 1].time - currentLine.time : 6;
    var fadeOutStart = currentLine.time + duration * 0.5; // Comienza fade-out a la mitad
    var progress = (time - currentLine.time) / duration; // Progreso normalizado de 0 a 1
    var opacity;
    var transform = '';

    if (time < fadeOutStart) {
      // Fade-in: progress de 0 a 0.5 -> opacity de 0 a 1
      opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);
    } else {
      // Fade-out: progress de 0.5 a 1 -> opacity de 1 a 0
      opacity = Math.max(0, 1 - (time - fadeOutStart) / fadeInDuration);
    }

    // Aplicar transición dinámica basada en el tipo
    switch (currentType) {
      case 0: // Vertical slide: fade-in from below (translateY 20 to 0), fade-out to top (-20)
        if (time < fadeOutStart) {
          transform = `translateY(${(1 - opacity) * 20}px)`;
        } else {
          transform = `translateY(${-(1 - opacity) * 20}px)`;
        }
        break;
      case 1: // Horizontal slide: fade-in from left (translateX -50 to 0), fade-out to right (50)
        if (time < fadeOutStart) {
          transform = `translateX(${(1 - opacity) * -50}px)`;
        } else {
          transform = `translateX(${(1 - opacity) * 50}px)`;
        }
        break;
      case 2: // Zoom: fade-in from small (scale 0.8 to 1), fade-out to large (1 to 1.2)
        if (time < fadeOutStart) {
          transform = `scale(${opacity * 0.2 + 0.8})`;
        } else {
          transform = `scale(${1 + (1 - opacity) * 0.2})`;
        }
        break;
    }

    // Aplica los estilos con un contenedor interno para centrado perfecto
    lyrics.innerHTML = `<div class="line">${currentLine.text}</div>`;
    lyrics.style.opacity = opacity;
    lyrics.style.transform = transform;
    lyrics.style.display = "block"; // Asegura que el elemento sea visible
  } else {
    // Restablece la opacidad y el contenido si no hay una línea actual
    lyrics.style.opacity = 0;
    lyrics.style.transform = "scale(1) translateY(10px) translateX(0)"; // Reset para todos los tipos
    lyrics.innerHTML = "";
    previousIndex = -1; // Reset index para nueva canción o reinicio
  }
}

// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  if (titulo) {
    titulo.style.animation = "fadeOut 3s ease-in-out forwards";
    setTimeout(function () {
      titulo.style.display = "none";
    }, 3000);
  }
}

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 216000);

// Función opcional para mostrar las letras cuando empiece la música y iniciar animación fluida
audio.addEventListener('play', function() {
  if (lyrics) {
    lyrics.style.display = "block";
  }
  animateLyrics(); // Iniciar el bucle de animación para actualizaciones fluidas
});

// Función opcional para ocultar las letras cuando se pause la música y detener animación
audio.addEventListener('pause', function() {
  if (lyrics) {
    lyrics.style.opacity = 0;
    lyrics.style.transform = "scale(1) translateY(10px) translateX(0)";
  }
  cancelAnimationFrame(rafId); // Detener el bucle de animación
});