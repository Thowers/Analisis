function updateTime() {
    const now = new Date();
    // Obtener la hora, minutos y AM/PM
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';    
    // Convertir a formato de 12 horas
    hours = hours % 12 || 12;  // Ajustar la hora a formato de 12 horas, 0 se convierte en 12.    
    // Asegurar que los minutos tengan dos dígitos
    minutes = minutes < 10 ? '0' + minutes : minutes;
    // Actualizar la hora y el periodo
    document.getElementById('time').textContent = `${hours}:${minutes}`;
    document.getElementById('period').textContent = period;
    // Obtener el día de la semana y la fecha
    const days = ['Domingo', 'Lunes', 'Martes', 'Mieercoles', 'Jueves', 'Viernes', 'Sabado'];
    const dayOfWeek = days[now.getDay()];    
    const day = now.getDate();
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const month = months[now.getMonth()];
    // Actualizar la fecha completa
    document.getElementById('day').textContent = `${dayOfWeek}, ${month} ${day}`;
}
// Llamar la función para actualizar la hora y fecha inmediatamente
updateTime();
// Actualizar la hora y fecha cada minuto
setInterval(updateTime, 60000);

// Inicializa el mapa centrado en Bogotá
var map = L.map('map').setView([4.7110, -74.0721], 13); // Coordenadas de Bogotá

// Carga el mapa desde OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Ejemplo de cómo agregar un marcador en una zona de contaminación
var marker = L.marker([4.7109886, -74.072092]).addTo(map)
    .bindPopup('Zona de contaminación aquí')
    .openPopup();

// Agregar más marcadores
var marker2 = L.marker([4.676, -74.045]).addTo(map)
    .bindPopup('Zona contaminada en este punto')
    .openPopup();
