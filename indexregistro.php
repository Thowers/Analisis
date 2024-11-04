<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" />
  <link rel="stylesheet" href="./mystyle.css" />
  <link rel="icon" href="./imagenes/logo.png" type="image/x-icon" />
  <title>Natulert - Registro</title>
</head>

<body>
  <header>
    <img class="logo_login" src="https://github.com/Thowers/Analisis/blob/main/imagenes/logo.png?raw=true" alt="Logo natulert" />
    <h3 class="titulo_login">Natulert</h3>
  </header>

  <section class="menu"></section>
 
  <section class="register-container">
    <form class="register-form" action="conexion/registro_user.php" method="POST">
      <h2>Registro de Usuario</h2>


      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" required />
      </div>

      <div class="form-group">
        <label for="apellido">Apellido</label>
        <input type="text" id="apellido" name="apellido" required />
      </div>

      <div class="form-group">
        <label for="fecha_actual">Fecha Actual</label>
        <input type="date" id="fecha_actual" name="fecha" required />
      </div>
    
      <div class="form-group">
        <label for="correo">Correo Electrónico</label>
        <input type="email" id="correo" name="correo" required />
      </div>

      <div class="form-group">
        <label for="clave">Contraseña</label>
        <input type="password" id="clave" name="clave" required />
      </div>

      <div class="form-group">
        <label for="confirm_password">Confirmar Contraseña</label>
        <input type="password" id="confirm_password" name="confirm_password" required />
      </div>

      <button type="submit" class="register-btn">Registrarse</button>
      <p>
        <button type="button" class="register-btn" onclick="location.href='http://127.0.0.1:5500/index.html'">Cancelar</button>
      </p>
    </form>
  </section>

  <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"></script>
  <script src="./logica.js"></script>
</body>
</html>