const ClientDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 bg-gray-200 p-4">
        <h2>IssueTracker Cliente</h2>
        <ul className="mt-4">
          <li>
            <a href="#" className="block py-2">
              Panel
            </a>
          </li>
          <li>
            <a href="#" className="block py-2">
              Solicitar cotización
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Buscar..."
              className="border border-gray-300 rounded-md p-2"
            />
            <button className="ml-2 bg-blue-500 text-white rounded-md p-2">
              Buscar
            </button>
          </div>
          <div>
            <span>Notificaciones</span>
            <span>Jesica</span>
          </div>
        </div>

        {/* Dashboard Content */}
        <div>
          <h2>Resumen de Estado de Solicitudes</h2>
          <div className="flex">
            <div className="bg-white rounded-md p-4 shadow-md">
              <h3>Por hacer</h3>
              <p>10</p>
            </div>
            <div className="bg-white rounded-md p-4 shadow-md ml-4">
              <h3>En progreso</h3>
              <p>5</p>
            </div>
            <div className="bg-white rounded-md p-4 shadow-md ml-4">
              <h3>En revisión</h3>
              <p>2</p>
            </div>
          </div>

          <h2>Mis Solicitudes</h2>
          <ul>
            <li>
              <span>Alta</span>
              <span>Solicitud 1</span>
              <span>Resumen 1</span>
              <span>John Doe</span>
            </li>
            <li>
              <span>Media</span>
              <span>Solicitud 2</span>
              <span>Resumen 2</span>
              <span>Jane Smith</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
