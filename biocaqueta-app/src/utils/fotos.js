// Busca la foto de una especie en iNaturalist (https://www.inaturalist.org)
// a partir de su nombre científico. Solo acepta la especie con ese nombre exacto;
// si el nombre está mal escrito o no existe, el avistamiento queda sin foto.
// Los resultados se guardan en memoria para no repetir consultas.
const cache = new Map();

const normalizar = (texto) => texto.trim().toLowerCase().replace(/\s+/g, ' ');

export const buscarFoto = async (nombreCientifico = '') => {
    const nombre = normalizar(nombreCientifico);
    if (!nombre) return null;
    if (cache.has(nombre)) return cache.get(nombre);

    try {
        const url = `https://api.inaturalist.org/v1/taxa?per_page=10&q=${encodeURIComponent(nombre)}`;
        const respuesta = await fetch(url, { signal: AbortSignal.timeout(4000) });
        const { results = [] } = await respuesta.json();

        const especie = results.find((t) => normalizar(t.name) === nombre && t.default_photo?.medium_url);
        const foto = especie
            ? {
                url: especie.default_photo.medium_url.replace('/medium.', '/large.'),
                miniatura: especie.default_photo.medium_url,
                credito: especie.default_photo.attribution
            }
            : null;

        cache.set(nombre, foto);
        return foto;
    } catch {
        // Sin conexión o iNaturalist no respondió: no se guarda en caché para reintentar después
        return null;
    }
};

// Agrega la propiedad `foto` a cada avistamiento
export const conFotos = (avistamientos) =>
    Promise.all(avistamientos.map(async (a) => ({ ...a, foto: await buscarFoto(a.nombreCientifico) })));
