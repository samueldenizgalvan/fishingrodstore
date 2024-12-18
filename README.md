fishing_Store
fishing_Store es una tienda online especializada en la venta de cañas de pescar y equipos relacionados con actividades de pesca deportiva como rockfishing, surfcasting y pesca desde embarcación. A través de esta aplicación, los usuarios tendrán acceso al catálogo de productos ofrecidos por la tienda, además de la posibilidad de registrarse, crear una cuenta personal y realizar compras en línea.

Actualmente, el proyecto está en fase de prueba, desarrollado con una API REST utilizando Express, Sequelize y MySQL. Los endpoints disponibles permiten realizar operaciones GET, POST, PUT y DELETE. Para la interfaz de usuario (frontend), se ha utilizado Ionic y Angular.

Comenzando 🚀
A continuación, se describen las instrucciones para obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas. Consulta la sección de Despliegue para conocer cómo desplegar el proyecto en un entorno de producción.

Pre-requisitos 📋
Asegúrate de tener instalados los siguientes programas:

Git: Para gestionar versiones y clonar el repositorio.
Postman: Para probar los endpoints de la API.
Visual Studio Code: Editor de código recomendado para trabajar con el proyecto.
Node.js: Para ejecutar JavaScript fuera del navegador y levantar el servidor con Express.
MySQL Workbench: (Opcional) Recomendado para visualizar la base de datos gráficamente.
Instalación 🔧
Sigue estos pasos para instalar y ejecutar el proyecto localmente:

Clonar el repositorio: Abre la terminal y clona el repositorio en tu máquina local:

bash
Copiar código
git clone -b main https://github.com/samueldenizgalvan/fishing_store
Abrir el proyecto en Visual Studio Code:

Abre Visual Studio Code.
Ve a File > Open Folder... y selecciona la carpeta donde clonaste el proyecto (por ejemplo, C:/fishing_store).
Abrir la terminal: Abre la terminal integrada de Visual Studio Code presionando Ctrl + Ñ o yendo a Terminal > New Terminal. Se recomienda usar Git Bash.

Navegar al backend: Dentro de la carpeta raíz del proyecto, navega a la carpeta Backend:

bash
Copiar código
cd backend
Instalar las dependencias del backend: Ejecuta el siguiente comando para instalar las dependencias del backend:

bash
Copiar código
npm install
Necesitas un archivo backend/.env con una clave para el JWT y los datos de conexión:

bash
Copiar código
JWT_SECRET=TuContraseña

MYSQL_DATABASE=db_fishing_store
MYSQL_USER=root
MYSQL_PASSWORD=Tucontraseña
DB_HOST=localhost
NODE_ENV=development
Ejecutar el backend: Una vez instaladas las dependencias, ejecuta el servidor con el siguiente comando:

bash
Copiar código
node server.js
Configurar el frontend: Vuelve a la carpeta raíz:

bash
Copiar código
cd ..
Navegar al frontend: Dirígete a la carpeta Frontend:

bash
Copiar código
cd frontend
Instalar las dependencias del frontend: Ejecuta el siguiente comando:

bash
Copiar código
npm install -g @ionic/cli
Ejecutar el frontend: Inicia el servidor del frontend con:

bash
Copiar código
ionic serve
Importante: Asegúrate de que la base de datos esté correctamente configurada utilizando el archivo db_fishing_store.sql.

Acceso a los Endpoints via Postman 🔗
Puedes acceder a los endpoints de la API a través de Postman utilizando el siguiente enlace:
Enlace a la colección de Postman

Construido con 🛠️
Ionic - Framework para el frontend
Angular - Plataforma para aplicaciones web
Express - Framework de Node.js para el backend
Sequelize - ORM para bases de datos MySQL
MySQL - Sistema de gestión de bases de datos relacional
Autor ✒️
Samuel Deniz Galvan - Desarrollador
Visita mi GitHub
Expresiones de Gratitud 🎁
Agradecimientos a mi profesor por su guía durante el desarrollo de este proyecto.
Reconocimiento a mis compañeros por su colaboración y apoyo en esta experiencia.
Si necesitas algún ajuste adicional, házmelo saber. 😊