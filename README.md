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

- *npm i helmet*

- *npm i cors*

- *npm i mysql2*

- *npm i jsonwebtoken*

## Configuración del servidor

#### Servidor
Por default, en el archivo server.js el puerto donde correrá es el 3000 pero puedes cambiarlo al que se te haga más cómodo y tengas disponibles.

#### Base de datos
A través del XAMPP, configurar el puerto de mysql en el 3307 para evitar errores. Luego, en el botón 'admin' o en http://localhost/phpmyadmin/ debes crear una base de datos con el nombre 'delilahresto'.

## Inicializar la API

Ejecutar en la terminal:

- *nodemon server.js*

Al ejecutar XAMPP (con permisos de administrador):

- *Start apache*
- *Start mysql*

Por último, ejecuta manualmente el contenido de los archivos SQL en phpmyadmin para añadir valores de simulación a la base de datos. Luego, realiza una peticion POST a **localhost:3000/v1/users/signup** pasando por el body el siguiente objeto json para registrarte en delilahresto. 

{
    "username": "sevenn",
    "nameAndSurname": "Julian Sepulveda",
    "email": "sepu@gmail.com",
    "phone": 294785156,
    "address": "Elordi 566",
    "password": "seguracontra"
}

Esta cuenta es, por default, la que te permitirá realizar acciones de ROL ADMINISTRADOR. Una vez registrado, inicia sesion con la misma. La respuesta vendrá acompañada de un token que te servirá para autenticarte por 30 minutos.

**Si deseas realizar peticiones CRUD como usuario normal, deberás registrar una cuenta con datos al azar. Los usuarios de simulación no tienen la password hasheada y la API mostrará error al ejecutar los middlewares.**

Listo, ya puedes realizar peticiones CRUD.

