import mongoose from 'mongoose';

export const CATEGORIAS = ['Mamífero', 'Ave', 'Reptil', 'Anfibio', 'Flora'];
export const ESTADOS = ['Preocupación menor', 'Vulnerable', 'En peligro'];

const avistamientoSchema = new mongoose.Schema({
    nombreComun: { type: String, required: true, trim: true },
    nombreCientifico: { type: String, required: true, trim: true },
    categoria: { type: String, required: true, enum: CATEGORIAS },
    zona: { type: String, required: true, trim: true },
    estadoConservacion: { type: String, enum: ESTADOS, default: 'Preocupación menor' },
    investigador: { type: String, required: true, trim: true },
    fechaRegistro: { type: Date, default: Date.now }
});

export const Avistamiento = mongoose.model('Avistamiento', avistamientoSchema, 'avistamientos');
