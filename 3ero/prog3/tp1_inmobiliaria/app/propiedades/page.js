import Link from 'next/link';

export default function Propiedades() {
  // Simulamos una base de datos de edificios para generar los links dinámicamente
  const edificios = [
    { id: '101', nombre: 'Torre Central', tipo: 'Departamentos 1 y 2 dormitorios', estado: 'Terminado' },
    { id: '102', nombre: 'Edificio Los Álamos', tipo: 'Pisos exclusivos', estado: 'En pozo' },
    { id: '103', nombre: 'Complejo Comercial', tipo: 'Locales y oficinas', estado: 'En construcción' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Catálogo de Edificios</h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {edificios.map((edificio) => (
          <div key={edificio.id} className="border p-5 rounded-lg shadow-sm bg-white hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-slate-800">{edificio.nombre}</h2>
            <p className="text-gray-600 mt-1">{edificio.tipo}</p>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2 mb-4 font-medium">
              {edificio.estado}
            </span>

            <div className="mt-2">
              {/* Link hacia la ruta dinámica */}
              <Link
                href={`/propiedades/${edificio.id}`}
                className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
              >
                Ver ficha técnica del inmueble &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}