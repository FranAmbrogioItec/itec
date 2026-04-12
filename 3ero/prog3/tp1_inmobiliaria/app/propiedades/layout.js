export default function PropiedadesLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 mt-4">

      {/* Sidebar compartido solo en la sección de propiedades */}
      <aside className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg h-fit border">
        <h3 className="font-bold text-lg mb-4 text-slate-800">Filtros de Búsqueda</h3>
        <ul className="space-y-2 text-gray-600">
          <li className="cursor-pointer hover:text-blue-600">Departamentos</li>
          <li className="cursor-pointer hover:text-blue-600">Edificios en pozo</li>
          <li className="cursor-pointer hover:text-blue-600">Locales comerciales</li>
        </ul>
      </aside>

      {/* Aquí se renderiza page.js o [id]/page.js */}
      <section className="w-full md:w-3/4">
        {children}
      </section>

    </div>
  );
}