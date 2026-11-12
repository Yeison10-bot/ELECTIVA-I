# BioCaquetá

Sistema de Monitoreo de Biodiversidad y Avistamientos del Piedemonte Amazónico.
Aplicación monolítica con Node.js, Express, Mongoose (MongoDB Atlas) y Express-Handlebars.

## Instalación

```bash
npm install
cp .env.example .env   # y colocar la URI de MongoDB Atlas
npm run dev            # o npm start
```

Abrir `http://localhost:3000`.

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

## Postman

Importar `postman/BioCaqueta.postman_collection.json`. Ejecutar primero "Crear avistamiento (POST)": guarda el `_id` para las peticiones PUT y DELETE.
