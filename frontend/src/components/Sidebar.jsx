import React from 'react';

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-6">
      <h2 className="text-lg font-semibold mb-4">Filtros</h2>
      
      {/* Marcador de lugar para os filtros futuros */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Ano</label>
          <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
            <option>Todos</option>
            {/* Futuramente, os anos virão aqui */}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Matéria</label>
          <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
            <option>Todas</option>
            {/* Futuramente, as matérias virão aqui */}
          </select>
        </div>
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Filtrar
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;


