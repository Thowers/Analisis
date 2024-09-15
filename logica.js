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
