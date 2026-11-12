import { Router } from 'express';
import mongoose from 'mongoose';
import { Avistamiento } from '../models/Avistamiento.js';

const router = Router();

const esFormulario = (req) =>
    req.headers['content-type']?.includes('application/x-www-form-urlencoded');

// Errores de validación o de id mal formado son culpa del cliente (400); el resto, del servidor (500)
const estadoDeError = (error) =>
    error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError ? 400 : 500;

// GET /api/avistamientos?categoria=Ave
router.get('/', async (req, res) => {
    try {
        const filtro = req.query.categoria ? { categoria: req.query.categoria } : {};
        const avistamientos = await Avistamiento.find(filtro).sort({ fechaRegistro: -1 });
        res.status(200).json(avistamientos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/avistamientos
router.post('/', async (req, res) => {
    try {
        const nuevo = await Avistamiento.create(req.body);
        if (esFormulario(req)) return res.redirect('/');
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(estadoDeError(error)).json({ error: error.message });
    }
});

// Solo se permite actualizar el estado de conservación y la zona
const actualizar = async (req, res) => {
    try {
        const { zona, estadoConservacion } = req.body;
        const cambios = {};
        if (zona !== undefined) cambios.zona = zona;
        if (estadoConservacion !== undefined) cambios.estadoConservacion = estadoConservacion;

        const actualizado = await Avistamiento.findByIdAndUpdate(req.params.id, cambios, {
            returnDocument: 'after',
            runValidators: true
        });
        if (!actualizado) return res.status(404).json({ error: 'Avistamiento no encontrado' });

        if (esFormulario(req)) return res.redirect('/');
        res.status(200).json(actualizado);
    } catch (error) {
        res.status(estadoDeError(error)).json({ error: error.message });
    }
};

const eliminar = async (req, res) => {
    try {
        const eliminado = await Avistamiento.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ error: 'Avistamiento no encontrado' });

        if (esFormulario(req)) return res.redirect('/');
        res.status(200).json({ mensaje: 'Avistamiento eliminado', eliminado });
    } catch (error) {
        res.status(estadoDeError(error)).json({ error: error.message });
    }
};

router.put('/:id', actualizar);
router.post('/update/:id', actualizar);

router.delete('/:id', eliminar);
router.post('/delete/:id', eliminar);

export default router;
