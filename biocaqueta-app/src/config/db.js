import mongoose from 'mongoose';

export const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: 'biocaqueta_db' });
        console.log('Conectado a MongoDB Atlas (biocaqueta_db)');
    } catch (error) {
        console.error('Error al conectar con MongoDB Atlas:', error.message);
        process.exit(1);
    }
};
