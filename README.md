
# Knives_Store

Knives_Store es una tienda online especializada en la venta de navajas, cuchillos y equipos relacionados con actividades al aire libre como camping, montañismo y supervivencia en exteriores. A través de esta aplicación, los usuarios tendrán acceso al catálogo de productos ofrecidos por la tienda, además de la posibilidad de registrarse, crear una cuenta personal y realizar compras en línea.

Actualmente, el proyecto está en fase de prueba, y solo se encuentra disponible un CRUD básico para la gestión de perfiles de usuario, desarrollado con una API REST utilizando **Express**, **Sequelize**, y **MySQL**. Los endpoints disponibles permiten realizar operaciones **GET**, **POST**, **PUT**, y **DELETE**. Para la interfaz de usuario (frontend), se ha utilizado **Ionic** y **Angular**.

> **Nota:** Solo el botón de **Perfiles** está completamente funcional en esta fase del proyecto.

## Comenzando 🚀

A continuación, se describen las instrucciones para obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas. Consulta la sección de **Despliegue** para conocer cómo desplegar el proyecto en un entorno de producción.

### Pre-requisitos 📋

Asegúrate de tener instalados los siguientes programas:

- **Git**: Para gestionar versiones y clonar el repositorio.
- **Postman**: Para probar los endpoints de la API.
- **Visual Studio Code**: Editor de código recomendado para trabajar con el proyecto.
- **Node.js**: Para ejecutar JavaScript fuera del navegador y levantar el servidor con Express.
- **MySQL Workbench**: (Opcional) Recomendado para visualizar la base de datos gráficamente.

### Instalación 🔧

Sigue estos pasos para instalar y ejecutar el proyecto localmente:

1. **Clonar el repositorio**: 
   Abre la terminal y clona el repositorio en tu máquina local:
   ```bash
   git clone -b main https://github.com/gabrielalexandro/knives_store
   ```

2. **Abrir el proyecto en Visual Studio Code**:
   - Abre **Visual Studio Code**.
   - Ve a `File > Open Folder...` y selecciona la carpeta donde clonaste el proyecto (por ejemplo, `C:/knives-store`).

3. **Abrir la terminal**:
   Abre la terminal integrada de Visual Studio Code presionando `Ctrl + Ñ` o yendo a `Terminal > New Terminal`. Se recomienda usar **Git Bash**.

4. **Navegar al backend**:
   Dentro de la carpeta raíz del proyecto, navega a la carpeta **Backend**:
   ```bash
   cd backend
   ```

5. **Instalar las dependencias del backend**:
   Ejecuta el siguiente comando para instalar las dependencias del backend:
   ```bash
   npm install
   ```

6. **Ejecutar el backend**:
   Una vez instaladas las dependencias, ejecuta el servidor con el siguiente comando:
   ```bash
   node server.js
   ```

   El backend ya estará corriendo en tu máquina. Puedes probar los endpoints utilizando **Postman**.

7. **Configurar el frontend**:
   Primero, vuelve a la carpeta raíz:
   ```bash
   cd ..
   ```

8. **Navegar al frontend**:
   Dirígete a la carpeta **Frontend**:
   ```bash
   cd frontend
   ```

9. **Instalar las dependencias del frontend**:
   Ejecuta el siguiente comando para instalar las dependencias del frontend:
   ```bash
   npm install -g @ionic/cli
   ```

10. **Ejecutar el frontend**:
   Inicia el servidor del frontend con el siguiente comando:
   ```bash
   ionic serve
   ```

   Ahora, la aplicación estará disponible y podrás interactuar con ella desde el frontend.

> **Importante**: Para que la aplicación funcione correctamente, asegúrate de que tanto el backend como el frontend estén ejecutándose de manera simultánea. También recordar que la base de datos debe estar correctamente creada en nuestro gestor de base de datos, para esto solo debemos ejecutar el contenido del fichero db_knives_store.sql

## Acceso a los Endpoints via Postman 🔗
Puedes acceder a los endpoints de la API a través de Postman utilizando el siguiente enlace:
[Enlace a la colección de Postman](https://documenter.getpostman.com/view/35356237/2sAXxS6W7A)

## Ejecutando las pruebas ⚙️

En esta fase del proyecto no se han implementado pruebas automatizadas. Sin embargo, en futuras versiones se utilizará [Jest](https://jestjs.io/) para las pruebas unitarias.

Para ejecutar las pruebas, cuando estén disponibles, se usará el siguiente comando:
```bash
npm test
```

## Despliegue 📦

Este proyecto no está destinado para ser desplegado en producción en este momento, ya que está enfocado en la fase de pruebas y desarrollo.

## Construido con 🛠️

* [Ionic](https://ionicframework.com/) - Framework para el frontend
* [Angular](https://angular.io/) - Plataforma para aplicaciones web
* [Express](https://expressjs.com/) - Framework de Node.js para el backend
* [Sequelize](https://sequelize.org/) - ORM para bases de datos MySQL
* [MySQL](https://www.mysql.com/) - Sistema de gestión de bases de datos relacional

## Contribuyendo 🖇️

Este proyecto es una tarea de formación educativa, por lo que solo aceptará contribuciones del profesor.

## Wiki 📖

Actualmente, no hay una Wiki disponible para este proyecto.

## Versionado 📌

Este proyecto no sigue un sistema de versionado formal, ya que está en fase de desarrollo académico.

## Autores ✒️

* **[Gabriel Alexander Osorio Osorio]** - *Desarrollador* - [TuGitHub](https://github.com/tuusuario)

## Licencia 📄

Este proyecto no tiene una licencia formal, ya que es parte de una tarea universitaria.

## Expresiones de Gratitud 🎁

* Agradecimientos a mi profesor por su constante apoyo y guía durante el desarrollo de este proyecto. Espero contar con su ayuda y compromiso en esta etapa final, ya que su dedicación es fundamental para que pueda culminar con éxito esta experiencia de aprendizaje. Confío en que responderá sabiamente a todas mis dudas e inquietudes, permitiéndome así adquirir las habilidades necesarias para enfrentar los próximos desafíos en este vasto y emocionante mundo de la informática.

* Agradecimientos a mis compañeros de clase por su colaboración.
