# BioCaquetá

Sistema de Monitoreo de Biodiversidad y Avistamientos del Piedemonte Amazónico.
Aplicación monolítica con Node.js, Express, Mongoose (MongoDB Atlas) y Express-Handlebars.

## Instalación

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Crear el archivo `.env` en la raíz del proyecto:
   ```
   PORT=3000
   MONGO_URI=mongodb+srv://USUARIO:CONTRASEÑA@CLUSTER.mongodb.net/
   ```
3. Iniciar el servidor y abrir `http://localhost:3000`:
   ```bash
   npm run dev
   ```

## Endpoints (`/api/avistamientos`)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/avistamientos` | Lista ordenada del más reciente al más antiguo. Filtro opcional `?categoria=Ave` |
| POST | `/api/avistamientos` | Crea un avistamiento (JSON → 201; formulario → redirige a `/`) |
| PUT | `/api/avistamientos/:id` | Actualiza `zona` y/o `estadoConservacion` |
| POST | `/api/avistamientos/update/:id` | Igual que PUT, desde formulario HTML |
| DELETE | `/api/avistamientos/:id` | Elimina el registro |
| POST | `/api/avistamientos/delete/:id` | Igual que DELETE, desde botón HTML |

## Vistas

- `GET /` — formulario de registro y tabla de avistamientos con botones Editar y Eliminar.
- `GET /editar/:id` — formulario precargado para actualizar zona y estado de conservación.
