document.addEventListener('DOMContentLoaded', function() {
    // Detecta la URL actual para decidir qué datos cargar
    const url = window.location.pathname;

    if (url.includes('indexForo.html')) {
        // Cargar todas las publicaciones
        fetch('http://localhost:3000/publicaciones')
            .then(response => response.json())
            .then(publicaciones => {
                const publicacionesContainer = document.querySelector('.publicaciones');
                publicaciones.forEach(pub => {
                    const publicacionHTML = `
                        <article class="publicacion">
                            <h2 class="autor">${pub.nombre} ${pub.apellido}</h2>
                            <h3 class="titulo-publicacion">${pub.titulo}</h3>
                            <p class="contenido">${pub.contenido}</p>
                            <div class="acciones">
                                <button class="btn-like">👍 Like</button>
                                <button class="btn-dislike">👎 Dislike</button>
                            </div>
                        </article>
                    `;
                    publicacionesContainer.insertAdjacentHTML('beforeend', publicacionHTML);
                });
            })
            .catch(error => console.error('Error al cargar publicaciones:', error));
    } else if (url.includes('misPublicaciones.html')) {
        // Cargar solo las publicaciones del usuario
        const userId = 1; // Cambia este ID por el del usuario autenticado
        fetch(`http://localhost:3000/mis-publicaciones/${userId}`)
            .then(response => response.json())
            .then(publicaciones => {
                const publicacionesContainer = document.querySelector('.publicaciones');
                publicaciones.forEach(pub => {
                    const publicacionHTML = `
                        <article class="publicacion">
                            <h3 class="titulo-publicacion">${pub.titulo}</h3>
                            <p class="contenido">${pub.contenido}</p>
                            <div class="acciones">
                                <button class="btn-like">👍 Like</button>
                                <button class="btn-dislike">👎 Dislike</button>
                            </div>
                        </article>
                    `;
                    publicacionesContainer.insertAdjacentHTML('beforeend', publicacionHTML);
                });
            })
            .catch(error => console.error('Error al cargar mis publicaciones:', error));
    }
});
