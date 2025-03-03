# Recetapp

Recetapp es una aplicación de recetas de cocina desarrollada con React. Esta aplicación permite a los usuarios crear, editar y gestionar sus recetas de cocina de manera sencilla y organizada.

## Características

- **Autenticación**: Los usuarios pueden registrarse e iniciar sesión utilizando su correo electrónico y contraseña, o a través de su cuenta de Google.
- **Protección de Rutas**: Las rutas están protegidas para asegurar que solo los usuarios autenticados puedan acceder a ciertas partes de la aplicación.
- **Gestión de Recetas**: Los usuarios pueden crear nuevas recetas, editarlas, eliminarlas y ver una lista de sus recetas guardadas.
- **Subida de Imágenes**: Los usuarios pueden subir imágenes de sus recetas utilizando Cloudinary.
- **Interfaz de Usuario**: La interfaz está construida utilizando Material-UI para un diseño moderno y responsive.
- **Estado Global**: La gestión del estado global de la aplicación se maneja con Redux Toolkit.
- **Persistencia de Datos**: Los datos de las recetas se almacenan en Firebase Firestore.

## Tecnologías Utilizadas

- **React**
- **Redux Toolkit**: Herramienta para la gestión del estado global de la aplicación.
- **React Router**: Librería para manejar las rutas en la aplicación.
- **Firebase**: Plataforma para el desarrollo de aplicaciones web y móviles, utilizada para la autenticación y la base de datos.
- **Material-UI**: Biblioteca de componentes de React para un diseño moderno y responsive.
- **Cloudinary**: Servicio de gestión de imágenes en la nube.
- **SweetAlert2**: Librería para mostrar alertas personalizadas.

## Instalación

1. Clona el repositorio:
   ```sh
    git clone https://github.com/tu-usuario/recetapp.git

2. Navega al directorio del proyecto:
   ```sh
    cd recetapp

3. Instala las dependencias:
   ```sh
    yarn install

4. Inicia la aplicación en modo desarrollo:
   ```sh
    yarn dev

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.