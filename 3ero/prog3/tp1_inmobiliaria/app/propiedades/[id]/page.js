import Link from 'next/link';

export default function DetallePropiedad({ params }) {
    const { id } = params;

    return (
        <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Detalle del Edificio / Propiedad</h1>
            <p className="text-gray-600 mb-6">
                Estás viendo la ficha técnica del inmueble con el identificador:
                <span className="font-bold text-blue-600 ml-2">{id}</span>
            </p>

            <div className="bg-slate-100 p-4 rounded mb-6">
                <p>Aquí irían las fotos, descripción, precio y metros cuadrados de esta propiedad específica calculada dinámicamente.</p>
            </div>

            <Link href="/propiedades" className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition">
                Volver al catálogo
            </Link>
        </div>
    );
}