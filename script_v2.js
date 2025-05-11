const envoltura = document.querySelector(".envoltura-sobre");
const carta = document.querySelector(".carta");
const cancionSobre = document.getElementById("cancionSobre"); // Asegúrate de que el ID coincida con tu HTML

// === AGREGAR ESTA BANDERA ===
// Variable para rastrear si la canción ya se ha reproducido por el *primer* click del corazón que abrió el sobre.
let cancionReproducidaPrimerClickCorazon = false; 
// ===========================

document.addEventListener("click", (e) => {
    // Primer bloque: Clicks que abren/cierran la envoltura (solapa, corazón, etc.)
    if (e.target.matches(".sobre") || 
        e.target.matches(".solapa-derecha") ||
        e.target.matches(".solapa-izquierda") ||
        e.target.matches(".corazon")) {

        // === Agregar esta línea para guardar el estado ANTES del toggle ===
        const estabaCerrado = !envoltura.classList.contains("abierto");
        // =============================================================

        envoltura.classList.toggle("abierto"); // Toggla la clase 'abierto'

        // Lógica para la canción:
        // === MODIFICAR ESTE BLOQUE IF ===
        // Reproducir la canción SÓLO SI:
        // 1. El click fue específicamente en el corazón
        // 2. El sobre estaba cerrado ANTES del toggle Y ahora está abierto DESPUÉS del toggle
        // 3. La canción *NO* se ha reproducido aún bajo esta condición específica
        if (e.target.matches(".corazon") && estabaCerrado && envoltura.classList.contains("abierto") && !cancionReproducidaPrimerClickCorazon) {
            cancionSobre.play().catch(error => {
                console.log("Error al intentar reproducir la canción:", error);
            });
            
            // === Establecer la bandera a true DESPUÉS de llamar a play ===
            cancionReproducidaPrimerClickCorazon = true; 
            // =======================================================

        } 
        // === MODIFICAR ESTE BLOQUE ELSE IF ===
        // Este bloque se ejecuta si el toggle resultó en que el sobre se CERRÓ.
        // Vamos a pausar y reiniciar la canción SÓLO SI *NO* fue la canción activada
        // por el primer click especial del corazón. Si fue esa canción (la bandera es true),
        // los clicks posteriores en el sobre NO deben afectarla.
        else if (!envoltura.classList.contains("abierto")) {
             // Pausar y reiniciar SOLO si la bandera aún es false
             if (!cancionReproducidaPrimerClickCorazon) {
                 cancionSobre.pause();
                 cancionSobre.currentTime = 0; // Reiniciar sólo si no fue la canción especial
             }
             // Si cancionReproducidaPrimerClickCorazon es true, este bloque no hace nada a la canción.
        }
        // =====================================
    } 
    // Segundo bloque: Clicks dentro del sobre para interactuar con la carta
    else if (e.target.matches(".sobre *")) {
        // El código para abrir/cerrar la carta permanece igual
        if (!carta.classList.contains("abierta")) {
            carta.classList.add("mostrar-carta");

            setTimeout(() => {
                carta.classList.remove("mostrar-carta");
                carta.classList.add("abierta");
            }, 500);
            envoltura.classList.add("desactivar-sobre");

            // Opcional: Si descomentas esto para pausar la canción cuando la carta se abre,
            // también deberías verificar !cancionReproducidaPrimerClickCorazon
            // si no quieres que la canción especial se pause por abrir la carta.
            // if (!cancionReproducidaPrimerClickCoracion) {
            //    cancionSobre.pause();
            // }

         } else { // La carta está abierta, se va a cerrar
             carta.classList.add("cerrando-carta");
             envoltura.classList.remove("desactivar-sobre");

             setTimeout(() => {
                 carta.classList.remove("cerrando-carta");
                 carta.classList.remove("abierta");
             }, 500);

            // Opcional: Si pausaste la canción al abrir la carta, podrías reanudar aquí,
            // de nuevo respetando la bandera si es necesario.
         }
     } 
});