// RELOJ
function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  document.getElementById("time").textContent = `${hours}:${minutes}`;
  document.getElementById("period").textContent = period;

  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const dayOfWeek = days[now.getDay()];
  const day = now.getDate();
  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sept",
    "Oct",
    "Nov",
    "Dic",
  ];
  const month = months[now.getMonth()];

  document.getElementById("day").textContent = `${dayOfWeek}, ${month} ${day}`;
}
updateTime();
setInterval(updateTime, 1);

// MAPA
document.addEventListener("DOMContentLoaded", () => {
  // Crear el mapa
  var map = L.map("map").setView([4.711, -74.0721], 12); // Coordenadas de Bogotá
  // Agregar una capa de mapa de OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Variable para almacenar los marcadores
  let markers = [];
  let alertasData = []; // Variable para almacenar las alertas originales

  function mostrarAlertasFiltradas(nivelesSeleccionados) {
    // Remover todos los marcadores del mapa
    markers.forEach(({ marker }) => map.removeLayer(marker));

    // Filtrar y mostrar las alertas según los niveles seleccionados
    alertasData.forEach((alerta) => {
      if (nivelesSeleccionados.includes(alerta.nivel)) {
        const [lat, lng] = alerta.ubicacion.split(",").map(Number);
        if (!isNaN(lat) && !isNaN(lng)) {
          // Crear un marcador para cada alerta
          const marker = L.marker([lat, lng]).bindTooltip(
            `
                            <strong>Fecha:</strong> ${alerta.fecha}<br>
                            <strong>Hora:</strong> ${alerta.hora}<br>
                            <strong>Nivel:</strong> ${alerta.nivel}<br>
                            <strong>Descripción:</strong> ${alerta.descripcion}
                        `,
            { permanent: false, sticky: true }
          );
          markers.push({ marker, nivel: alerta.nivel });
          marker.addTo(map); // Añadir el marcador filtrado al mapa
        }
      }
    });
  }

  // Función para obtener alertas de la base de datos
  fetch("http://localhost:3000/alertas")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then((alertas) => {
      const alertSelect = document.getElementById("list_alert_selector"); // Selector de alertas
      alertas.forEach((alerta, index) => {
        const [lat, lng] = alerta.ubicacion.split(",").map(Number);
        if (!isNaN(lat) && !isNaN(lng)) {
          // Crear un marcador para cada alerta
          const marker = L.marker([lat, lng]).bindTooltip(
            `
                        <strong>Fecha:</strong> ${alerta.fecha}<br>
                        <strong>Hora:</strong> ${alerta.hora}<br>
                        <strong>Nivel:</strong> ${alerta.nivel}<br>
                        <strong>Descripción:</strong> ${alerta.descripcion}
                    `,
            { permanent: false, sticky: true }
          );

          // Almacenar el marcador en el array de marcadores con el nivel
          markers.push({ marker, nivel: alerta.nivel });

          // Agregar la alerta al selector
          const option = document.createElement("option");
          option.value = index; // El índice del marcador en el array
          option.textContent = `Alerta ${index + 1} - Nivel: ${
            alerta.nivel
          } - ${alerta.fecha}`;
          alertSelect.appendChild(option);
        } else {
          console.error(`Ubicación inválida: ${alerta.ubicacion}`);
        }
      });

      // Evento cuando el usuario selecciona una alerta
      alertSelect.addEventListener("change", function () {
        // Remover todos los marcadores del mapa
        markers.forEach(({ marker }) => map.removeLayer(marker));

        // Mostrar solo el marcador seleccionado
        const selectedIndex = this.value;
        if (selectedIndex !== "") {
          markers[selectedIndex].marker.addTo(map);
          map.setView(markers[selectedIndex].marker.getLatLng(), 14); // Centrar en el marcador seleccionado
        }
      });
    })
    .catch((error) => {
      console.error("Error al obtener las alertas:", error);
    });
  // Obtener las alertas de la base de datos
  fetch("http://localhost:3000/alertas")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then((alertas) => {
      alertasData = alertas; // Guardar las alertas en la variable
      // Filtrado por nivel usando checkboxes
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
          const nivelesSeleccionados = Array.from(checkboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.getAttribute("data-nivel"));

          mostrarAlertasFiltradas(nivelesSeleccionados);
        });
      });
    })
    .catch((error) => {
      console.error("Error al obtener las alertas:", error);
    });

  // Manejar el evento de clic en el mapa para seleccionar una ubicación
  let selectedLocation;
  map.on("click", function (e) {
    if (selectedLocation) {
      map.removeLayer(selectedLocation); // Elimina el marcador anterior
    }
    selectedLocation = L.marker(e.latlng).addTo(map); // Añade el nuevo marcador
    document.getElementById(
      "ubicacion"
    ).value = `${e.latlng.lat}, ${e.latlng.lng}`; // Guarda la ubicación seleccionada en un campo oculto
  });
});

// Lógica del formulario para enviar datos al backend
document.querySelector(".alerta").addEventListener("click", function (event) {
  event.preventDefault(); // Prevenir la recarga de la página
  // Obtener la ubicación seleccionada
  const ubicacion = document.getElementById("ubicacion").value;
  // Comprobar si se ha seleccionado una ubicación
  if (!ubicacion) {
    alert("Por favor, selecciona una ubicación en el mapa."); // Mostrar alerta si no hay ubicación
    return; // Detener la ejecución si no se seleccionó ubicación
  }
  // Recopilar los datos del formulario
  const data = {
    fecha: document.getElementById("fecha").value,
    hora: document.getElementById("hora").value,
    nivel: document.getElementById("nivel").value,
    descripcion: document.getElementById("descripcion").value,
    ubicacion: document.getElementById("ubicacion").value, // Obtener la ubicación seleccionada
  };
  // Enviar los datos al backend mediante fetch
  fetch("http://localhost:3000/crear-alerta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json(); // Asegúrate de que el servidor está devolviendo JSON
    })
    .then((result) => {
      console.log("Alerta creada:", result);
      window.location.href = "indexMapa.html";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

function mostrarGuia() {
  console.log("guias");
  document.getElementById("seccion-guias").style.display = "flex";
  document.getElementById("seccion-videos").style.display = "none";
}

function mostrarVideo() {
  console.log("videos");
  document.getElementById("seccion-guias").style.display = "none";
  document.getElementById("seccion-videos").style.display = "flex";
}

// Marcar/desmarcar estrella
estrella.addEventListener("click", function () {
  estrella.classList.toggle("marcar");
});

// Seleccionamos todas las imágenes de guías
const guiaImages = document.querySelectorAll(".imagen-guia");
const popup = document.getElementById("popup");
const closeButton = document.querySelector(".close-button");
const popupTitle = document.getElementById("popup-title"); // Para el título
const popupText = document.getElementById("popup-text"); // Para el contenido

// Muestra el popup al hacer clic en cualquier imagen de guía
guiaImages.forEach((image) => {
  image.addEventListener("click", function (event) {
    event.preventDefault(); // Evita redirección
    const guiaId = this.getAttribute("data-id"); // Obtener el ID de la guía
    window.idGuiaSeleccionada = guiaId; // Guarda el id de la guía seleccionada

    // Hacer la solicitud al servidor para obtener el contenido de la guía
    fetch(`http://localhost:3000/guia/${guiaId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo cargar la guía."); // Manejo de error si la respuesta no es válida
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !data.titulo_guia || !data.contenido) {
          throw new Error("Datos de la guía incompletos."); // Manejo de error si faltan datos
        }

        // Mostrar el contenido de la guía en el popup
        popupTitle.innerText = data.titulo_guia;
        popupText.innerText = data.contenido;
        popup.style.display = "block";

        cargarUsuarios(); // Cargar usuarios al abrir el popup
      })
      .catch((error) => {
        popupTitle.innerText = "Error";
        popupText.innerText = error.message;
        popup.style.display = "block";
        console.error("Error fetching guia:", error);
      });
  });
});

// Cierra el popup al hacer clic en la 'X'
closeButton.addEventListener("click", function () {
  popup.style.display = "none";
});

// Cierra el popup al hacer clic fuera del contenido
window.addEventListener("click", function (event) {
  if (event.target === popup) {
    popup.style.display = "none";
  }
});

// Selección de elementos HTML
const usuarioSelect = document.getElementById("usuario");
const comentarioTextarea = document.getElementById("comentario");
const enviarComentarioButton = document.getElementById("enviar-comentario");

// Función para cargar usuarios
function cargarUsuarios() {
  fetch("http://localhost:3000/usuarios")
    .then((response) => response.json())
    .then((data) => {
      console.log("Usuarios cargados:", data);

      // Limpiar el select antes de agregar opciones
      usuarioSelect.innerHTML =
        '<option value="">Selecciona un usuario</option>';

      data.usuarios.forEach((usuario) => {
        const option = document.createElement("option");
        option.value = usuario.id_usuario;
        option.textContent = `${usuario.nombre} ${usuario.apellido}`;
        usuarioSelect.appendChild(option);
      });

      usuarioSelect.disabled = false;
    })
    .catch((error) => console.error("Error al cargar usuarios:", error));
}

// Lógica para habilitar la caja de comentarios cuando se selecciona un usuario
usuarioSelect.addEventListener("change", function () {
  comentarioTextarea.disabled = !usuarioSelect.value;
  enviarComentarioButton.disabled = !usuarioSelect.value;
});
// Lógica para enviar comentario
enviarComentarioButton.addEventListener("click", function () {
  const comentario = comentarioTextarea.value;
  const id_usuario = usuarioSelect.value;

  if (comentario.trim() === "") {
    alert("Por favor, escribe un comentario antes de enviar.");
    return;
  }

  // Enviar el comentario al backend con el id_guia seleccionado
  fetch("http://localhost:3000/enviar-comentario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_usuario: parseInt(id_usuario, 10), // Asegúrate de que sea un número
      id_guia: window.idGuiaSeleccionada,
      comentario,
    }),
  })
    .then((response) => {
      if (response.ok) {
        alert("Comentario enviado con éxito.");
        comentarioTextarea.value = ""; // Limpiar el campo de comentarios
        usuarioSelect.value = ""; // Reiniciar el select de usuario
        comentarioTextarea.disabled = true; // Deshabilitar el textarea
        enviarComentarioButton.disabled = true; // Deshabilitar el botón
      } else {
        alert("Error al enviar el comentario.");
      }
    })
    .catch((error) => console.error("Error:", error));
});
