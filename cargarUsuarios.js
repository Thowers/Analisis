// Función para cargar usuarios desde el servidor
function cargarUsuarios() {
    fetch("http://localhost:3000/usuarios")
      .then((response) => {
        if (!response.ok) {
          throw new Error(Error HTTP: ${response.status});
        }
        return response.json();
      })
      .then((data) => {
        const usuarioSelect = document.getElementById("usuarioSelect");
        
        // Limpiar el select antes de agregar opciones
        usuarioSelect.innerHTML = '<option value="">Seleccione un usuario</option>';
  
        // Añadir cada usuario como una opción en el select
        data.usuarios.forEach((usuario) => {
          const option = document.createElement("option");
          option.value = usuario.id_usuario;
          option.textContent = ${usuario.nombre} ${usuario.apellido};
          usuarioSelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error al cargar usuarios:", error));
  }
  
  // Llamar a la función cuando el DOM esté cargado
  document.addEventListener("DOMContentLoaded", cargarUsuarios);