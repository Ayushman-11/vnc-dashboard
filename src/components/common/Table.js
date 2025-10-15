import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const Table = ({ 
  columns = [], 
  data = [], 
  loading = false,
  emptyMessage = 'No data available' 
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <FiAlertCircle className="text-4xl mb-2" />
        <p>{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#2a2c44]">
            {columns.map((column, index) => (
              <th
                key={index}
                className="text-left px-4 py-3 text-gray-400 text-sm font-semibold uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-[#2a2c44] hover:bg-[#2a2c44]/30 transition-colors"
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-4 py-4 text-white text-sm">
                  {column.render ? column.render(row, rowIndex) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
