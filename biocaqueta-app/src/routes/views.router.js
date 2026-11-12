import { Router } from 'express';
import { Avistamiento, CATEGORIAS, ESTADOS } from '../models/Avistamiento.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const avistamientos = await Avistamiento.find().sort({ fechaRegistro: -1 }).lean();
        res.render('home', { avistamientos, categorias: CATEGORIAS, estados: ESTADOS });
    } catch (error) {
        res.status(500).send(`Error al cargar los avistamientos: ${error.message}`);
    }
});

router.get('/editar/:id', async (req, res) => {
    try {
        const avistamiento = await Avistamiento.findById(req.params.id).lean();
        if (!avistamiento) return res.status(404).send('Avistamiento no encontrado');
        res.render('editar', { avistamiento, estados: ESTADOS });
    } catch (error) {
        res.status(400).send(`Id no válido: ${error.message}`);
    }
});

export default router;
