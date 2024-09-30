<p>Para que funcione</p>
<p>En la terminal escribir</p>
<p>"npm install"</p>
<p>"node server.js"</p>

<p>BASE DE DATOS</p>
<P>create database natulert;</P>
<p>use natulert</P>
<p>create table alertas(</P>
<p>id int auto_increment primary key,</P>
<p>fecha date not null,</P>
<p>hora time not null,</P>
<p>nivel varchar(50) not null,</P>
<p>descripcion text not null,</P>
<p>ubicacion varchar(255) not null,</P>
<p>estado varchar(50) null</P>
<p>)Engine=InnoDB;</P>
