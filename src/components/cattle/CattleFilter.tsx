import React from 'react';

export interface CattleFilters {
  gender?: string;
  status?: number; // 0 = Inactivo, 1 = Activo
}

interface CattleFilterProps {
  onFilterChange: (filters: CattleFilters) => void;
  filters: CattleFilters;
}

export const CattleFilter: React.FC<CattleFilterProps> = ({ 
  onFilterChange, 
  filters 
}) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedValue = value === '' ? undefined : (name === 'status' ? Number(value) : value);
    
    onFilterChange({
      ...filters,
      [name]: updatedValue
    });
  };

  const handleReset = () => {
    onFilterChange({});
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 mb-8 border border-indigo-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-indigo-900">Filtros de Ganado</h2>
          <p className="text-indigo-700 text-sm mt-1">Selecciona los criterios de búsqueda</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-end flex-1 max-w-3xl">
          <div className="w-full">
            <label htmlFor="gender" className="block text-sm font-medium text-indigo-800 mb-2">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Género
              </span>
            </label>
            <div className="relative">
              <select
                id="gender"
                name="gender"
                value={filters.gender || ''}
                onChange={handleFilterChange}
                className="appearance-none w-full pl-10 pr-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-indigo-900"
              >
                <option value="">Todos los géneros</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="status" className="block text-sm font-medium text-indigo-800 mb-2">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Estado
              </span>
            </label>
            <div className="relative">
              <select
                id="status"
                name="status"
                value={filters.status !== undefined ? filters.status.toString() : ''}
                onChange={handleFilterChange}
                className="appearance-none w-full pl-10 pr-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-indigo-900"
              >
                <option value="">Todos los estados</option>
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <button 
            type="button" 
            onClick={handleReset}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-indigo-200 rounded-lg shadow-sm text-sm font-semibold text-indigo-700 hover:bg-indigo-50 hover:text-indigo-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 whitespace-nowrap"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};