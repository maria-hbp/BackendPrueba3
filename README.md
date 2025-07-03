# CopperBites 🍽️

## Propósito 🎯

CopperBites es una aplicación móvil diseñada para que restaurantes gestionen sus menús, platillos y pedidos de manera eficiente. Permite agregar, visualizar y administrar platillos con fotos, precios y categorías, facilitando la actualización constante del menú. Además, las imágenes de los platillos se suben y almacenan en Cloudinary para una gestión óptima y segura.

---

## Tecnologías Usadas 🛠️

- **Expo** – Plataforma para desarrollo rápido de apps móviles.
- **React Native** – Framework para construir interfaces nativas.
- **TypeScript / JavaScript** – Lenguajes de programación principales.
- **Axios** – Para realizar solicitudes HTTP.
- **Cloudinary** – Servicio para almacenamiento y gestión de imágenes.
- Otras librerías y herramientas relevantes para la funcionalidad y diseño.

---

## Instalación 🚀

Sigue estos pasos para poner en marcha CopperBites en tu entorno local:

1. **Clonar el repositorio**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd CopperBitesFrontend-main
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Crea un archivo `.env` en la raíz del proyecto y añade las variables necesarias para Cloudinary y cualquier otro servicio utilizado. Ejemplo:

   ```
   CLOUDINARY_CLOUD_NAME=tu_nombre_de_cloud
   CLOUDINARY_API_KEY=tu_api_key
   CLOUDINARY_API_SECRET=tu_api_secret
   ```

4. **Iniciar la aplicación**

   ```bash
   npx expo start
   ```

---

## Uso Básico 📱

- **Iniciar la app:** Usa Expo Go o un emulador para abrir la aplicación y comenzar a interactuar.
- **Crear un platillo:** Navega a la sección de gestión de platillos y utiliza el formulario para añadir un nuevo platillo con nombre, descripción, precio y categoría.
- **Subir una foto:** Selecciona una imagen desde tu dispositivo; la app la cargará automáticamente a Cloudinary y asociará la URL al platillo.
- **Navegar entre pantallas:** Usa la barra de navegación o gestos para moverte entre las diferentes secciones de la app como menú, pedidos y perfil.

---
