import { Router } from 'express';
import { Avistamiento, CATEGORIAS, ESTADOS } from '../models/Avistamiento.js';
import { conFotos } from '../utils/fotos.js';

const router = Router();

const PLURALES = {
    'Mamífero': 'Mamíferos',
    'Ave': 'Aves',
    'Reptil': 'Reptiles',
    'Anfibio': 'Anfibios',
    'Flora': 'Flora'
};

router.get('/', async (req, res) => {
    try {
        const registros = await Avistamiento.find().sort({ fechaRegistro: -1 }).lean();
        const avistamientos = await conFotos(registros);

        // Una fila por categoría, solo las que tienen registros
        const filas = CATEGORIAS
            .map((categoria) => ({
                categoria,
                titulo: PLURALES[categoria],
                items: avistamientos.filter((a) => a.categoria === categoria)
            }))
            .filter((fila) => fila.items.length > 0);

        res.render('home', {
            destacado: avistamientos[0],
            filas,
            total: avistamientos.length,
            categorias: CATEGORIAS,
            estados: ESTADOS
        });
    } catch (error) {
        res.status(500).send(`Error al cargar los avistamientos: ${error.message}`);
    }
});

router.get('/editar/:id', async (req, res) => {
    try {
        const registro = await Avistamiento.findById(req.params.id).lean();
        if (!registro) return res.status(404).send('Avistamiento no encontrado');
        const [avistamiento] = await conFotos([registro]);
        res.render('editar', { avistamiento, estados: ESTADOS });
    } catch (error) {
        res.status(400).send(`Id no válido: ${error.message}`);
    }
});

export default router;
