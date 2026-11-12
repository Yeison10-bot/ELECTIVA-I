import 'dotenv/config';
import express from 'express';
import { engine } from 'express-handlebars';
import path from 'node:path';
import { conectarDB } from './config/db.js';
import apiRouter from './routes/api.router.js';
import viewsRouter from './routes/views.router.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Recibir JSON (Postman) y formularios HTML (Handlebars)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars
app.engine('handlebars', engine({
    helpers: {
        eq: (a, b) => a === b,
        fecha: (f) => new Date(f).toLocaleDateString('es-CO')
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(import.meta.dirname, 'views'));

// Rutas
app.use('/api/avistamientos', apiRouter);
app.use('/', viewsRouter);

await conectarDB();
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
