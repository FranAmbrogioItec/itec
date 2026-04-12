import Link from 'next/link';

export default function Propiedades() {
  const edificios = [
    { id: '101', nombre: 'Torre Central', tipo: 'Departamentos 1 y 2 dormitorios', estado: 'Terminado', color: 'bg-emerald-100 text-emerald-800' },
    { id: '102', nombre: 'Edificio Los Álamos', tipo: 'Pisos exclusivos', estado: 'En pozo', color: 'bg-amber-100 text-amber-800' },
    { id: '103', nombre: 'Complejo Comercial', tipo: 'Locales y oficinas', estado: 'En construcción', color: 'bg-blue-100 text-blue-800' },
  ];

  return (
    <div className="py-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800">Catálogo de Edificios</h1>
          <p className="text-slate-500 mt-2">Explora nuestras oportunidades de inversión.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {edificios.map((edificio) => (
          <div key={edificio.id} className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
            
            {/* Simulación de Imagen del Edificio */}
            <div className="h-48 bg-slate-200 w-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent z-10"></div>
              {/* Aquí iría la etiqueta <Image> real de Next.js */}
              <div className="w-full h-full bg-slate-300 group-hover:scale-110 transition-transform duration-500"></div>
              <span className={`absolute top-4 right-4 z-20 text-xs px-3 py-1 rounded-full font-bold shadow-sm ${edificio.color}`}>
                {edificio.estado}
              </span>
            </div>

            {/* Contenido de la Tarjeta */}
            <div className="p-6 flex-grow flex flex-col">
              <h2 className="text-2xl font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                {edificio.nombre}
              </h2>
              <p className="text-slate-500 text-sm mb-6 flex-grow">{edificio.tipo}</p>
              
              <Link 
                href={`/propiedades/${edificio.id}`} 
                className="block text-center bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-xl border border-slate-200 group-hover:bg-slate-800 group-hover:text-white transition-all duration-300"
              >
                Ver ficha técnica
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}