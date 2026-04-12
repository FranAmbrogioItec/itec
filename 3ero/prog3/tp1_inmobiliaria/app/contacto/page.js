export default function Contacto() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg border shadow-sm mt-4">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Contáctanos</h1>
      <p className="text-gray-600 mb-6">
        ¿Estás interesado en algún proyecto o necesitas asesoramiento para invertir? Déjanos tu mensaje.
      </p>

      <form className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
          <input
            type="text"
            placeholder="Ej. Juan Pérez"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
          <input
            type="email"
            placeholder="tucorreo@email.com"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
          <textarea
            placeholder="Consulta sobre el edificio en pozo..."
            className="w-full border p-2 rounded h-32 focus:ring-2 focus:ring-blue-500 outline-none"
          ></textarea>
        </div>
        <button
          type="button"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
}