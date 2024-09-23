import React from 'react';

const ResponsiveTable = ({ columns, data, handleClick }) => {
  return (
    <div className="overflow-x-auto mt-10 p-10">
      <div className='flex justify-end mb-2'>
        <button className='bg-sky-600 text-white px-4 pt-1 pb-2 rounded-md' onClick={() => handleClick()}>Add</button>
      </div>

      <div className="min-w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-r-2">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResponsiveTable;
