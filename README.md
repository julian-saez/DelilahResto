# Delilah Resto

Este proyecto plantea la creación de un sistema de pedidos online para un restaurante. La idea es programar las partes necesarias para montar una REST API que permita realizar altas, bajas, modifcaciones y obtención de información sobre una estructura de datos que podría consumir un cliente. 

### Instalación de paquetes y programas necesarios
 
Los programas necesarios son:

- **Nodejs**

- **Postman**

- **XAMPP**

- **Mysql**

Para el funcionamiento correcto de la API, deberás instalar las siguientes dependencias en la carpeta raiz donde clones o descargues el proyecto:

- *npm i nodemon* (En caso de no tenerlo instalado).

- *npm i express*

- *npm i bcrypt*

- *npm i cors*

- *npm i sequelize*

- *npm i mysql*

- *npm i jsonwebtoken*

## Configuración del servidor

#### Servidor
Por default, en el archivo server.js el puerto donde correrá es el 3000 pero puedes cambiarlo al que se te haga más cómodo y tengas disponibles.

#### Base de datos
A través del XAMPP, configurar el puerto de mysql en el 3307 para evitar errores. Luego, en el botón 'admin' o en http://localhost/phpmyadmin/ debes crear una base de datos con el nombre 'delilahresto'.

## Inicializar la API

Ejecutar en la terminal:

- *nodemon server.js*

Ejecutar XAMPP con permisos de administrador:

- *Start apache*
- *Start mysql*

Por último, realiza una petición POST en **postman** con el endpoint **localhost:3000/v1/db** para subir datos de simulación en las tablas (**solo una vez**). Luego, en **localhost:3000/v1/users/login** pasa por el body el siguiente objeto json para iniciar sesión con la cuenta del administrador.

{
    "username": "sevenn",
    "password": "seguracontra"
}

La respuesta vendrá acompañada de un token que te servirá para autenticarte por 30 minutos.

Listo, ya puedes realizar peticiones CRUD.