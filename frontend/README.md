# 🎬 MovieRank

Aplicación web para descubrir películas y gestionar listas personales (favoritas, vistas y pendientes).

## 🚀 Funcionalidades

* 🔍 Buscar películas
* 📄 Ver detalles de cada película
* 👤 Registro y login de usuarios
* ❤️ Añadir a favoritos
* 👀 Marcar como vista
* 📌 Guardar en pendientes
* ✏️ Editar perfil (usuario y contraseña)
* ❌ Eliminar cuenta

---

## 🛠️ Tecnologías utilizadas

### Frontend

* React
* Vite
* CSS

### Backend

* Node.js
* Express
* PostgreSQL
* JWT (autenticación)

---

## 📦 Instalación

Clona el repositorio:

```bash
git clone https://github.com/TU_USUARIO/movierank.git
cd movierank
```

---

## ⚙️ Configuración

### 🔐 Variables de entorno

Debes crear un archivo `.env` en la carpeta **backend**:

```env
PORT=3000
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=movierank
JWT_SECRET=secret_token_movierank
TMDB_API_KEY=tu_api_key
```

👉 **IMPORTANTE:**

* No se incluye este archivo por seguridad
* Debes usar tu propia API key de TMDB

---

## 🗄️ Base de datos

Asegúrate de tener PostgreSQL instalado y crea la base de datos:

```sql
CREATE DATABASE movierank;
```

Luego crea las tablas necesarias (usuarios y listas).

---

## ▶️ Ejecutar el proyecto

### Backend

```bash
cd backend
yarn install
yarn start
```

Servidor en:

```
http://localhost:3000
```

---

### Frontend

```bash
cd frontend
yarn install
yarn dev
```

App en:

```
http://localhost:5173
```

---

## 🔑 Autenticación

El sistema usa JWT.
El token se guarda en localStorage tras el login.

---

## 📌 Notas

* Las acciones de listas requieren sesión iniciada
* El proyecto consume la API de TMDB
* Las contraseñas están encriptadas

---

## 🚧 Mejoras futuras

* 🌍 Soporte multiidioma completo
* 🖼️ Avatar de usuario
* ⭐ Valoraciones personalizadas
* 🎨 Mejoras de diseño y animaciones
* 🔎 Filtros avanzados de búsqueda

---

## 👨‍💻 Autor

Proyecto desarrollado por Daniel Marcos Fuella

---
