// RELOJ
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    document.getElementById('time').textContent = `${hours}:${minutes}`;
    document.getElementById('period').textContent = period;

    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayOfWeek = days[now.getDay()];
    const day = now.getDate();
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic'];
    const month = months[now.getMonth()];

    document.getElementById('day').textContent = `${dayOfWeek}, ${month} ${day}`;
}

updateTime();
setInterval(updateTime, 60000);

// MAPA
document.addEventListener('DOMContentLoaded', () => {
    // Crear el mapa
    var map = L.map('map').setView([4.711, -74.0721], 12); // Coordenadas de Bogotá
    // Agregar una capa de mapa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    // Crear variable para almacenar la ubicación seleccionada
    var selectedLocation = null;
    // Manejar el evento de clic en el mapa para seleccionar una ubicación
    map.on('click', function (e) {
        if (selectedLocation) {
            map.removeLayer(selectedLocation); // Elimina el marcador anterior
        }
        selectedLocation = L.marker(e.latlng).addTo(map); // Añade el nuevo marcador
        document.getElementById('ubicacion').value = `${e.latlng.lat}, ${e.latlng.lng}`; // Guarda la ubicación seleccionada en un campo oculto
    });
});

// Lógica del formulario para enviar datos al backend
document.querySelector('.alerta').addEventListener('click', function (event) {
    event.preventDefault(); // Prevenir la recarga de la página
    // Recopilar los datos del formulario
    const data = {
        fecha: document.getElementById('fecha').value,
        hora: document.getElementById('hora').value,
        nivel: document.getElementById('nivel').value,
        descripcion: document.getElementById('descripcion').value,
        ubicacion: document.getElementById('ubicacion').value,// Obtener la ubicación seleccionada
    };
    // Enviar los datos al backend mediante fetch
    fetch('http://localhost:3000/crear-alerta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json(); // Asegúrate de que el servidor está devolviendo JSON
    })
    .then(result => {
        console.log('Alerta creada:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
});

