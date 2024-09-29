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
    const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const dayOfWeek = days[now.getDay()];    
    const day = now.getDate();
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic'];
    const month = months[now.getMonth()];
    // Actualizar la fecha completa
    document.getElementById('day').textContent = `${dayOfWeek}, ${month} ${day}`;
}
// Llamar la función para actualizar la hora y fecha inmediatamente
updateTime();
// Actualizar la hora y fecha cada minuto
setInterval(updateTime, 60000);

document.addEventListener('DOMContentLoaded', () => {
    // Crear el mapa
    var map = L.map('map').setView([4.711, -74.0721], 12); // Coordenadas de Bogotá

    // Agregar una capa de mapa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Opcional: Añadir un marcador en Bogotá
    L.marker([4.711, -74.0721]).addTo(map)
        .bindPopup('Bogotá, Colombia.')
        .openPopup();
});

 